// components/TableWrapper.tsx
import { TableContainer, Paper, type SxProps } from '@mui/material';
import type { ReactNode } from 'react';

interface TableWrapperProps {
  children: ReactNode;
  maxHeight?: string;
  sx?: SxProps;
}

const TableWrapper = ({ children, maxHeight = '600px', sx }: TableWrapperProps) => {
  return (
    <TableContainer 
      component={Paper}
      sx={{
        maxHeight,
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'auto',
        mt: 2,
        mb: 4,
        ...sx // Permite estilos adicionales
      }}
    >
      {children}
    </TableContainer>
  );
};

export default TableWrapper;