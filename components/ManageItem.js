import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { assignSerial, getSerialInfo, getLocations } from "../src/service/DBService";
import SettingsIcon from '@mui/icons-material/Settings';
import FormControl from "@mui/material/FormControl";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";


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
  const [serialInfo, setSerialInfo] = React.useState(null)
  const [action, setAction] = React.useState("");
  const [value, setValue] = React.useState(null);
  const [locations, setLocations] = React.useState(['','']);

  const theme = createTheme();

  function refreshPage(){
    window.location.reload(false);
  }

  React.useEffect(() => {
    async function fetchData() {
      setLocations(await getLocations());
    }
    fetchData();
  }, []);

  React.useEffect(()=>{
    async function fetchData(){
      setSerialInfo(await getSerialInfo(props.category, props.item, props.serial))
    }
    fetchData();
  },[props.category, props.item, props.serial])

    const disponibleOptions = ["Asignar", "Dañado"]

    const asignadaOptions = ["Desasignar"]

    const averiadaOptions = ["Disponible"]

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    await assignSerial(e, props.category, props.item, props.serial, refreshPage)
    
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} disabled={!props.role}><SettingsIcon/></Button>
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
              Gestionar Serial
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
                     <>
                    {serialInfo?.status == 'disponible'? <>
                    <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="assignedTo"
                          label="Asignar a"
                          name="assignedTo"
                          pattern="[A-z0-9]"
                        />
                      </Grid>
                      </> : <></>
                    }
                    
                    <Grid item xs={12}>
                    <FormControl fullWidth required>
                          {/* <InputLabel>Acción</InputLabel> */}
                          <Autocomplete
                            //disablePortal
                            id="action"
                            //name = "action"
                            //required
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            value={action}
                            onChange={(event, newValue) =>{
                              setAction(newValue);
                            }}
                            options={serialInfo?.status == "disponible"? disponibleOptions : serialInfo?.status == "asignado"? asignadaOptions : averiadaOptions}
                            //options = {disponibleOptions}
                            sx={{ width: "100%" }}
                            renderInput={(params) => <TextField {...params} label="Acción" />}
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
