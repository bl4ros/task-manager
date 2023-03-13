import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { useField } from "@unform/core";
import { Box } from "@mui/material";

type VSelectProps = SelectProps & {
  name: string;
};

export function VSelect({ name, ...rest }: VSelectProps) {
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

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Select
        {...rest}
        value={value}
        displayEmpty
        error={!!error}
        onChange={handleChange}
        onClick={() => (error ? clearError() : undefined)}
      >
        <MenuItem value="" disabled>
          <em>Selecione Categoria</em>
        </MenuItem>
        <MenuItem value="Categoria 1">Categoria 1</MenuItem>
        <MenuItem value="Categoria 2">Categoria 2</MenuItem>
        <MenuItem value="Categoria 3">Categoria 3</MenuItem>
      </Select>
    </>
  );
}
