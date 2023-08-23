import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import {
  getLocations,
  newLocation,
  newComandera,
} from "../src/service/DBService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
  position: "relative",
  margin: 0,
  padding: 0,
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  p: 4,
};

export default function FullScreenDialog() {
  const filter = createFilterOptions();

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setData(await getLocations());
    }
    fetchData();
  }, []);

  const [isNewlocation, setIsNewLocation] = useState(false);

  // const handleOpen = () => setOpen(true);

  const theme = createTheme();

  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(null);

  function refreshPage(){
    window.location.reload(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
     await newComandera(event, function () {refreshPage()});
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar Nueva Comandera
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Nueva Comandera
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Cancel
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Nueva Comandera
          </Typography>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="s">
              <CssBaseline />
              <Box
                sx={{
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="form"
                  //noValidate
                  onSubmit={(e) => handleSubmit(e)}
                  sx={{ mt: 2 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="sn"
                        required
                        fullWidth
                        id="sn"
                        label="SN"
                        pattern="[A-Z0-9]{15}"
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="model"
                        label="MODELO"
                        name="model"
                        pattern="[A-Z0-9]{3,}"
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="imei"
                        label="IMEI1"
                        name="imei"
                        pattern="[0-9]{15}"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="imeii"
                        label="IMEI2"
                        name="imeii"
                        pattern="[0-9]{15}"
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Estatus</InputLabel>
                        <Select
                          id="status"
                          label="Estatus"
                          name="status"
                          required
                          value={status}
                          onChange={handleChange}
                        >
                          <MenuItem value={"Disponible"}>Disponible</MenuItem>
                          <MenuItem value={"Averiada"}>Averiada</MenuItem>
                          <MenuItem value={"Asignada"}>Asignada</MenuItem>
                        </Select>
                      </FormControl> 
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="caja"
                        label="CAJA"
                        name="caja"
                        pattern="[A-Za-z0-9]{1,}"
                      />
                    </Grid> */}
                    {/* <Grid item xs={12}>
                      <Autocomplete
                        value={value}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        id="location"
                        onChange={(e, newValue) => {
                          setValue(newValue);
                          }}
                        options={data}
                        getOptionLabel={(option) => {
                          // Value selected with enter, right from the input
                          if (typeof option === "string") {
                            return option;
                          }
                          // Add "xxx" option created dynamically
                          if (option.inputValue) {
                            return option.inputValue;
                          }
                          // Regular option
                          return option.name;
                        }}
                        renderOption={(props, option) => (
                          <li {...props}>{option.name}</li>
                        )}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Ubicación Física" />
                        )}
                      />
                    </Grid> */}
                    <Grid item xs={12}>
                      <TextField
                        noValidate
                        fullWidth
                        name="comments"
                        label="Comentarios"
                        type="text"
                        id="comments"
                        multiline
                        maxRows={4}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={12}></Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        onClick={handleClose}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="error"
                      >
                        Cancelar
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="success"
                      >
                        Guardar
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </Dialog>
    </div>
  );
}
