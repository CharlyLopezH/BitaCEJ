// Utilidad para convertir formato DD-MMM-YYYY a Date object
const convertirFechaABackend = (fechaDDMMMYYYY: string): Date => {
  if (!fechaDDMMMYYYY) return new Date();
  
  const [dia, mes, anio] = fechaDDMMMYYYY.split('-');
  const meses: { [key: string]: number } = {
    'Ene': 0, 'Feb': 1, 'Mar': 2, 'Abr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Ago': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dic': 11
  };
  
  return new Date(Number(anio), meses[mes], Number(dia));
};