import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Switch from '@mui/material/Switch';
import AuthService from "../src/service/AuthService";
import { getUserData } from "../src/service/DBService";
import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';

const theme = createTheme();

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function ProfileData() {

  const [open, setOpen] = useState(false);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [rows, setRows] = useState(null);

  useEffect(() => {  
    async function fetchData() {
      setRows(await getUserData(AuthService.auth.currentUser.uid));
    }
    
    fetchData();
  }, []);

  return (
    <>
    { rows?
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar {...stringAvatar(`${rows.name} ${rows.lastname}`)} sx={{ width: 56, height: 56 }}/>
            <Typography component="h1" variant="h5">
              Perfil
            </Typography>
            <Box
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField              
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={rows.name}
                    defaultValue="First Name"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={rows.lastname}
                    defaultValue="Last Name"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth >
                    <TextField
                      id="department"
                      label="Department"
                      name="department"
                      value={rows.department}
                      defaultValue="Department"
                    disabled
                      
                    />   
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="jobTitle"
                    label="Job Title"
                    name="jobTitle"
                    value={rows.title}
                    defaultValue="Job Title"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={rows.email}
                    defaultValue="Email"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel disabled control={<Switch  />} label="Admin" />
                </Grid>              
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="mailto:developers@tiendapuntogo.com?cc=l.bigott@tiendapuntogo.com&bcc=r.bernay@tiendapuntogo.com&subject=Actualización%20de%20Datos%20-%20Sistema%20de%20Inventario&body=Escriba%20aquí%20su%20solicitud.%20Responderemos%20a%20la%20brevedad%20posible." variant="body2">
                    ¿Quieres cambiar algo? Escríbe aquí
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </> : <></>
    }
    </>
);
}