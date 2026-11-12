"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import {
  LEAD_STEPS,
  leadSchema,
  type Lead,
  type LeadInput,
  type LeadResult,
} from "@/lib/validation/lead";
import { LeadFormStep } from "./LeadFormStep";
import { LeadStepper } from "./LeadStepper";
import { LeadSuccess } from "./LeadSuccess";
import { TurnstileWidget } from "./TurnstileWidget";
import { useLeadErrors } from "./useLeadErrors";

const LAST = LEAD_STEPS.length - 1;

export function LeadForm() {
  const t = useTranslations("Contact");
  const locale = useLocale() as Lead["locale"];
  const err = useLeadErrors();
  const [step, setStep] = useState(0);
  const [serverError, setServerError] = useState<string>();
  const [sentName, setSentName] = useState<string>();
  const stepRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const form = useForm<LeadInput, unknown, Lead>({
    resolver: zodResolver(leadSchema),
    defaultValues: { locale, website: "" },
    mode: "onTouched",
  });
  const { register, handleSubmit, trigger, setValue, clearErrors, formState } = form;

  // Clear a field's error as soon as it is edited. Otherwise the message
  // vanishes on blur — i.e. while the user presses "Next" — and that layout
  // shift makes the click miss the button.
  const registerField: UseFormRegister<LeadInput> = (name, options) =>
    register(name, {
      ...options,
      onChange: (event: unknown) => {
        clearErrors(name);
        return options?.onChange?.(event);
      },
    });

  // Move focus to the new step's first control (not on first render).
  useEffect(() => {
    if (!moved.current) return;
    stepRef.current?.querySelector<HTMLElement>("input, textarea")?.focus();
  }, [step]);

  const next = async () => {
    if (await trigger([...LEAD_STEPS[step]])) {
      moved.current = true;
      setStep((s) => Math.min(LAST, s + 1));
    }
  };

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
      // Inputs stay filled — the user can just press send again.
      setServerError(err("network"));
    }
  });

  if (sentName) {
    return (
      <LeadSuccess
        name={sentName}
        onReset={() => {
          form.reset({ locale, website: "" });
          setSentName(undefined);
          setStep(0);
        }}
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        if (step < LAST) {
          e.preventDefault();
          void next();
        } else void onSubmit(e);
      }}
      className="lead-form"
    >
      <LeadStepper current={step} />

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

      <div ref={stepRef} key={step} className="lead-form__step">
        <LeadFormStep step={step} register={registerField} errors={formState.errors} />
      </div>

      {step === LAST && (
        <TurnstileWidget onToken={(token) => setValue("turnstileToken", token)} />
      )}

      {serverError && (
        <p
          role="alert"
          className="rounded-(--radius-md) border border-accent-orange/40 bg-accent-orange/10 px-4 py-3 text-sm text-accent-peach"
        >
          {serverError}
        </p>
      )}

      <div className="flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="lead-btn lead-btn--ghost glow-hover"
          >
            {t("back")}
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="lead-btn lead-btn--primary glow-hover"
        >
          {step < LAST ? t("next") : formState.isSubmitting ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}
