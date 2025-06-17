import { createTheme } from "@mui/material";

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    compact: true; // Habilita la variante
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      headerBg: string;
      headerText: string;
    };
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    paginationDisplay: true;
  }
}

declare module '@mui/material/Box' {
  interface BoxPropsVariantOverrides {
    centered: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    default: true; // Habilita color="default"
    neutral: true; // Opcional: puedes añadir otros colores personalizados
  }
}


//Vamos a sobrescribir algunos elementos del tema
const customTheme=createTheme({
  //   palette: { //Paleta General de colores

  //   primary: {
  //     main: "#3f51b5", // Azul Material (puedes cambiarlo)
  //   },
  //   warning: {
  //     main: "#ff9800", // Naranja Material
  //   },
  //   success: { 
  //     main: "#4caf50", // Verde Material
  //   },
  //   error: { 
  //     main: "#f44336" 
  //   },
  //     info: { 
  //       main: "#2196f3" 
  //   },    
  // },  
    typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial"',  
  },  
  
  components: { //COMPONENTES

// MuiTable: {
//       styleOverrides: {
//         root: {
//           '& .MuiTableRow-root:nth-of-type(odd)': {
//             backgroundColor: 'rgba(0, 0, 0, 0.04)',
//           },
//           '& .MuiTableRow-root:hover': {
//             backgroundColor: 'rgba(0, 0, 0, 0.08)',
//           },
//         },
//       },
//     },


  MuiSelect: {
    styleOverrides: {
      select: {
        minWidth: 120,
        maxWidth:'20%',
      }
    }
  },
 
      MuiTableCell: {
      styleOverrides: {
        root: {
          
          height:'20px',
          padding: '2px 10px',  // Reduce el padding interno
          lineHeight: '1',    // Ajusta el interlineado
          fontSize:'10pt',
        }
      }
    },

    

MuiTableRow: { //Alteración de los renglones de las tablas para índices
      styleOverrides: {
      root: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)' // Color claro para filas impares
          },
                    '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)' // Color hover
          },
                    // Altura para filas normales (body)
          '&.MuiTableRow-body': {
            height: '22px', // Altura más compacta para filas de datos            
          },
        }
      }
    },
    

 MuiIconButton: { //Personalización de los botones MUI
      styleOverrides: {
        root: {
          padding: '2px', // Iconos ultra-compactos
          '& .MuiSvgIcon-root': {
            fontSize: '0.9rem' // Tamaño de icono ajustado
          }
        }
      }
    },    

    
    
MuiTypography: {

 variants: [
        {
          props: { variant: 'paginationDisplay' }, // Variante personalizada
          style: {            
          fontFamily: 'Roboto, sans-serif',
          fontSize:'10pt',
          color: 'text.secondary',
          letterSpacing: '0.025em',
          bgcolor: 'gray',
          borderRadius: 5,
          //border: '0.025em solid',
          //border: '0.4px solid #ccc',
          //borderColor: 'divider',
          display: 'inline-flex',
          alignItems: 'rigth',   
          marginTop:'2px',
          justifyContent: 'rigth',
          padding:'8px',
              }
        }
      ],

      styleOverrides: {
        h3: {
          marginTop: '4px', // Equivalente a theme.spacing(1)
          paddingTop: '8px', // Espacio interno arriba
          paddingBottom: '8px', // Espacio interno abajo
          backgroundColor: '#E0F2F1', // Fondo gris          
          display: 'block', '&:first-of-type': {
            marginTop: 0 // Evita espacio extra si es el primer elemento
          }
          // Puedes agregar más estilos aquí si necesitas
        },
        
        h4: {
          backgroundColor: '#baf6f7', // Verde Menta
          color: '#3f453f', // Verde directo
          padding: '12px',
          marginTop: '18px',
        },        

      }
    },

    MuiPagination:{
      styleOverrides:{
        root:{          
          display: 'flex',          
          justifyContent: 'center', // Centrado horizontal
          alignItems: 'center',    // Centrado vertical
          backgroundColor: '#F5F5F5',
          width: '100%',           // Asegura que ocupe todo el ancho
          padding: '2px 0',       // Espaciado opcional
          '& .MuiPagination-ul': { // Selector para el contenedor interno
            flexWrap: 'nowrap',    // Evita saltos de línea
          }
        }
     }
    },

    MuiTableHead: { //Encabezado de las tablas **header
      styleOverrides: {
        root: {
          height: '40px', // Altura de las celdas del header
            paddingTop: '8px', // Ajuste fino del padding
            paddingBottom: '8px', // Ajuste fino del padding
          backgroundColor: '#a3f2f0', // Fondo personalizado
          '& .MuiTableCell-root': {
            color: '#000000', // Color del Texto
            borderBottom: '1px solid rgb(137, 137, 139)', // Borde inferior 
          },
        },
      },
    },


  MuiPaper: {
      variants: [
        {
          props: { variant: 'compact' },
          style: {
            padding: 8,
            borderRadius: 4,
            backgroundColor: "#E0F2F1", //Aplica un tono gris muy claro al encabezado de componente Paper-compact
            marginTop: '.5%',
            marginBottom: '.5%'
          },
        },
      ],
    },
        

    MuiButton: {        
      variants: [
        {
          props: { variant: 'contained', color: 'default' }, //Características de botón default
          style: ({ theme }) => ({
            backgroundColor: theme.palette.grey[300], // Gris claro
            color: theme.palette.getContrastText(theme.palette.grey[300]),
            '&:hover': {
              backgroundColor: theme.palette.grey[400],
            },
          }),
        },
      ],

      styleOverrides: {        
        root: {
          borderRadius: "6px", // Bordes redondeados para todos los botones
          textTransform: "none", // Evita mayúsculas forzadas          
          width: 'fit-content',
          height:'fit-content',
          fontSize: '0.8rem', // Opcional: reduce el tamaño de fuente si es necesario
          '&:hover': {
          transform: 'scale(1.05)',
  },
        },        

        contained: {
          boxShadow: "none", // Elimina sombra por defecto
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(0,0,0,0.2)", // Sombras personalizadas
          },
        },
      },
    },
  },
});
export default  customTheme;