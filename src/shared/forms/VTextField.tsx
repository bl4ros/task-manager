import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import React from "react";

type VTextFieldProps = TextFieldProps & {
  name: string;
};

export function VTextField({ name, ...rest }: VTextFieldProps) {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);

  const [value, setValue] = React.useState(defaultValue || "");

  React.useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [fieldName, registerField, value]);

  return (
    <TextField
      {...rest}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={() => (error ? clearError() : undefined)}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}
