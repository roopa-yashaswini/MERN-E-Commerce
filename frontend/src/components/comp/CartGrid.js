import * as React from 'react';
import Grid from '@mui/material/Grid';
import SingleCartProduct from './SingleCartProduct';
import SingleOrderProduct from './SingleOrderProduct';

const CartGrid = (props) => {
    console.log(props.products)
    const {products, buttons, onShowConfetti, page} = props;
    return(
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 8, md: 16 }}>
            {products.map(p=>{
                // console.log(p)
                return (
                    <Grid item xs={2} sm={4} md={4} key={p._id} justifyContent="center"  >
                        {page === "cart" && <SingleCartProduct product={p} buttons={buttons} onShowConfetti={onShowConfetti} />}
                        {page === "orders" && <SingleOrderProduct product={p} />}
                    </Grid>
                );
            })}
        </Grid>
    )
}

export default CartGrid;