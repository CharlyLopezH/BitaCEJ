import { useState } from "react";
import { useFormik } from 'formik';
import { TituloPagina } from "../visuales/TituloPagina";
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import * as Yup from 'yup';

const FormEntes = (props: FormEntesProps) => {
const [mensajeTitulo, setMensajeTitulo] = useState<string>(props.idEnte ? `Actualizando Registro de Ente ${props.idEnte}` : 'Crear Nuevo Ente');


// Interface para los valores del formulario
interface EnteFormValues {
  nombre: string;
  tipo: string;
}

//Esquema de Validación para Yup
  const validationSchema = Yup.object({
    nombre: Yup.string().required('Requerido').min(3, 'Mínimo 3 caracteres'),
    tipo: Yup.string().required('Requerido')
  });

  // Configuración de Formik
  const formik = useFormik<EnteFormValues>({
   initialValues: {
   nombre: '',
   tipo: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Datos a enviar:', values);
      // Aquí iría tu llamada API POST

  }});

  


  return(       
     <Box component='form' onSubmit={formik.handleSubmit} sx={{ maxWidth: '75%', mx: 'auto', p: 3 }}>
      <TituloPagina titulo={mensajeTitulo} />
      
      <Box sx={{maxWidth: '75%', mx: 'auto', p: 3}}>
      {/* Campo Nombre */}
      <TextField
        fullWidth
        margin="normal"
        id="nombre"
        name="nombre"
        label="Nombre"
        value={formik.values.nombre}
        onChange={formik.handleChange}
        error={formik.touched.nombre && Boolean(formik.errors.nombre)}
        helperText={formik.touched.nombre && formik.errors.nombre}        
      />
        

 {/* Campo Tipo (Select) */}
<FormControl fullWidth margin="normal" error={formik.touched.tipo && Boolean(formik.errors.tipo)}>
  <InputLabel id="tipo-label">Tipo</InputLabel>
<Select
  fullWidth
  label='Tipo'
  name="tipo"
  value={formik.values.tipo}
  onChange={(e) => formik.setFieldValue('tipo', e.target.value)}
  error={formik.touched.tipo && Boolean(formik.errors.tipo)}
  sx={{


      '& .MuiSelect-select': {
      minWidth: '100% !important',  // Fuerza ancho mínimo completo
      maxWidth: '100% !important',  // Fuerza ancho máximo completo
      width: '100%',                // Asegura el ancho total
      whiteSpace: 'normal',         // Opcional: para texto multilínea
      overflow: 'visible',          // Muestra todo el contenido
      textOverflow: 'clip'          // Elimina puntos suspensivos
     },

  }}
>
  <MenuItem value="OPD">Público Descentralizado</MenuItem>
  <MenuItem value="FID">Fideicomiso</MenuItem>
  <MenuItem value="DES">Organismo Desconcentrado</MenuItem>
  <MenuItem value="SEC">Secretaría</MenuItem>
  {/* otros items */}
</Select>
<FormHelperText>{formik.touched.tipo && formik.errors.tipo}</FormHelperText>
</FormControl>
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Enviar
      </Button>
      </Box>
     </Box>

     ); 
}

export default FormEntes;

interface FormEntesProps {
  idEnte?: number; // Si no viene Id el modo es Crear; si sí viene un id, el formulario es para actualizar
  nombre: string;
  tipo: string;
}

