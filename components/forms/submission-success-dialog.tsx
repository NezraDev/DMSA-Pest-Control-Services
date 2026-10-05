"use client";

import { Check, Mail } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const copy = {
  message: {
    title: "Message Sent",
    description:
      "Your message has been sent to DMSA. A team member can follow up using the contact details you provided.",
    status: "Delivered to DMSA · Reply pending",
  },
  quotation: {
    title: "Quotation Request Sent",
    description:
      "DMSA has received your request. A team member will follow up about your quotation.",
    status: "Request delivered · Quotation reply pending",
  },
} as const;

export function SubmissionSuccessDialog({
  open,
  onOpenChange,
  type,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: keyof typeof copy;
}) {
  const content = copy[type];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="submission-success-dialog"
        overlayClassName="submission-success-overlay"
      >
        <div className="submission-success-icon" aria-hidden="true">
          <Mail />
          <span><Check /></span>
        </div>
        <DialogTitle className="submission-success-title">
          {content.title}
        </DialogTitle>
        <DialogDescription className="submission-success-description">
          {content.description}
        </DialogDescription>
        <p className="submission-success-status">
          <span aria-hidden="true" />
          {content.status}
        </p>
      </DialogContent>
    </Dialog>
  );
}
