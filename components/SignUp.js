import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthService from "../src/service/AuthService";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState,useEffect } from "react";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a color="inherit" href="https://puntogove.com/" target="_blank" rel="noreferrer">
        PuntoGo
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  const [department, setDepartment] = useState("");
  const [open, setOpen] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [validName, setValidName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validJob, setValidJob] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  function showAlert() {
    setOpen(true);
    setOpenLoading(false);
  }

  function printError() {
    showAlert();
    setIsError(true);
  }

  const validateInput = (input) => {
    const pattern = /[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}/;
    let valid = pattern.test(input)
    return valid;
  };

  const validateEmail = (input) => {
    //const pattern = /([A-z.]{3,}@tiendapuntogo.com)/;
    const pattern = /([A-z.]{3,}@gmail.com)/;
    let valid = pattern.test(input);
    return valid;
  };

  const validatePassword = (input) => {
    const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    let valid = pattern.test(input);
    return valid;
  };  

  const handleSubmit = (event) => {

    event.preventDefault();

    const name = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const jobTitle = event.target.jobTitle.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    setValidName(validateInput(name));
    setValidLastName(validateInput(lastName));
    setValidJob(validateInput(jobTitle));
    setValidEmail(validateEmail(email));
    setValidPassword(validatePassword(password));

    if(validateInput(name) && validateInput(lastName) && validateInput(jobTitle) && validateEmail(email) && validatePassword(password)){
      setOpenLoading(true);
      AuthService.handleSignUp(event, function () {printError()});
    }
    

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
              Sign up
            </Typography>
            <Box
              component="form"
              
              onSubmit={(e) => handleSubmit(e)}  
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error = {!validName}                  
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}"
                    helperText={validName? "": "Debe introducir un nombre válido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  error = {!validLastName}  
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}"
                    helperText={validLastName? "" :"Debe introducir un apellido válido"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Department</InputLabel>
                    <Select
                      id="department"
                      label="Department"
                      name="department"
                      required
                      value={department}
                      onChange={handleChange}
                      title="Departamento asociado"
                    >
                      <MenuItem value={"TI"}>TI</MenuItem>
                      <MenuItem value={"Marketing"}>Marketing</MenuItem>
                      <MenuItem value={"Comercial"}>Comercial</MenuItem>
                      <MenuItem value={"Finanzas"}>Finanzas</MenuItem>
                      <MenuItem value={"Operaciones"}>Operaciones</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error = {!validJob}  
                    required
                    fullWidth
                    id="jobTitle"
                    label="Job Title"
                    name="jobTitle"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}"
                    helperText={validJob? "" : "Debe introducir un cargo válido"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error = {!validEmail}  
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    pattern="([A-z.]{3,}@tiendapuntogo.com)"
                    title="Correo @tiendapuntogo.com válido"
                    helperText={validEmail? "" : "Debe introducir un correo puntogo válido"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error = {!validPassword}  
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    title="Debe contener al menos un número, una letra minúscula, una letra mayúscula, y 8 o más caracteres"
                    helperText={validPassword? "" : "Debe contener al menos un número, una letra minúscula, una letra mayúscula, y 8 o más caracteres"}
                  />
                </Grid>
                
                <Grid item xs={12}>
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
          Asegúrese de que el usuario sea válido y no esté registrado.
        </Alert>
      </Collapse>
                  {/* <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    ¿Ya tienes cuenta? Ingresa aquí
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
