import { z } from "zod";

import { formOptions } from "../data/form-options-data.js";

const asEnum = (values: string[]) => values as [string, ...string[]];

const optionalText = z.string().trim().max(180);

export const quoteSchema = z
  .object({
    type: z.literal("quote"),
    fullName: z.string().trim().min(2, "Enter your full name.").max(100),
    mobile: z.string().trim().min(7, "Enter a valid mobile number.").max(30),
    email: z.string().trim().email("Enter a valid email address."),
    preferredContact: z.enum(asEnum(formOptions.preferredContact)),
    preferredContactOther: optionalText,
    customerType: z.enum(asEnum(formOptions.customerType)),
    customerTypeOther: optionalText,
    service: z.enum(asEnum(formOptions.service)),
    serviceOther: optionalText,
    pest: z.enum(asEnum(formOptions.pest)),
    pestOther: optionalText,
    propertyType: z.enum(asEnum(formOptions.propertyType)),
    propertyTypeOther: optionalText,
    address: z.string().trim().min(5, "Enter the property address or general location.").max(300),
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
    preferredDate: z.string().min(1, "Choose a preferred date."),
    details: z.string().trim().min(10, "Tell us a little more about the concern.").max(2000),
    consent: z.literal(true, { errorMap: () => ({ message: "Consent is required to submit." }) }),
    website: z.string().max(0),
    startedAt: z.coerce.number(),
  })
  .superRefine((data, context) => {
    const checks: Array<[boolean, string, keyof typeof data]> = [
      [data.preferredContact === "Other", data.preferredContactOther, "preferredContactOther"],
      [data.customerType === "Other", data.customerTypeOther, "customerTypeOther"],
      [data.service === "Other", data.serviceOther, "serviceOther"],
      [data.pest === "Other", data.pestOther, "pestOther"],
      [data.propertyType === "Other", data.propertyTypeOther, "propertyTypeOther"],
    ];
    checks.forEach(([required, value, path]) => {
      if (required && !String(value ?? "").trim()) {
        context.addIssue({ code: "custom", path: [path], message: "Please specify the other option." });
      }
    });
  });

export const contactSchema = z.object({
  type: z.literal("contact"),
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.string().trim().email("Enter a valid email address."),
  mobile: z.string().trim().max(30),
  subject: z.string().trim().min(3, "Enter a subject.").max(140),
  message: z.string().trim().min(10, "Enter a message of at least 10 characters.").max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required to submit." }) }),
  website: z.string().max(0),
  startedAt: z.coerce.number(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;

export function displayOption(value: string, other?: string) {
  return value === "Other" && other?.trim() ? `Other: ${other.trim()}` : value;
}
