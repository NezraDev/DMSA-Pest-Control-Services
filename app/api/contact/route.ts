import { Resend } from "resend";

import { contactSchema, displayOption, quoteSchema } from "@/lib/forms";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const windowMs = 10 * 60 * 1000;
const maxRequests = 5;

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function textRow(label: string, value: unknown) {
  return `${label}: ${String(value ?? "").trim() || "Not provided"}`;
}

function htmlRow(label: string, value: unknown) {
  return `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #e7e2dc;color:#273239">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #e7e2dc">${escapeHtml(value || "Not provided")}</td></tr>`;
}

function getIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const record = rateLimit.get(ip);
  if (!record || record.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  record.count += 1;
  return record.count > maxRequests;
}

function validateSubmissionTiming(startedAt: number) {
  const elapsed = Date.now() - startedAt;
  return elapsed >= 800 && elapsed <= 24 * 60 * 60 * 1000;
}

export async function POST(request: Request) {
  const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN;
  const origin = request.headers.get("origin");
  if (allowedOrigin && origin && origin !== allowedOrigin) {
    return Response.json(
      { message: "This form origin is not allowed." },
      { status: 403 },
    );
  }

  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return Response.json(
      {
        message:
          "Too many requests. Please wait a few minutes or contact DMSA by phone.",
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "The form data could not be read." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return Response.json({ message: "Invalid form data." }, { status: 400 });
  }

  const kind = "type" in body ? String(body.type) : "";
  const parsed =
    kind === "quote"
      ? quoteSchema.safeParse(body)
      : kind === "contact"
        ? contactSchema.safeParse(body)
        : null;
  if (!parsed?.success) {
    return Response.json(
      { message: "Please review the form and complete all required fields." },
      { status: 400 },
    );
  }
  if (parsed.data.website || !validateSubmissionTiming(parsed.data.startedAt)) {
    return Response.json(
      {
        message:
          "The form could not be verified. Please refresh and try again.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL || "DMSA Website <onboarding@resend.dev>";
  if (!apiKey || !recipient) {
    return Response.json(
      {
        message:
          "Email delivery is not configured yet. Please call 0955 562 9226 or use Viber at 0918 299 5218.",
      },
      { status: 503 },
    );
  }

  let subject: string;
  let text: string;
  let html: string;
  let replyTo: string;

  if (parsed.data.type === "quote") {
    const data = parsed.data;
    const mapUrl = `https://www.openstreetmap.org/?mlat=${data.latitude}&mlon=${data.longitude}#map=17/${data.latitude}/${data.longitude}`;
    const rows: Array<[string, unknown]> = [
      [
        "Free ocular inspection",
        "Included in quotation process; arrange during follow-up",
      ],
      ["Full name", data.fullName],
      ["Mobile", data.mobile],
      ["Email", data.email],
      [
        "Preferred contact",
        displayOption(data.preferredContact, data.preferredContactOther),
      ],
      [
        "Customer type",
        displayOption(data.customerType, data.customerTypeOther),
      ],
      ["Service", displayOption(data.service, data.serviceOther)],
      ["Pest concern", displayOption(data.pest, data.pestOther)],
      [
        "Property type",
        displayOption(data.propertyType, data.propertyTypeOther),
      ],
      ["Address / general location", data.address],
      ["Latitude", data.latitude],
      ["Longitude", data.longitude],
      ["Map", mapUrl],
      ["Preferred date", data.preferredDate],
      ["Details", data.details],
      ["Consent", "Confirmed"],
    ];
    subject = `Quotation request — ${data.fullName}`.slice(0, 180);
    text = [
      "New DMSA quotation request",
      "",
      ...rows.map(([label, value]) => textRow(label, value)),
    ].join("\n");
    html = `<div style="font-family:Arial,sans-serif;color:#273239;max-width:720px"><h1 style="color:#7b1113">New quotation request</h1><table style="border-collapse:collapse;width:100%">${rows.map(([label, value]) => htmlRow(label, value)).join("")}</table></div>`;
    replyTo = data.email;
  } else {
    const data = parsed.data;
    const rows: Array<[string, unknown]> = [
      ["Full name", data.fullName],
      ["Email", data.email],
      ["Mobile", data.mobile],
      ["Subject", data.subject],
      ["Message", data.message],
      ["Consent", "Confirmed"],
    ];
    subject = `Website message — ${data.subject}`.slice(0, 180);
    text = [
      "New DMSA website message",
      "",
      ...rows.map(([label, value]) => textRow(label, value)),
    ].join("\n");
    html = `<div style="font-family:Arial,sans-serif;color:#273239;max-width:720px"><h1 style="color:#7b1113">New website message</h1><table style="border-collapse:collapse;width:100%">${rows.map(([label, value]) => htmlRow(label, value)).join("")}</table></div>`;
    replyTo = data.email;
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: recipient,
      replyTo,
      subject,
      text,
      html,
    });
    if (result.error || !result.data?.id) {
      return Response.json(
        {
          message:
            "Email delivery was not confirmed. Please contact DMSA by phone or Viber.",
        },
        { status: 502 },
      );
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      {
        message:
          "Email delivery failed. Please contact DMSA by phone or Viber.",
      },
      { status: 502 },
    );
  }
}
