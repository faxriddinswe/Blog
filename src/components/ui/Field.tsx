import type { ReactNode } from "react";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

/** Label + control + error, wired with aria-describedby by id convention. */
export function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium text-text">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-accent-peach">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  "w-full rounded-(--radius-md) border border-border-strong bg-bg/60 px-4 py-3 text-text placeholder:text-text-muted/70 transition-colors duration-(--dur-fast) focus:border-accent-cyan focus:outline-none aria-invalid:border-accent-orange";
