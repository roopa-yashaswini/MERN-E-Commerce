import { useState, useEffect } from 'react';
import Slide from '@mui/material/Slide';
import styles from '../../css/comp/InfoPopup.module.css'

const InfoPopup = (props) => {
    const [checked, setChecked] = useState(true);
    const {text, onShowPopup} = props;
    useEffect(() => {
        const timer = setTimeout(() => {
          setChecked(false);
          onShowPopup(false);
        }, 2000);
        return () => clearTimeout(timer);
      }, 
    []);
    return(
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <div className={styles.bottomPopup}>
                <p>
                {text}
                </p>
            </div>
        </Slide>
    );
};

export default InfoPopup;