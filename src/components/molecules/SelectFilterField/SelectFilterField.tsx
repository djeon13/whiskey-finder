import type { ChangeEvent, ReactNode } from "react";
import {
  FormFieldset,
  SelectField,
  type SelectFieldOption,
} from "@components/atoms";

export interface SelectFilterFieldProps {
  legend: ReactNode;
  helperText?: ReactNode;
  options: SelectFieldOption[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholderLabel: string;
  fieldsetClassName?: string;
  legendClassName?: string;
  helperTextClassName?: string;
  selectClassName?: string;
}

export function SelectFilterField({
  legend,
  helperText,
  options,
  value,
  onChange,
  placeholderLabel,
  fieldsetClassName,
  legendClassName,
  helperTextClassName,
  selectClassName,
}: SelectFilterFieldProps) {
  return (
    <FormFieldset
      className={fieldsetClassName}
      legendClassName={legendClassName}
      helperTextClassName={helperTextClassName}
      legend={legend}
      helperText={helperText}
    >
      <SelectField
        className={selectClassName}
        options={options}
        value={value}
        onChange={onChange}
        placeholderLabel={placeholderLabel}
      />
    </FormFieldset>
  );
}
