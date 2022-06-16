import CartGrid from '../comp/CartGrid'
import styles from '../../css/pages/Home.module.css'
import {useEffect, useState, useContext} from 'react'
import UserContext from '../../context/user-context'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import ConfettiComp from '../comp/ConfettiComp';

const Cart = () => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [products, setProducts] = useState([]);
    const ctx = useContext(UserContext);
    const buttons = {
        wishlist: true,
        addToCart: false,
        delete: true
    }
    const showConfettiHandler = (b) => {
        console.log(b);
        setShowConfetti(b);
    }
    useEffect(()=>{
        setProducts(ctx.cartItems);
    }, [ctx.cartItems])

    return(
        <>
        {showConfetti && <ConfettiComp />}
        <div className={styles['main_content']}>

            {products.length !== 0 && <CartGrid page="cart" products = {products} buttons={buttons} onShowConfetti={showConfettiHandler} />}
            {products.length === 0 && <div><div><h1>No items in Cart</h1></div><div><Button variant="text" component={Link} to="/">Start Shopping!</Button></div></div>}
        </div>
        </>
    )
}

export default Cart