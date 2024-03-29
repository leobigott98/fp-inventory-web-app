import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
import { newProduct, newItem, getLocations, newLocation, getStores, getSellers, withdraw, withdrawNS, replenish, replenishNS, assignComandera, getComanderaInfo, getItemInfo, getAvailableSerials } from '../src/service/DBService';

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

export default function TransitionsModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const filter = createFilterOptions();

  const theme = createTheme();

  const [action, setAction] = React.useState("");

  const [reason, setReason] = React.useState("");

  const [isNewlocation, setIsNewLocation] = React.useState(false);

  const [status, setStatus] = React.useState('');

  const [value, setValue] = React.useState(null);

  const [locations, setLocations] = React.useState(null);

  const [stores, setStores] = React.useState(null);

  const [sellers, setSellers] = React.useState(null);

  const [comanderaInfo, setComanderaInfo] = React.useState(['','']);

  const [itemInfo, setItemIfo] = React.useState('');

  const [serials, setSerials] = React.useState('');

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleChange = (event) => {
    setAction(event.target.value);
    console.log(action)
  };

  function refreshPage(){
    window.location.reload(false);
  }

  React.useEffect(() => {
      async function fetchData() {
        setItemIfo(await getItemInfo(props.category, props.item));
        setSerials(await getAvailableSerials(props.category, props.item));
        setLocations(await getLocations());
    }
    fetchData();
  }, [props.category, props.item]);

    const disponibleOptions = ["Vincular", "Averiada"]

    const asignadaOptions = ["Desvincular"]

    const averiadaOptions = ["Disponible"]


      /* React.useEffect(() => {
        async function fetchData() {
          setComanderaInfo(await getComanderaInfo(SN));
        }
        fetchData();
      }, []); */
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    {props.retirar? itemInfo.serials? await withdraw(e, props.category, props.item, function () {refreshPage()}):
    await withdrawNS(e, props.category, props.item, function () {refreshPage()}) :
    props.reponer? itemInfo.serials? await replenish(e, props.category, props.item, function () {refreshPage()}):
    await replenishNS(e, props.category, props.item, function () {refreshPage()}):
    console.log('no option available!')}
    
    handleClose();
  };

  const [units, setUnits] = React.useState('');
  
    const handleStatusChange = (event) => {
      setStatus(event.target.value);
    };

    const handleUnitChange = (event) => {
      setUnits(event.target.value);
    };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" disabled={props.disabled}>{props.retirar? `Asignar` : props.reponer? `Ingresar`: `Editar`}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {props.retirar? `Retiro de ${props.name}` : props.reponer? `Reposición de ${props.name}`: `Edición de ${props.name}`}
            </Typography>

            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="form"
                    //noValidate
                    onSubmit={(e) => handleSubmit(e)}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                    {props.retirar? <>

                      <Grid item xs={12}>
                        <TextField
                          name="person"
                          required
                          fullWidth
                          id="person"
                          label="Persona que recibe"
                          pattern="[A-z0-9]"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="qty"
                          required
                          fullWidth
                          id="qty"
                          label="Cantidad"
                          
                          pattern="[A-z0-9]"
                        />
                      </Grid>
                      {itemInfo.serials? 
                      <>
                      {serials?
                      <>
                        <Grid item xs={12}>
                        <FormControl fullWidth required>
                        <Autocomplete
                          disablePortal
                          id="serials"
                          options={serials.map((option) => option.serial)}
                          //sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} label="Serial" />}
                          required
                        />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <Autocomplete
                        value={value}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        id="location"
                        onChange={(event, newValue) => {
                          setValue(newValue);
                          }}
                        options={locations}
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
                    </Grid>
                        </>
                      : <></>
                      } </> : <></>}
                      <Grid item xs={12}>
                        <TextField
                          name="observations"
                          
                          fullWidth
                          id="observations"
                          label="Observaciones"
                          
                          pattern="[A-z0-9]"
                        />
                      </Grid>

                    </> : props.reponer? <>
                    <Grid item xs={12}>
                    <TextField
                          name="person"
                          required
                          fullWidth
                          id="person"
                          label="Persona que entrega"
                          
                          pattern="[A-z0-9]"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="qty"
                          required
                          fullWidth
                          id="qty"
                          label="Cantidad"
                          
                          pattern="[A-z0-9]"
                        />
                      </Grid>
                      {itemInfo?.serials?
                        <Grid item xs={12}>
                          <TextField
                            name="serial"
                            required
                            fullWidth
                            id="serial"
                            label="Serial"
                            pattern="[A-z0-9]"
                        />
                        </Grid>
                      : <></>
                      } 

                    </> : <>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="name"
                          label="Nombre"
                          name="name"
                          pattern="[A-z0-9]"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="specs"
                          label="Especificaciones"
                          name="specs"
                          pattern="[A-z0-9]"
                          multiline
                          maxRows={4}
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="qty"
                          label="Cantidad"
                          name="qty"
                          pattern="[0-9]{3}"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                          <InputLabel>Unidades</InputLabel>
                          <Select
                            id="unit"
                            label="Unidades"
                            name="unit"
                            required
                            value={units}
                            onChange={handleUnitChange}
                          >
                            <MenuItem value={"Unidades"}>Unidades</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <FormControl fullWidth required>
                          <InputLabel>Estatus</InputLabel>
                          <Select
                            id="status"
                            label="Estatus"
                            name="status"
                            required
                            value={status}
                            onChange={handleStatusChange}
                          >
                            <MenuItem value={"Disponible"}>Disponible</MenuItem>
                            <MenuItem value={"Averiada"}>Dañada</MenuItem>
                            <MenuItem value={"Asignada"}>Asignada</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            setValue({
                              name: newValue,
                            });
                          } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setValue({
                              name: newValue.inputValue,
                            });
                          } else {
                            setValue(newValue);
                          }
                        }}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);

                          const { inputValue } = params;
                          // Suggest the creation of a new value
                          const isExisting = options.some(
                            (option) => inputValue === option.name
                          );
                          if (inputValue !== "" && !isExisting) {
                            filtered.push({
                              inputValue,
                              name: `Add "${inputValue}"`,
                            });
                            setIsNewLocation(true);
                          }
                          return filtered;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        id="location"
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
                        freeSolo
                        renderInput={(params) => (
                          <TextField {...params} label="Ubicación Física" />
                        )}
                      />
                    </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="comments"
                          label="Comentarios"
                          name="comments"
                          pattern="[A-z0-9]"
                          multiline
                          maxRows={4}
                          autoComplete="off"
                        />
                      </Grid>
                    </Grid>
                    </>}
                      
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
        </Fade>
      </Modal>
    </div>
  );
}
