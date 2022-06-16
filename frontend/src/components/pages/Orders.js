import CartGrid from '../comp/CartGrid'
import styles from '../../css/pages/Home.module.css'
import {useEffect, useState, useContext} from 'react'
import UserContext from '../../context/user-context'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const Orders = () => {
    const [products, setProducts] = useState([]);
    const ctx = useContext(UserContext);

    useEffect(()=>{
        setProducts(ctx.orders);
    }, [ctx.orders])

    return(
        <>
            <div className={styles['main_content']}>
                {products.length !== 0 && <CartGrid products = {products} page="orders" />}
                {products.length === 0 && <div><div><h1>No Orders yet</h1></div><div><Button variant="text" component={Link} to="/cart">Order Now</Button></div></div>}
            </div>
        
        </>
    );
};


export default Orders