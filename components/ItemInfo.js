import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BasicTable from './BasicTable';
import { getItemInfo } from '../src/service/DBService';
import { Stack } from '@mui/material';

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

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [specs, setSpecs] = React.useState(null)

  React.useEffect(() => {  
    async function fetchData(){
      {
        setSpecs(await getItemInfo(props.category, props.name))
      }
    }
    fetchData();
  }, [props.category, props.name]);

  return (
    <div>
      <Button onClick={handleOpen}>
        <VisibilityIcon/>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Stack spacing={3}>
          <Typography variant='h5'>{props.name}</Typography>
          <Stack direction="row" spacing={2}>
            <Typography variant='h6'>Specs:</Typography>
            <Typography variant='body'>{specs?.Specs}</Typography>
          </Stack>
          <Typography variant='body'>{specs?.observations}</Typography>
        </Stack>
          
          
          
        </Box>
      </Modal>
    </div>
  );
}