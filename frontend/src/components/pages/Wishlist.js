import ProductGrid from '../comp/ProductGrid'
import styles from '../../css/pages/Home.module.css'
import {useEffect, useState, useContext} from 'react'
import UserContext from '../../context/user-context'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const Wishlist = () => {
    const [products, setProducts] = useState([]);
    const ctx = useContext(UserContext);
    const buttons = {
        wishlist: false,
        addToCart: true,
        delete: true
    }
    useEffect(()=>{
        setProducts(ctx.wishlistItems);
    }, [ctx.wishlistItems])

    return(
        <div className={styles['main_content']}>
            {products.length !== 0 && <ProductGrid products = {products} buttons={buttons} />}
            {products.length === 0 && <div><div><h1>No items in Wishlist</h1></div><div><Button variant="text" component={Link} to="/">Go to Home Page</Button></div></div>}
        </div>
    )
}

export default Wishlist