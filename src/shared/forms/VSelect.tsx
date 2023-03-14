import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { useField } from "@unform/core";
import {
  CategoriesService,
  IListagemCategories,
} from "../services/api/categories";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebouce";

type VSelectProps = SelectProps & {
  name: string;
};

export function VSelect({ name, ...rest }: VSelectProps) {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);
  const [value, setValue] = React.useState(defaultValue || "");
  const [categories, setCategories] = React.useState<IListagemCategories[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const { debounce } = useDebounce();

  const busca = React.useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = React.useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  React.useEffect(() => {
    debounce(() => {
      CategoriesService.getAll(pagina, busca).then((result) => {
        if (result instanceof Error) {
          return;
        } else {
          setCategories(result.data);
        }
      });
    });
  }, [busca, debounce, pagina]);

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
        {categories.map((category) => {
          return (
            <MenuItem key={category.id} value={category.content}>
              {category.content}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}
