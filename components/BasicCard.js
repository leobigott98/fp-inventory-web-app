import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuthService from '../src/service/AuthService';

export default function BasicCard() {
    return (
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Faltan acciones
        </Typography> */}
        <Typography variant="h5" component="div">
          Verificación Pendiente
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Valida tu dirección de correo electrónico. 
        </Typography>
        <Typography variant="body2">
          Hemos enviado un correo a la dirección que proporcionaste.
          <br></br>
          Ingresa al enlace que te enviamos para proseguir.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={AuthService.handleSignOut}>Cerrar Sesión</Button>
      </CardActions>
    </Card>
    </Box>
    );
  }