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

// Función para convertir DD-MMM-YYYY a YYYY-MM-DD
// export const convertirFechaAISOOLD = (fechaDDMMYYYY: string): string => {
//   if (!fechaDDMMYYYY) return new Date().toISOString().split('T')[0];
  
//   // Dividir la fecha en partes: [dia, mes, anio]
//   const [dia, mes, anio] = fechaDDMMYYYY.split('-');
  
//   // Formatear a YYYY-MM-DD (formato ISO que .NET entiende)
//   return `${anio}-${mes}-${dia.padStart(2, '0')}`;
// };