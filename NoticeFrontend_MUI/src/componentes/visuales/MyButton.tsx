import { Button } from '@mui/material';
import { styled } from '@mui/system';

const MyButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  width: 'fit-content',
  height:'fit-content',
  padding: theme.spacing(1, 3), // Usa el sistema de spacing del tema
  fontSize: '0.8rem', // Opcional: reduce el tamaño de fuente si es necesario
  '&:hover': {
    transform: 'scale(1.05)',
  },
  
}));

export default MyButton;
