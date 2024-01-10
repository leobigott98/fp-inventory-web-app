import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from '../src/service/AuthService';
import { useState } from "react";
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <a color="inherit" href="https://puntogove.com/" target="_blank" rel="noreferrer">
        Fastpayment
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SignIn() {
  const [open, setOpen] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function showAlert(){
    setOpen(true)
    setOpenLoading(false)
  }

  function printError () {
    showAlert();
    setIsError(true);
  }

  function printSuccess () {
    setIsError(false);
  }

  const validateEmail = (input) => {
    //const pattern = /([A-z.]{3,}@tiendapuntogo.com)/;
    const pattern = /([A-z.]{3,}@fastpayment.com.ve)/
    let valid = pattern.test(input);
    return valid;
  };

  const validatePassword = (input) => {
    const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    let valid = pattern.test(input);
    return valid;
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

      const email = e.target.email.value;
      const password = event.target.password.value;
      setValidEmail(validateEmail(email));
      setValidPassword(validatePassword(password));
        if(validateEmail(email) && validatePassword(password)){
          setOpenLoading(true)
          AuthService.handleSignIn(e, function () {printError()},function () {printSuccess()})
        }

  }

  return (
    <>
    {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
      <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLoading}
        //   onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={(e) => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
            <TextField
              inputProps={{ inputMode: 'email', pattern: '[a-z.]{3,}@tiendapuntogo.com' }}
              margin="normal"
              autoFocus
              error = {!validEmail}  
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              pattern="([A-z.]{3,}@tiendapuntogo.com)"
              title="Correo @fastpayment.com.ve válido"
              helperText={validEmail? "" : "Debe introducir un correo fastpayment válido"}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              error = {!validPassword}
              title="Introduzca una contraseña válida"
              helperText={validPassword? "" : "Introduzca una contraseña válida"}
            />
            <Collapse in={open}>
        <Alert severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ m: 0 }}
        >
          Verifique las credenciales.
        </Alert>
      </Collapse>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuérdame"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/passwordreset" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"¿No tienes cuenta? Regístrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}
  