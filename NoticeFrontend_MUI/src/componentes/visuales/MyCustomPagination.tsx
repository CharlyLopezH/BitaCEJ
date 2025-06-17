import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { styled } from "@mui/material/styles";

interface modeloLink {
  pagina: number;
  habilitado: boolean;
  texto: string;
  activo: boolean;
}

interface paginacionProps {
  paginaActual: number;
  cantidadTotalDePaginas: number;
  radio?: number;
  onChange: (pagina: number) => void;
}

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    margin: "0 2px",
    minWidth: "32px",
    height: "32px",
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const MyCustomPagination: React.FC<paginacionProps> = ({
  paginaActual,
  cantidadTotalDePaginas,
  radio = 3,
  onChange,
}) => {
  const generarLinks = (): modeloLink[] => {
    const links: modeloLink[] = [];

    // Botón anterior
    links.push({
      pagina: paginaActual - 1,
      habilitado: paginaActual > 1,
      texto: "⟨",
      activo: false,
    });

    // Páginas alrededor de la actual
    const inicio = Math.max(1, paginaActual - radio);
    const fin = Math.min(cantidadTotalDePaginas, paginaActual + radio);

    for (let i = inicio; i <= fin; i++) {
      links.push({
        pagina: i,
        habilitado: true,
        texto: i.toString(),
        activo: i === paginaActual,
      });
    }

    // Botón siguiente
    links.push({
      pagina: paginaActual + 1,
      habilitado: paginaActual < cantidadTotalDePaginas,
      texto: "⟩",
      activo: false,
    });

    return links;
  };

  const listadoLinks = generarLinks();

  return (
    <StyledPagination
      page={paginaActual}
      count={cantidadTotalDePaginas}
      onChange={(_event, page) => onChange(page)}
      renderItem={(item) => {
        const link = listadoLinks.find((l) => l.pagina === item.page);
        if (!link) return null;

        return (
          <PaginationItem
            {...item}
            sx={{
              fontSize: {
                xs: "0.75rem", // Mobile
                sm: "0.875rem", // Tablet
                md: "8pt", // Desktop
              },
              "&.Mui-selected": {
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                  md: "8pt",
                },
              },
            }}
            disabled={!link.habilitado}
            selected={link.activo}
            component="button"
            onClick={(e) => {
              e.preventDefault();
              if (link.habilitado) {
                onChange(link.pagina);
              }
            }}
          >
            {link.texto}
          </PaginationItem>
        );
      }}
    />
  );
};

export default MyCustomPagination;
