import type { ChangeEvent } from "react";
import "./SelectField.css";

export interface SelectFieldOption {
  id: string;
  label: string;
}

export interface SelectFieldProps {
  options: SelectFieldOption[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholderLabel: string;
  className?: string;
}

export function SelectField({
  options,
  value,
  onChange,
  placeholderLabel,
  className = "select-field",
}: SelectFieldProps) {
  return (
    <select className={className} value={value} onChange={onChange}>
      <option value="">{placeholderLabel}</option>

      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
