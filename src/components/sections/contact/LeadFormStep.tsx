"use client";

import { useTranslations } from "next-intl";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { Field, inputClass } from "@/components/ui/Field";
import {
  BUDGETS,
  BUSINESS_TYPES,
  TIMELINES,
  type LeadInput,
} from "@/lib/validation/lead";
import { useLeadErrors } from "./useLeadErrors";

interface LeadFormStepProps {
  step: number;
  register: UseFormRegister<LeadInput>;
  errors: FieldErrors<LeadInput>;
}

/** Renders the fields of one step. Values persist across steps (RHF keeps them). */
export function LeadFormStep({ step, register, errors }: LeadFormStepProps) {
  const t = useTranslations("Contact");
  const err = useLeadErrors();
  const aria = (name: keyof LeadInput) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `lead-${name}-error` : undefined,
  });

  if (step === 0) {
    return (
      <div className="grid gap-5">
        <Field id="lead-name" label={t("fields.name")} error={err(errors.name?.message)}>
          <input
            id="lead-name"
            autoComplete="name"
            placeholder={t("fields.namePlaceholder")}
            className={inputClass}
            {...aria("name")}
            {...register("name")}
          />
        </Field>
        <Field
          id="lead-contact"
          label={t("fields.contact")}
          error={err(errors.contact?.message)}
        >
          <input
            id="lead-contact"
            autoComplete="tel"
            inputMode="text"
            placeholder={t("fields.contactPlaceholder")}
            className={inputClass}
            {...aria("contact")}
            {...register("contact")}
          />
        </Field>
      </div>
    );
  }

  if (step === 1) {
    return (
      <ChipGroup
        legend={t("fields.businessType")}
        name="lead-businessType"
        options={BUSINESS_TYPES.map((v) => ({ value: v, label: t(`business.${v}`) }))}
        register={register("businessType")}
        error={err(errors.businessType?.message)}
      />
    );
  }

  if (step === 2) {
    return (
      <Field
        id="lead-description"
        label={t("fields.description")}
        error={err(errors.description?.message)}
      >
        <textarea
          id="lead-description"
          rows={6}
          placeholder={t("fields.descriptionPlaceholder")}
          className={`${inputClass} resize-y`}
          {...aria("description")}
          {...register("description")}
        />
      </Field>
    );
  }

  return (
    <div className="grid gap-8">
      <ChipGroup
        legend={t("fields.budget")}
        name="lead-budget"
        options={BUDGETS.map((v) => ({ value: v, label: t(`budget.${v}`) }))}
        register={register("budget")}
      />
      <ChipGroup
        legend={t("fields.timeline")}
        name="lead-timeline"
        options={TIMELINES.map((v) => ({ value: v, label: t(`timeline.${v}`) }))}
        register={register("timeline")}
      />
    </div>
  );
}
