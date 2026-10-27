import { Resend } from "resend";
import nodemailer, { type Transporter } from "nodemailer";

import { contactSchema, displayOption, quoteSchema, type QuoteFormValues } from "@/lib/forms";

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

type QuoteEmailField = {
  label: string;
  value: unknown;
  fullWidth?: boolean;
  href?: string;
};

function quoteEmailValue(value: unknown) {
  const normalized = String(value ?? "").trim();
  return escapeHtml(normalized || "Not provided").replaceAll("\n", "<br>");
}

function quoteEmailField(field: QuoteEmailField, width: "50%" | "100%") {
  const fullWidth = width === "100%";
  const content = field.href
    ? `<a href="${escapeHtml(field.href)}" style="color:#7b1113;font-weight:600;text-decoration:underline">${escapeHtml(field.value)}</a>`
    : quoteEmailValue(field.value);

  return `<td ${fullWidth ? 'colspan="2" ' : ""}width="${width}" valign="top" style="width:${width};padding:5px"><div style="padding:10px 12px 11px;border:1px solid #c5cdc6;border-radius:8px;background:#ffffff"><div style="margin:0 0 5px;color:#596660;font-family:Arial,sans-serif;font-size:12px;line-height:1.35">${escapeHtml(field.label)}</div><div style="color:#273239;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;overflow-wrap:anywhere">${content}</div></div></td>`;
}

function quoteEmailFields(fields: QuoteEmailField[]) {
  const rows: string[] = [];
  let pair: QuoteEmailField[] = [];
  const flushPair = () => {
    if (!pair.length) return;
    rows.push(`<tr>${quoteEmailField(pair[0], "50%")}${pair[1] ? quoteEmailField(pair[1], "50%") : '<td width="50%" style="width:50%;padding:5px"></td>'}</tr>`);
    pair = [];
  };

  fields.forEach((field) => {
    if (field.fullWidth) {
      flushPair();
      rows.push(`<tr>${quoteEmailField(field, "100%")}</tr>`);
    } else {
      pair.push(field);
      if (pair.length === 2) flushPair();
    }
  });
  flushPair();
  return rows.join("");
}

