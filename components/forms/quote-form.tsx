"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, LoaderCircle, MapPin, SearchCheck, Send } from "lucide-react";
import { useCallback, useState } from "react";
import { Controller, type FieldErrors, type FieldPath, useForm, useWatch } from "react-hook-form";

import { SubmissionSuccessDialog } from "@/components/forms/submission-success-dialog";
import { MapCanvas } from "@/components/maps/map-canvas";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formOptions } from "@/data/form-options-data";
import { siteConfig } from "@/data/site-data";
import { quoteSchema, type QuoteFormValues } from "@/lib/forms";

function ErrorText({ message }: { message?: string }) {
  return message ? <p className="field-error"><AlertCircle aria-hidden="true" />{message}</p> : null;
}

const fieldLabels: Partial<Record<keyof QuoteFormValues, string>> = {
  fullName: "Full name",
  mobile: "Mobile number",
  email: "Email",
  preferredContact: "Preferred contact method",
  preferredContactOther: "Other contact method",
  customerType: "Customer type",
  customerTypeOther: "Other customer type",
  service: "Service needed",
  serviceOther: "Other service needed",
  pest: "Pest concern",
  pestOther: "Other pest concern",
  propertyType: "Property type",
  propertyTypeOther: "Other property type",
  address: "Property address or general location",
  latitude: "Latitude",
  longitude: "Longitude",
  preferredDate: "Preferred service date",
  details: "What you are seeing",
  consent: "Consent",
};

function firstValidationError(errors: FieldErrors<QuoteFormValues>) {
  for (const [field, error] of Object.entries(errors)) {
    if (typeof error?.message === "string") {
      const label = fieldLabels[field as keyof QuoteFormValues] ?? "Required field";
      return `${label}: ${error.message}`;
    }
  }
  return "Please review the highlighted required fields.";
}

