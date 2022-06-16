import {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  textAlign: 'center'
};

const RedirectModal = (props) => {
  const {title, buttonText, onShowModal, showModal, redirectionLink} = props;
  const [open, setOpen] = useState(showModal);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    onShowModal(false);
    setOpen(false)
  };

  return (
    <div>
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
            <div style={{display: 'flex', justifyContent: 'right'}}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <div style={{marginTop: '1rem'}}>
              <Button type="submit" variant="contained" size="large" component={Link} to={redirectionLink} >{buttonText}</Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default RedirectModal;