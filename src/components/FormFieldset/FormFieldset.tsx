import type { ReactNode } from "react";
import "./FormFieldset.css";

export interface FormFieldsetProps {
  legend: ReactNode;
  helperText?: ReactNode;
  children?: ReactNode;
  className?: string;
  legendClassName?: string;
  helperTextClassName?: string;
}

export function FormFieldset({
  legend,
  helperText,
  children,
  className = "form-fieldset",
  legendClassName = "form-fieldset__legend",
  helperTextClassName = "form-fieldset__helper-text",
}: FormFieldsetProps) {
  return (
    <fieldset className={className}>
      <legend className={legendClassName}>{legend}</legend>

      {helperText && <p className={helperTextClassName}>{helperText}</p>}

      {children}
    </fieldset>
  );
}