function SelectField({
  name,
  label,
  options,
  control,
  error,
}: {
  name: FieldPath<QuoteFormValues>;
  label: string;
  options: readonly string[];
  control: ReturnType<typeof useForm<QuoteFormValues>>["control"];
  error?: string;
}) {
  return (
    <div className="form-field">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={String(field.value ?? "")} onValueChange={field.onChange}>
            <SelectTrigger id={name} className="form-select" aria-invalid={Boolean(error)}>
              <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem key={option} value={option}>
                  {option === "Other" && index === options.length - 1 ? "Other (please specify)" : option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <ErrorText message={error} />
    </div>
  );
}

export function QuoteForm({
  initialService = "Unsure",
}: {
  initialService?: string;
}) {
  const [submitState, setSubmitState] = useState<{ type: "idle" | "success" | "error"; message?: string }>({ type: "idle" });
  const [startedAt] = useState(() => Date.now());
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      type: "quote",
      fullName: "",
      mobile: "",
      email: "",
      preferredContact: "Viber",
      preferredContactOther: "",
      customerType: "Residential",
      customerTypeOther: "",
      service: initialService,
      serviceOther: "",
      pest: "Unsure",
      pestOther: "",
      propertyType: "House",
      propertyTypeOther: "",
      address: "",
      longitude: siteConfig.hqCoordinates[0],
      latitude: siteConfig.hqCoordinates[1],
      preferredDate: "",
      details: "",
      consent: false as true,
      website: "",
      startedAt,
    },
  });

  const preferredContact = useWatch({ control, name: "preferredContact" });
  const customerType = useWatch({ control, name: "customerType" });
  const service = useWatch({ control, name: "service" });
  const pest = useWatch({ control, name: "pest" });
  const propertyType = useWatch({ control, name: "propertyType" });
  const longitude = Number(useWatch({ control, name: "longitude" }));
  const latitude = Number(useWatch({ control, name: "latitude" }));

  const updateCoordinates = useCallback((next: [number, number]) => {
    setValue("longitude", Number(next[0].toFixed(6)), { shouldValidate: true });
    setValue("latitude", Number(next[1].toFixed(6)), { shouldValidate: true });
  }, [setValue]);

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
      if (!response.ok) throw new Error(result.message || "The request could not be sent.");
      setSubmitState({ type: "success" });
    } catch (error) {
      setSubmitState({
        type: "error",
        message: error instanceof Error ? error.message : "The request could not be sent. Please call or Viber DMSA instead.",
      });
    }
  }, (validationErrors) => {
    setSubmitState({
      type: "error",
      message: firstValidationError(validationErrors),
    });

    requestAnimationFrame(() => {
      const firstInvalidField = document
        .getElementById("quotation-request-form")
        ?.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstInvalidField?.focus();
      firstInvalidField?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  return (
    <form id="quotation-request-form" className="quote-form" onSubmit={onSubmit} noValidate>
      <div className="form-section">
        <div className="form-section-heading"><span>01</span><div><h2>Your contact details</h2><p>Tell DMSA who to contact about this quotation.</p></div></div>
        <div className="form-grid two-columns">
          <div className="quotation-inclusion full-width">
            <SearchCheck aria-hidden="true" />
            <div>
              <strong>Free ocular inspection included in the quotation process</strong>
              <p>DMSA may arrange an on-site review before confirming the service scope, schedule and price.</p>
            </div>
          </div>
          <div className="form-field">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" autoComplete="name" {...register("fullName")} aria-invalid={Boolean(errors.fullName)} />
            <ErrorText message={errors.fullName?.message} />
          </div>
          <div className="form-field">
            <Label htmlFor="mobile">Mobile number</Label>
            <Input id="mobile" type="tel" inputMode="tel" autoComplete="tel" placeholder="09XX XXX XXXX" {...register("mobile")} aria-invalid={Boolean(errors.mobile)} />
            <ErrorText message={errors.mobile?.message} />
          </div>
          <div className="form-field">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" {...register("email")} aria-invalid={Boolean(errors.email)} />
            <ErrorText message={errors.email?.message} />
          </div>
          <SelectField name="preferredContact" label="Preferred contact method" options={formOptions.preferredContact} control={control} error={errors.preferredContact?.message} />
          {preferredContact === "Other" ? (
            <div className="form-field full-width conditional-field">
              <Label htmlFor="preferredContactOther">Other contact method</Label>
              <Input id="preferredContactOther" {...register("preferredContactOther")} aria-invalid={Boolean(errors.preferredContactOther)} />
              <ErrorText message={errors.preferredContactOther?.message} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-heading"><span>02</span><div><h2>Service needs</h2><p>Choose the closest options. “Other” is always available where it applies.</p></div></div>
        <div className="form-grid two-columns">
          <SelectField name="customerType" label="Customer type" options={formOptions.customerType} control={control} error={errors.customerType?.message} />
          {customerType === "Other" ? (
            <div className="form-field conditional-field"><Label htmlFor="customerTypeOther">Other customer type</Label><Input id="customerTypeOther" {...register("customerTypeOther")} aria-invalid={Boolean(errors.customerTypeOther)} /><ErrorText message={errors.customerTypeOther?.message} /></div>
          ) : null}
          <SelectField name="service" label="Service needed" options={formOptions.service} control={control} error={errors.service?.message} />
          {service === "Other" ? (
            <div className="form-field conditional-field"><Label htmlFor="serviceOther">Other service needed</Label><Input id="serviceOther" {...register("serviceOther")} aria-invalid={Boolean(errors.serviceOther)} /><ErrorText message={errors.serviceOther?.message} /></div>
          ) : null}
          <SelectField name="pest" label="Pest concern" options={formOptions.pest} control={control} error={errors.pest?.message} />
          {pest === "Other" ? (
            <div className="form-field conditional-field"><Label htmlFor="pestOther">Other pest concern</Label><Input id="pestOther" {...register("pestOther")} aria-invalid={Boolean(errors.pestOther)} /><ErrorText message={errors.pestOther?.message} /></div>
          ) : null}
          <SelectField name="propertyType" label="Property type" options={formOptions.propertyType} control={control} error={errors.propertyType?.message} />
          {propertyType === "Other" ? (
            <div className="form-field conditional-field"><Label htmlFor="propertyTypeOther">Other property type</Label><Input id="propertyTypeOther" {...register("propertyTypeOther")} aria-invalid={Boolean(errors.propertyTypeOther)} /><ErrorText message={errors.propertyTypeOther?.message} /></div>
          ) : null}
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-heading"><span>03</span><div><h2>Property location</h2><p>Enter an address, then tap the map or drag the pin to refine it.</p></div></div>
        <div className="form-field">
          <Label htmlFor="address">Property address or general location</Label>
          <Input id="address" autoComplete="street-address" placeholder="Barangay, city/municipality, province" {...register("address")} aria-invalid={Boolean(errors.address)} />
          <ErrorText message={errors.address?.message} />
        </div>
        <MapCanvas mode="picker" coordinates={[longitude, latitude]} onCoordinatesChange={updateCoordinates} className="picker-map" />
        <p className="field-hint"><MapPin aria-hidden="true" />Location search and reverse geocoding are optional. The pin and manual coordinates work without them.</p>
        <div className="form-grid two-columns coordinate-grid">
          <div className="form-field"><Label htmlFor="latitude">Latitude</Label><Input id="latitude" type="number" min="-90" max="90" step="any" {...register("latitude")} aria-invalid={Boolean(errors.latitude)} /><ErrorText message={errors.latitude?.message} /></div>
          <div className="form-field"><Label htmlFor="longitude">Longitude</Label><Input id="longitude" type="number" min="-180" max="180" step="any" {...register("longitude")} aria-invalid={Boolean(errors.longitude)} /><ErrorText message={errors.longitude?.message} /></div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-heading"><span>04</span><div><h2>Schedule and details</h2><p>Provide enough context for an initial review.</p></div></div>
        <div className="form-field">
          <Label htmlFor="preferredDate">Preferred service date</Label>
          <Input id="preferredDate" type="date" min={new Date().toISOString().split("T")[0]} {...register("preferredDate")} aria-invalid={Boolean(errors.preferredDate)} />
          <ErrorText message={errors.preferredDate?.message} />
        </div>
        <div className="form-field">
          <Label htmlFor="details">What are you seeing?</Label>
          <Textarea id="details" rows={5} placeholder="Describe the affected areas, when the issue started and any access considerations." {...register("details")} aria-invalid={Boolean(errors.details)} />
          <ErrorText message={errors.details?.message} />
        </div>
        <Controller
          name="consent"
          control={control}
          render={({ field }) => (
            <div className="consent-row">
              <Checkbox id="consent" checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} aria-invalid={Boolean(errors.consent)} />
              <div><Label htmlFor="consent">I consent to DMSA using these details to respond to my request.</Label><p>No booking is confirmed until DMSA follows up.</p><ErrorText message={errors.consent?.message} /></div>
            </div>
          )}
        />
        <input type="hidden" {...register("startedAt")} />
        <input type="hidden" {...register("type")} />
      </div>

      {submitState.type === "error" ? (
        <div className="form-status error" role="status" aria-live="polite">
          <AlertCircle aria-hidden="true" />
          <p>{submitState.message}</p>
        </div>
      ) : null}
      <Button type="submit" size="lg" className="submit-button" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? <LoaderCircle className="spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
        {isSubmitting ? "Sending request…" : "Send quotation request"}
      </Button>
      <p className="submit-note">Your request is emailed securely to DMSA. No form data is stored by this website.</p>
      <SubmissionSuccessDialog
        open={submitState.type === "success"}
        onOpenChange={(open) => {
          if (!open) setSubmitState({ type: "idle" });
        }}
        type="quotation"
      />
    </form>
  );
}
