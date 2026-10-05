"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { SubmissionSuccessDialog } from "@/components/forms/submission-success-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactFormValues } from "@/lib/forms";

function FieldError({ message }: { message?: string }) {
  return message ? <p className="field-error"><AlertCircle aria-hidden="true" />{message}</p> : null;
}

export function ContactForm() {
  const [submitState, setSubmitState] = useState<{ type: "idle" | "success" | "error"; message?: string }>({ type: "idle" });
  const [startedAt] = useState(() => Date.now());
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: "contact", fullName: "", email: "", mobile: "", subject: "", message: "",
      consent: false as true, website: "", startedAt,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    if (isSubmitting) return;
    setSubmitState({ type: "idle" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "The message could not be sent.");
      setSubmitState({ type: "success" });
    } catch (error) {
      setSubmitState({ type: "error", message: error instanceof Error ? error.message : "The message could not be sent. Please call or Viber DMSA instead." });
    }
  });

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-grid two-columns">
        <div className="form-field"><Label htmlFor="contactName">Full name</Label><Input id="contactName" autoComplete="name" {...register("fullName")} aria-invalid={Boolean(errors.fullName)} /><FieldError message={errors.fullName?.message} /></div>
        <div className="form-field"><Label htmlFor="contactEmail">Email</Label><Input id="contactEmail" type="email" autoComplete="email" {...register("email")} aria-invalid={Boolean(errors.email)} /><FieldError message={errors.email?.message} /></div>
      </div>
      <div className="form-field"><Label htmlFor="contactMobile">Mobile number <span className="optional">Optional</span></Label><Input id="contactMobile" type="tel" autoComplete="tel" {...register("mobile")} aria-invalid={Boolean(errors.mobile)} /><FieldError message={errors.mobile?.message} /></div>
      <div className="form-field"><Label htmlFor="subject">Subject</Label><Input id="subject" {...register("subject")} aria-invalid={Boolean(errors.subject)} /><FieldError message={errors.subject?.message} /></div>
      <div className="form-field"><Label htmlFor="message">Message</Label><Textarea id="message" rows={6} {...register("message")} aria-invalid={Boolean(errors.message)} /><FieldError message={errors.message?.message} /></div>
      <Controller name="consent" control={control} render={({ field }) => (
        <div className="consent-row"><Checkbox id="contactConsent" checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} aria-invalid={Boolean(errors.consent)} /><div><Label htmlFor="contactConsent">I consent to DMSA using these details to respond to my message.</Label><FieldError message={errors.consent?.message} /></div></div>
      )} />
      <div className="honeypot" aria-hidden="true"><Label htmlFor="contactWebsite">Website</Label><Input id="contactWebsite" tabIndex={-1} autoComplete="off" {...register("website")} /></div>
      <input type="hidden" {...register("startedAt")} /><input type="hidden" {...register("type")} />
      {submitState.type === "error" ? <div className="form-status error" role="status" aria-live="polite"><AlertCircle aria-hidden="true" /><p>{submitState.message}</p></div> : null}
      <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting}>{isSubmitting ? <LoaderCircle className="spin" aria-hidden="true" /> : <Send aria-hidden="true" />}{isSubmitting ? "Sending…" : "Send message"}</Button>
      <p className="submit-note">Messages are sent by email and are not stored on this website.</p>
      <SubmissionSuccessDialog
        open={submitState.type === "success"}
        onOpenChange={(open) => {
          if (!open) setSubmitState({ type: "idle" });
        }}
        type="message"
      />
    </form>
  );
}
