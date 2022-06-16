import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Wishlist from '../buttons/Wishlist';
import AddToCart from '../buttons/AddToCart';
import styles from '../../css/pages/SingleProduct.module.css';
import Delete from '../buttons/Delete';
import { Link } from "react-router-dom";
import Update from '../buttons/Update';


const SingleProduct = (props) => {
    const {product, buttons} = props;
    let page;
    if(buttons.wishlist && buttons.addToCart){
        page = 'home';
    }else if(buttons.addToCart && buttons.delete){
        page = 'wishlist';
    }else if(buttons.update && buttons.delete){
        page = 'search';
    }else{
        page = 'cart';
    }

    return(
        <Card>
            
            <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={`http://localhost:5000/${product.image}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" component={Link} to={`/products/${product.id}`} style={{textDecoration: 'none'}}>
                {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Rs. {product.price}
                </Typography>
            </CardContent>
            <CardActions className={styles.center}>
                {buttons.wishlist && <Wishlist product={product} page={page} />}
                {buttons.update && <Update product={product} page={page} />}
                {buttons.addToCart && <AddToCart product={product} page={page} />}
                {buttons.delete && <Delete product={product} page={page} />}
            </CardActions>
        </Card> 
    );
};

export default SingleProduct;
