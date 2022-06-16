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
    justifyContent: 'space-between'
}

const ConfirmationModal = (props) => {
    const {onCloseModal, onDelete, onMove} = props;
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
      setOpen(false);
      onCloseModal();
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
            Delete the product or Move to Wishlist?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }} style={style1}>
            <Button variant="outlined" onClick={onDelete}>Delete</Button>
            <Button style={{ backgroundColor: "#e91e63", color: "white" }} onClick={onMove}>Move to Wishlist</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ConfirmationModal;
