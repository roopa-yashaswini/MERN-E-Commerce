import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Delete from '../buttons/Delete';
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput';
import UserContext from '../../context/user-context';
import InfoModal from '../../components/comp/InfoModal'


const SingleCartProduct = (props) => {
  const ctx = React.useContext(UserContext)
  const {product, buttons, onShowConfetti} = props;
  const [qty, setQty] = React.useState(1);
  const [info, setInfo] = React.useState({
    state: false,
    title: '',
    text: ''
  });
  

  const qtyHandler = (e) => {
    console.log(e.target.value);
    if((e.target.value > 0 && e.target.value <= product.stock) || e.target.value == ''){
      setQty(e.target.value)
    }
  }

  const buynowHandler = async() => {
    try{
      const res = await fetch('http://localhost:5000/products/makeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product._id,
          userId: ctx.userId,
          quantity: qty
        })
      })

      const resData = await res.json();

      if(resData.order){
        onShowConfetti(true);
        setInfo({
          state: true,
          title: 'Order Placed',
          text: ''
        });
        ctx.deleteProductFromCart(product._id);
        setTimeout(function() { console.log('hi'); onShowConfetti(false);}, 5000);
      }else{
        setInfo({
          state: true,
          title: 'Error',
          text: resData.message
        });
      }
    }catch(err){
      setInfo({
        state: true,
        title: 'Error occured',
        text: ''
      });
      console.log(err);
    }
  }

  return (
    <>
    <Card sx={{ display: 'flex' }}>
        <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={`http://localhost:5000/${product.image}`}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Rs. {product.price}
          </Typography>
          <OutlinedInput
            style={{width: '6rem'}}
            size="small"
            id="outlined-adornment-password"
            type={'number'}
            value={qty}
            onChange={qtyHandler}
        />
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Delete product={product} page='cart' sx={{mx:1}} />
            <Button sx={{mx:1}} style={{ backgroundColor: "#e91e63", color: "white" }} onClick={buynowHandler}>Buy now</Button>
        </Box>
      </Box>
      
    </Card>
    {info.state && <InfoModal title={info.title} text={info.text} />}
    </>
  );
}

export default SingleCartProduct
