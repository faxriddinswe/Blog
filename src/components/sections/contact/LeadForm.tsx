"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { Field, inputClass } from "@/components/ui/Field";
import {
  leadSchema,
  type Lead,
  type LeadInput,
  type LeadResult,
} from "@/lib/validation/lead";
import { LeadSuccess } from "./LeadSuccess";
import { TurnstileWidget } from "./TurnstileWidget";
import { useLeadErrors } from "./useLeadErrors";

/**
 * One short form (owner request): full name, phone, question / proposal →
 * POST /api/lead → Telegram. Data stays in the fields if sending fails.
 */
export function LeadForm() {
  const t = useTranslations("Contact");
  const locale = useLocale() as Lead["locale"];
  const err = useLeadErrors();
  const [serverError, setServerError] = useState<string>();
  const [sentName, setSentName] = useState<string>();

  const form = useForm<LeadInput, unknown, Lead>({
    resolver: zodResolver(leadSchema),
    defaultValues: { locale, website: "", name: "", phone: "", message: "" },
    mode: "onTouched",
  });
  const { register, handleSubmit, setValue, clearErrors, formState } = form;
  const { errors } = formState;

  // Clear a field's error as soon as it is edited, so the message doesn't
  // vanish on blur mid-click and shift the layout under the pointer.
  const field: UseFormRegister<LeadInput> = (name, options) =>
    register(name, {
      ...options,
      onChange: (event: unknown) => {
        clearErrors(name);
        return options?.onChange?.(event);
      },
    });

  const aria = (name: "name" | "phone" | "message") => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `lead-${name}-error` : undefined,
  });

  const onSubmit = handleSubmit(async (lead) => {
    setServerError(undefined);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
      const result = (await res.json()) as LeadResult;
      if (result.ok) setSentName(lead.name);
      else setServerError(err(result.error));
    } catch {
      setServerError(err("network"));
    }
  });

  if (sentName) {
    return (
      <LeadSuccess
        name={sentName}
        onReset={() => {
          form.reset({ locale, website: "", name: "", phone: "", message: "" });
          setSentName(undefined);
        }}
      />
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="lead-form">
      {/* Honeypot: off-screen, unfocusable, unlabeled for humans. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="lead-website">{t("fields.website")}</label>
        <input
          id="lead-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <Field id="lead-name" label={t("fields.name")} error={err(errors.name?.message)}>
        <input
          id="lead-name"
          autoComplete="name"
          placeholder={t("fields.namePlaceholder")}
          className={inputClass}
          {...aria("name")}
          {...field("name")}
        />
      </Field>

      <Field id="lead-phone" label={t("fields.phone")} error={err(errors.phone?.message)}>
        <input
          id="lead-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={t("fields.phonePlaceholder")}
          className={inputClass}
          {...aria("phone")}
          {...field("phone")}
        />
      </Field>

      <Field
        id="lead-message"
        label={t("fields.message")}
        error={err(errors.message?.message)}
      >
        <textarea
          id="lead-message"
          rows={5}
          placeholder={t("fields.messagePlaceholder")}
          className={`${inputClass} resize-y`}
          {...aria("message")}
          {...field("message")}
        />
      </Field>

      <TurnstileWidget onToken={(token) => setValue("turnstileToken", token)} />

      {serverError && (
        <p
          role="alert"
          className="rounded-(--radius-md) border border-accent-orange/40 bg-accent-orange/10 px-4 py-3 text-sm text-accent-peach"
        >
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={formState.isSubmitting}
        className="lead-btn lead-btn--primary glow-hover w-full"
      >
        {formState.isSubmitting ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
