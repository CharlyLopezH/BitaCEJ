import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  type SelectProps,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 150,
  margin: theme.spacing(1),
}));



const MySelectorRecords: React.FC<SelectorRecsPorPaginaProps> = ({
  defaultValue = 25,
  onChange,
  opciones = [5, 10, 25, 50],
  setPagina,
  label = "Registros por página",
  size = "small",
}) => {
  const [selectedValue, setSelectedValue] = useState<number>(defaultValue);
  const handleChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    setSelectedValue(value); // Actualizar estado local
    setPagina(1); // Resetear a la primera página
    onChange(value);
  };

  return (
    <Grid>
      {/* <FormHelperText>Seleccionar cantidad</FormHelperText> */}
      <StyledFormControl //variant="outlined"
        size={size}
        sx={{ marginLeft: "0px" }}
      >
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedValue} // Usar estado local en lugar de defaultValue
          onChange={handleChange}
          label={label}
          aria-label="Cantidad de registros por página"
        >
          {opciones.map((opcion) => (
            <MenuItem key={opcion} value={opcion}>
              {opcion}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </Grid>
  );
};

export default MySelectorRecords;

interface SelectorRecsPorPaginaProps {
  defaultValue?: number;
  onChange: (value: number) => void;
  opciones?: number[];
  setPagina: (pagina: number) => void;
}

interface SelectorRecsPorPaginaProps {
  defaultValue?: number;
  onChange: (value: number) => void;
  opciones?: number[];
  setPagina: (pagina: number) => void;
  label?: string;
  size?: SelectProps["size"];
}