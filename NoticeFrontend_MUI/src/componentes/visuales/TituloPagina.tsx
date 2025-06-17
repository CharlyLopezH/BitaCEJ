import { Box, Paper, Typography } from "@mui/material";

export const TituloPagina=({titulo}:TituloPaginaProps)=> {
    return(
      <Box sx={{ width: "100%" }}>
        <Box>
          <Paper>
            <Typography variant="h4">{titulo}</Typography>
          </Paper>
        </Box>
      </Box>        
    );
};

interface TituloPaginaProps {
    titulo:string;
}