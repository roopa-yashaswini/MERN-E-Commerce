import * as React from 'react';
import Grid from '@mui/material/Grid';
import SingleProduct from './SingleProduct';

const ProductGrid = (props) => {
    console.log(props.products)
    const {products, buttons} = props;
    return(
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 8, md: 16 }}>
            {products.map(p=>{
                // console.log(p)
                return (
                    <Grid item xs={2} sm={4} md={4} key={p._id} justifyContent="center" >
                        <SingleProduct product={p} buttons={buttons} />
                    </Grid>
                );
            })}
        </Grid>
    )
}

export default ProductGrid