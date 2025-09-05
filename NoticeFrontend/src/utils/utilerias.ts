import * as Yup from "yup";

// Utilidad para convertir formato DD-MMM-YYYY a Date object

export const convertirFechaAISO = (fechaDDMMYYYY: string): string => {
  if (!fechaDDMMYYYY) return new Date().toISOString().split('T')[0];
  
  try {
    const [dia, mes, anio] = fechaDDMMYYYY.split('-');
    
    // Validar que tenga todas las partes
    if (!dia || !mes || !anio) {
      return new Date().toISOString().split('T')[0];
    }
    
    // Asegurar formato consistente
    const diaFormateado = dia.padStart(2, '0');
    const mesFormateado = mes.padStart(2, '0');
    
    return `${anio}-${mesFormateado}-${diaFormateado}`;
  } catch (error) {
    console.error('Error al convertir fecha:', error);
    return new Date().toISOString().split('T')[0];
  }
};

// Función que valida formato DD-MM-YYYY
export const validarFechaDDMMYYYY = Yup.string()
  .test('formato-fecha', 'Favor de usar formato dd-MM-AAAA', (value) => {
    if (!value) return false;
    //return /^\d{2}-\d{2}-\d{4}$/.test(value); //Sólo acepta -
    // Acepta tanto - como /
    return /^\d{2}[-\/]\d{2}[-\/]\d{4}$/.test(value);
  })
  .test('fecha-valida', 'Fecha inválida', (value) => {
    if (!value) return false;
    //const [dia, mes, año] = value.split('-').map(Number); //Puro -
    // Reemplazar / por - para unificar el separador
    const fechaUnificada = value.replace(/\//g, '-');
    const [dia, mes, año] = fechaUnificada.split('-').map(Number);
    
    if (mes < 1 || mes > 12) return false;
    if (dia < 1 || dia > 31) return false;
    
    const fecha = new Date(año, mes - 1, dia);
    return fecha.getDate() === dia && 
           fecha.getMonth() === mes - 1 && 
           fecha.getFullYear() === año;
  });

// Función para convertir DD-MMM-YYYY a YYYY-MM-DD
// export const convertirFechaAISOOLD = (fechaDDMMYYYY: string): string => {
//   if (!fechaDDMMYYYY) return new Date().toISOString().split('T')[0];
  
//   // Dividir la fecha en partes: [dia, mes, anio]
//   const [dia, mes, anio] = fechaDDMMYYYY.split('-');
  
//   // Formatear a YYYY-MM-DD (formato ISO que .NET entiende)
//   return `${anio}-${mes}-${dia.padStart(2, '0')}`;
// };