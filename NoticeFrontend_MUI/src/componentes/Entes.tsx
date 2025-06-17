import {TableRow, TableHead, Table, TableContainer, TableBody, TableCell, Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";

const Entes=()=> {
    return(
        <>
<Stack spacing={2}>
  <Box>
    <Paper variant="compact">
      <Typography variant="h3">Entes</Typography>
    </Paper>
  </Box>
    <Divider/>

{/* Componente para Traer Datos de endpoint (get entes) */}

{/* Renderizar tabla con los datos de entes */}

  <Divider />
    <Button  variant="contained" color="primary" > Botón </Button >
    {/* <Button variant="contained" color="warning">Compacto</Button>
    <Button variant="outlined" color="success">Ok</Button> 
    <Button variant="contained" color="default">Default</Button> */}
</Stack>
        </>
    );
};
export default Entes;