import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthService from "../src/service/AuthService";
import { useState } from "react";
import { useRouter } from "next/router";
import Modal from "@mui/material/Modal";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a color="inherit" href="https://puntogove.com/" target="_blank">
        PuntoGo
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function showAlert(){
    setOpen(true)
    setOpenLoading(false)
  }

  function printError () {
    showAlert();
    setIsError(true);
  }

  function printSuccess () {
    showAlert();
    setIsError(false);
  }

  const handleSubmit = async (e) => {
     e.preventDefault();
     setOpenLoading(true);
    await AuthService.handlePasswordForgot(e, function () {printError()},function () {printSuccess()})
  };

  return (
    <>
    <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLoading}
        //   onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Password Reset
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => handleSubmit(e)}
              noValidate
              sx={{ mt: 1, width: 1/1}}
            >
              <TextField
                inputProps={{
                  inputMode: "email",
                  pattern: "[a-z.]{3,}@tiendapuntogo.com",
                }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                title="Correo @tiendapuntogo.com válido"
              />
              <Collapse in={open}>
        <Alert severity={isError? "error" : "success"}
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
          {isError? "Ha ocurrido un problema" : "Se le ha enviado un correo para recuperar su contraseña"}
        </Alert>
      </Collapse>
      {/* <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Re-open
      </Button> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={() => {
                //   router.push(`/login`);
                // }}
              >
                Reset Password
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    Inicia sesión aquí
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
