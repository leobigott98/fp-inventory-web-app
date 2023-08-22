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
import { newProduct, newItem, getLocations, newLocation } from '../src/service/DBService';
import { useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
  mt: 0
};

export default function TransitionsModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checked, setChecked] = React.useState(false);

  const filter = createFilterOptions();

  const theme = createTheme();

  const [status, setStatus] = React.useState('');

  const [units, setUnits] = React.useState('');
  
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

    const handleUnitChange = (event) => {
      setUnits(event.target.value);
    };

    const [value, setValue] = React.useState(null);

    function refreshPage(){
      window.location.reload(false);
    }

    const [data, setData] = useState(['','']);

    useEffect(() => {
      async function fetchData() {
        setData(await getLocations());
      }
      fetchData();
    }, []);

  const validation = (e)=>{
    
  }
  

  const handleSubmit =   (e)=>{
    e.preventDefault();

     if(props.product){
      newProduct(e, function () {refreshPage()})
     } else newItem(e,props.name, checked, function () {refreshPage()})   
    handleClose()
  }

  return (
    <div sx={{mt: 0 }}>
      <Button onClick={handleOpen} sx={{mt: 0 }} variant="outlined">{props.product ? "Agregar Nueva Categoría" : `Agregar a ${props.name}`}</Button>
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
              {props.product ? "Nueva Categoría" : `Nuevos ${props.name}`}
            </Typography>            
            {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
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
                    noValidate
                    //FIX THIS!!! CREATE A HANDLESUBMIT FUNCTION!!
                    onSubmit={(e) => handleSubmit(e)}
                    // onSubmit={ props.product? newProduct : newItem(e,props.name)   }
                    sx={{ mt: 3 }}
                  >
                  {props.item ? 
                  <>
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
                      <Grid item xs={12}>
                      <FormControlLabel
                        label="Seriales"
                        control={
                          <Checkbox
                          checked={checked}
                          onChange={handleChange}
                          />
                        }
                        />
                      </Grid>

                    </Grid>
                    
                    </> : <>
                    <Grid item xs={12}>
                    <FormControl required>
                        <TextField
                          required="true"
                          fullWidth
                          type="text"
                          name="name"
                          label="Categoría"
                          id="name"
                        />
                        </FormControl>
                      </Grid>
                    </> }
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
