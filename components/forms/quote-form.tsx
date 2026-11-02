"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowLeft, ArrowRight, Check, LoaderCircle, MapPin, SearchCheck, Send } from "lucide-react";
import { type FormEvent, type KeyboardEvent, type MouseEvent, useCallback, useEffect, useRef, useState } from "react";
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

const steps: Array<{ label: string; title: string; description: string; fields: Array<keyof QuoteFormValues> }> = [
  {
    label: "Service",
    title: "What do you need help with?",
    description: "Choose the closest options. If you are not sure, leave it as Unsure.",
    fields: ["customerType", "customerTypeOther", "service", "serviceOther", "pest", "pestOther", "propertyType", "propertyTypeOther"],
  },
  {
    label: "Property",
    title: "Where is the property?",
    description: "Enter an address, then tap the map or drag the pin to refine it.",
    fields: ["address", "latitude", "longitude"],
  },
  {
    label: "Your details",
    title: "How can DMSA reach you?",
    description: "Tell DMSA who to contact about this quotation and when you would like the service.",
    fields: ["fullName", "mobile", "email", "preferredContact", "preferredContactOther", "preferredDate"],
  },
  {
    label: "Message",
    title: "Tell DMSA about the concern",
    description: "Provide enough context for an initial review.",
    fields: ["details", "consent"],
  },
];

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
  const [{ step, focus }, setNavigation] = useState<{ step: number; focus: "heading" | "invalid" | null }>({ step: 0, focus: null });
  const isLastStep = step === steps.length - 1;
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    // Next never counts as a submit, so corrected fields must re-check themselves.
    mode: "onTouched",
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
      consent: false,
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

  const focusFirstInvalid = useCallback(() => {
    requestAnimationFrame(() => {
      const field = document.getElementById("quotation-request-form")?.querySelector<HTMLElement>('[aria-invalid="true"]');
      field?.focus({ preventScroll: true });
      field?.scrollIntoView({ block: "center" });
    });
  }, []);

  // Runs after a new step has rendered, so its fields exist to receive focus.
  useEffect(() => {
    if (focus === "invalid") {
      focusFirstInvalid();
    } else if (focus === "heading") {
      headingRef.current?.focus({ preventScroll: true });
      formRef.current?.scrollIntoView({ block: "start" });
    }
  }, [step, focus, focusFirstInvalid]);

  const goToStep = (next: number, nextFocus: "heading" | "invalid" = "heading") => {
    setNavigation({ step: next, focus: nextFocus });
  };

  const goNext = async () => {
    const valid = await trigger(steps[step].fields, { shouldFocus: false });
    if (!valid) {
      focusFirstInvalid();
      return;
    }
    setSubmitState({ type: "idle" });
    goToStep(step + 1);
  };

  const submit = handleSubmit(async (values) => {
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
    const invalidStep = steps.findIndex((item) => item.fields.some((field) => validationErrors[field]));
    if (invalidStep >= 0 && invalidStep !== step) goToStep(invalidStep, "invalid");
    else focusFirstInvalid();
  });

  // The next step's button appears under the pointer, so a double-click must not press it too.
  const ignoreDoubleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail > 1) event.preventDefault();
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!isLastStep) {
      event.preventDefault();
      return;
    }
    void submit(event);
  };

  // Steps before the last have no submit button, so Enter is handled here.
  const onFormKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter" && !isLastStep && event.target instanceof HTMLInputElement) {
      event.preventDefault();
      void goNext();
    }
  };

  return (
    <form ref={formRef} id="quotation-request-form" className="quote-form" onSubmit={onFormSubmit} onKeyDown={onFormKeyDown} noValidate>
      <ol className="form-steps" aria-label={`Step ${step + 1} of ${steps.length}`}>
        {steps.map((item, index) => {
          const done = index < step;
          const content = (
            <>
              <span className="form-step-marker">{done ? <Check aria-hidden="true" /> : index + 1}</span>
              <span className="form-step-label">{done ? <span className="sr-only">Completed: </span> : null}{item.label}</span>
            </>
          );
          return (
            <li key={item.label} className={index === step ? "is-current" : done ? "is-done" : undefined} aria-current={index === step ? "step" : undefined}>
              {done ? <button type="button" onClick={() => goToStep(index)}>{content}</button> : <span className="form-step-item">{content}</span>}
            </li>
          );
        })}
      </ol>

      <input type="hidden" {...register("startedAt")} />
      <input type="hidden" {...register("type")} />

      <div className="form-section">
        <div className="form-section-heading form-step-heading">
          <div>
            <h2 ref={headingRef} tabIndex={-1}>{steps[step].title}</h2>
            <p>{steps[step].description}</p>
          </div>
        </div>
        {step === 0 ? (
          <div className="form-grid two-columns">
          <div className="quotation-inclusion full-width">
            <SearchCheck aria-hidden="true" />
            <div>
              <strong>Free ocular inspection included in the quotation process</strong>
              <p>DMSA may arrange an on-site review before confirming the service scope, schedule and price.</p>
            </div>
          </div>
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
        ) : null}
        {step === 1 ? (
          <>
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
          </>
        ) : null}
        {step === 2 ? (
          <div className="form-grid two-columns">
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
        <div className="form-field full-width">
          <Label htmlFor="preferredDate">Preferred service date</Label>
          <Input id="preferredDate" type="date" min={new Date().toISOString().split("T")[0]} {...register("preferredDate")} aria-invalid={Boolean(errors.preferredDate)} />
          <ErrorText message={errors.preferredDate?.message} />
        </div>
          </div>
        ) : null}
        {step === 3 ? (
          <>
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
          </>
        ) : null}
      </div>

      {submitState.type === "error" ? (
        <div className="form-status error" role="status" aria-live="polite">
          <AlertCircle aria-hidden="true" />
          <p>{submitState.message}</p>
        </div>
      ) : null}
      <div className="form-step-actions">
        {step > 0 ? (
          <Button key="back" type="button" variant="outline" size="lg" className="form-step-back" onClick={() => goToStep(step - 1)} disabled={isSubmitting}>
            <ArrowLeft aria-hidden="true" />Back
          </Button>
        ) : null}
        <span className="form-step-count" aria-hidden="true">Step {step + 1} of {steps.length}</span>
        {isLastStep ? (
          <Button key="submit" type="submit" size="lg" className="submit-button" disabled={isSubmitting} aria-busy={isSubmitting} onClick={ignoreDoubleClick}>
            {isSubmitting ? <LoaderCircle className="spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
            {isSubmitting ? "Sending request…" : "Send quotation request"}
          </Button>
        ) : (
          <Button key="next" type="button" size="lg" className="submit-button" onClick={(event) => { if (event.detail <= 1) void goNext(); }}>
            Next<ArrowRight aria-hidden="true" />
          </Button>
        )}
      </div>
      {isLastStep ? <p className="submit-note">Your request is emailed securely to DMSA. No form data is stored by this website.</p> : null}
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