function quoteEmailHtml(
  data: QuoteFormValues,
  mapUrl: string,
  audience: "team" | "client",
) {
  const isClient = audience === "client";
  const optionFields = (
    label: string,
    value: string,
    otherLabel: string,
    otherValue: string,
  ): QuoteEmailField[] => [
    { label, value },
    ...(value === "Other" && otherValue.trim()
      ? [{ label: otherLabel, value: otherValue }]
      : []),
  ];
  const sections = [
    {
      number: "01",
      title: isClient ? "Your contact details" : "Client contact details",
      description: isClient
        ? "Tell DMSA who to contact about this quotation."
        : "How to contact the client about this request.",
      callout: true,
      fields: [
        { label: "Full name", value: data.fullName },
        { label: "Mobile number", value: data.mobile },
        { label: "Email", value: data.email },
        ...optionFields("Preferred contact method", data.preferredContact, "Other contact method", data.preferredContactOther),
      ],
    },
    {
      number: "02",
      title: isClient ? "Service needs" : "What the client needs",
      description: isClient
        ? "Choose the closest options. Other is available where it applies."
        : "The service and pest concerns the client selected.",
      fields: [
        ...optionFields("Customer type", data.customerType, "Other customer type", data.customerTypeOther),
        ...optionFields("Service needed", data.service, "Other service needed", data.serviceOther),
        ...optionFields("Pest concern", data.pest, "Other pest concern", data.pestOther),
        ...optionFields("Property type", data.propertyType, "Other property type", data.propertyTypeOther),
      ],
    },
    {
      number: "03",
      title: "Property location",
      description: isClient
        ? "Your address and the map pin you selected."
        : "Where the client would like the service.",
      fields: [
        { label: "Property address or general location", value: data.address, fullWidth: true },
        { label: "Map pin", value: "Open submitted map pin", href: mapUrl, fullWidth: true },
        { label: "Latitude", value: data.latitude },
        { label: "Longitude", value: data.longitude },
      ],
    },
    {
      number: "04",
      title: isClient ? "Schedule and details" : "Their preferred date and details",
      description: isClient
        ? "Provide enough context for an initial review."
        : "The preferred date and additional information the client shared.",
      fields: [
        { label: "Preferred service date", value: data.preferredDate, fullWidth: true },
        { label: "What are you seeing?", value: data.details, fullWidth: true },
        { label: "Consent", value: "Confirmed", fullWidth: true },
      ],
    },
  ];
  const inspectionTitle = isClient
    ? "Free ocular inspection included in the quotation process"
    : "A free ocular inspection is included in the client's quotation process";
  const inspectionCallout = `<tr><td colspan="2" style="padding:16px 0 4px"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f4e9e9;border-left:4px solid #7b1113"><tr><td width="34" valign="top" style="width:34px;padding:14px 0 14px 14px;color:#7b1113;font-family:Arial,sans-serif;font-size:19px;font-weight:bold">&#10003;</td><td style="padding:14px 14px 14px 8px;font-family:Arial,sans-serif"><div style="color:#273239;font-size:14px;font-weight:bold;line-height:1.4">${inspectionTitle}</div><div style="padding-top:5px;color:#596660;font-size:13px;line-height:1.5">DMSA may arrange an on-site review before confirming the service scope, schedule and price.</div></td></tr></table></td></tr>`;
  const sectionsHtml = sections.map((section) =>
    `<tr><td style="padding:0 28px 24px"><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td width="42" valign="top" style="width:42px;padding:0 12px 0 0"><div style="width:34px;height:34px;line-height:34px;text-align:center;border:1px solid #7b1113;color:#7b1113;font-family:Arial,sans-serif;font-size:13px;font-weight:bold">${section.number}</div></td><td valign="top" style="padding:0 0 14px;border-bottom:1px solid #dce1dc"><h2 style="margin:2px 0 0;color:#273239;font-family:Arial,sans-serif;font-size:19px;line-height:1.3;font-weight:600">${escapeHtml(section.title)}</h2><p style="margin:6px 0 0;color:#596660;font-family:Arial,sans-serif;font-size:13px;line-height:1.5">${escapeHtml(section.description)}</p></td></tr>${section.callout ? inspectionCallout : ""}<tr><td colspan="2" style="padding:14px 0 0"><table role="presentation" cellpadding="0" cellspacing="0" width="100%">${quoteEmailFields(section.fields)}</table></td></tr></table></td></tr>`,
  ).join("");

  const title = isClient ? "Your quotation request copy" : `Quotation request from ${data.fullName}`;
  const intro = isClient
    ? "Thank you for contacting DMSA. Here is a copy of the details you submitted."
    : "The client submitted the following details when requesting a quotation.";
  const footer = isClient
    ? "Your preferred service date is a request until DMSA confirms it. This submission does not confirm a booking or final quotation."
    : "The client's preferred service date is a request until DMSA confirms it. This submission does not confirm a booking or final quotation.";
  return `<div style="margin:0;padding:24px 12px;background:#eef1ed"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:700px;margin:0 auto;background:#ffffff;border:1px solid #dce1dc;border-radius:16px;border-collapse:separate"><tr><td style="height:5px;background:#7b1113;border-radius:16px 16px 0 0;font-size:0;line-height:0">&nbsp;</td></tr><tr><td style="padding:26px 28px 24px;font-family:Arial,sans-serif"><div style="color:#7b1113;font-size:12px;font-weight:bold;letter-spacing:2px">DMSA PEST CONTROL SERVICES</div><h1 style="margin:9px 0 0;color:#273239;font-size:27px;line-height:1.25;font-weight:600">${escapeHtml(title)}</h1><p style="margin:10px 0 0;color:#596660;font-size:14px;line-height:1.6">${escapeHtml(intro)}</p></td></tr>${sectionsHtml}<tr><td style="padding:0 28px 26px"><div style="padding-top:16px;border-top:1px solid #dce1dc;color:#596660;font-family:Arial,sans-serif;font-size:12px;line-height:1.6">${escapeHtml(footer)}</div></td></tr></table></div>`;
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
  let clientCopy: { subject: string; text: string; html: string } | undefined;

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
      `Quotation request from ${data.fullName}`,
      "The client submitted the following details when requesting a quotation.",
      "",
      "01 - Client contact details",
      textRow(rows[0][0], "Included in the quotation process; arrange during follow-up"),
      ...rows.slice(1, 5).map(([label, value]) => textRow(label, value)),
      "",
      "02 - What the client needs",
      ...rows.slice(5, 9).map(([label, value]) => textRow(label, value)),
      "",
      "03 - Property location",
      textRow(rows[9][0], rows[9][1]),
      textRow("Map pin", mapUrl),
      textRow(rows[10][0], rows[10][1]),
      textRow(rows[11][0], rows[11][1]),
      "",
      "04 - Their preferred date and details",
      ...rows.slice(13).map(([label, value]) => textRow(label, value)),
      "",
      "The client's preferred service date is a request until DMSA confirms it. This submission does not confirm a booking or final quotation.",
    ].join("\n");
    html = quoteEmailHtml(data, mapUrl, "team");
    clientCopy = {
      subject: `Your DMSA quotation request copy - ${data.fullName}`.slice(0, 180),
      text: [
        "Your quotation request copy",
        "Thank you for contacting DMSA. Here is a copy of the details you submitted.",
        "",
        "01 - Your contact details",
        textRow(rows[0][0], "Included in the quotation process; DMSA may arrange an on-site review during follow-up"),
        ...rows.slice(1, 5).map(([label, value]) => textRow(label, value)),
        "",
        "02 - Service needs",
        ...rows.slice(5, 9).map(([label, value]) => textRow(label, value)),
        "",
        "03 - Property location",
        textRow(rows[9][0], rows[9][1]),
        textRow("Map pin", mapUrl),
        textRow(rows[10][0], rows[10][1]),
        textRow(rows[11][0], rows[11][1]),
        "",
        "04 - Schedule and details",
        ...rows.slice(13).map(([label, value]) => textRow(label, value)),
        "",
        "Your preferred service date is a request until DMSA confirms it. This submission does not confirm a booking or final quotation.",
      ].join("\n"),
      html: quoteEmailHtml(data, mapUrl, "client"),
    };
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

  const gmailUser = process.env.GMAIL_SMTP_USER?.trim() || recipient;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  let gmailTransporter: Transporter | undefined;

  if (clientCopy) {
    if (!gmailUser || !gmailAppPassword) {
      return Response.json(
        {
          message:
            "Quotation email delivery is not fully configured yet. Please contact DMSA by phone or Viber.",
        },
        { status: 503 },
      );
    }

    gmailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailAppPassword },
    });

    try {
      await gmailTransporter.verify();
    } catch (error) {
      const errorCode =
        error && typeof error === "object" && "code" in error
          ? String(error.code)
          : "unknown";
      const responseCode =
        error && typeof error === "object" && "responseCode" in error
          ? Number(error.responseCode)
          : null;
      console.error("[api/contact] Gmail SMTP verification failed", { errorCode, responseCode });
      const message = errorCode === "EAUTH"
        ? "Gmail rejected the sign-in. Use a 16-character App Password for the DMSA Gmail account, not its regular password."
        : "Gmail SMTP could not connect. Check your Gmail setup, then try again.";
      return Response.json(
        { message },
        { status: 503 },
      );
    }
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

    if (clientCopy && parsed.data.type === "quote" && gmailTransporter && gmailUser) {
      try {
        await gmailTransporter.sendMail({
          from: `DMSA Pest Control Services <${gmailUser}>`,
          to: parsed.data.email,
          replyTo: gmailUser,
          subject: clientCopy.subject,
          text: clientCopy.text,
          html: clientCopy.html,
        });
      } catch (error) {
        const errorCode =
          error && typeof error === "object" && "code" in error
            ? String(error.code)
            : "unknown";
        console.error("[api/contact] Gmail client copy failed", { errorCode });
        return Response.json(
          {
            message:
              "DMSA received your request, but we could not send your email copy. Please contact DMSA by phone or Viber; do not submit the form again.",
          },
          { status: 502 },
        );
      }
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
