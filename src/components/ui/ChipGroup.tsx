import type { UseFormRegisterReturn } from "react-hook-form";

interface ChipGroupProps {
  legend: string;
  name: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  register: UseFormRegisterReturn;
  error?: string;
}

/**
 * Single-choice chips built on native radio inputs: keyboard (arrows),
 * screen readers and form semantics work for free.
 */
export function ChipGroup({ legend, name, options, register, error }: ChipGroupProps) {
  const errorId = `${name}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined} className="grid gap-3">
      <legend className="mb-3 text-sm font-medium text-text">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="chip">
            <input type="radio" value={o.value} className="sr-only" {...register} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-sm text-accent-peach">
          {error}
        </p>
      )}
    </fieldset>
  );
}
