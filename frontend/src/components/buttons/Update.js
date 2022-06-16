import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";


const Update = (props) => {
    const {product, page} = props;
    const history = useHistory();
    const redirectHandler = () => {
        history.push(`/products/updateProduct/${product._id}`);
    }
    return(
        <Button variant="contained" style={{backgroundColor: '#e91e63', color: '#FFFFFF'}} onClick={redirectHandler}>
            Update
        </Button>
    )
}

export default Update