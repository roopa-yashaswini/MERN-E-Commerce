import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const style1 = {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center'
}

const InfoModal = (props) => {
    const {title, text} = props;
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
      setOpen(false);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign: 'center'}}>
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }} style={{textAlign: 'center'}}>
              {text}
          </Typography>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" onClick={handleClose}>Close</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default InfoModal;
