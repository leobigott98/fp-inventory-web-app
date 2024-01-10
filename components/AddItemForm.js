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
import AddIcon from '@mui/icons-material/Add';
import { newSerial } from "../src/service/DBService";

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

  const theme = createTheme();

  function refreshPage(){
    window.location.reload(false);
  }

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    await newSerial(e, props.category, props.item, refreshPage)
    
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}  disabled={!props.serials || props.disabled}><AddIcon/></Button>
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
              Agregar Serial Nuevo
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
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="serial"
                          label="Serial"
                          name="serial"
                          pattern="[A-z0-9]"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          
                          fullWidth
                          id="comments"
                          label="Comentarios"
                          name="comments"
                          pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]"
                        />
                      </Grid>
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