import React from 'react';
import Wishlist from '../buttons/Wishlist';
import AddToCart from '../buttons/AddToCart';
import { useParams, useHistory } from "react-router-dom";
import InfoModal from '../comp/InfoModal'


const SingleProductPage = (props) => {
    const {productId} = useParams();
    const [product, setProduct] = React.useState([]);
    const [loading, setIsLoading] = React.useState(true);
    const [newPrice, setNewPrice] = React.useState(0);
    const [modal, setShowModal] = React.useState({
        display: false,
        title: '',
        text: ''
    });

    React.useEffect(()=>{
        const getProduct = async() => {
            console.log(productId)
            try{
                const res = await fetch(`http://localhost:5000/products/getProduct/${productId}`, {
                    method: 'GET'
                });
    
                const resData = await res.json();
                if(resData.product){
                    setProduct(resData.product);
                    let d = parseFloat(product.discount);
                    let p = parseFloat(product.price);
                    setNewPrice(p-((d/100)*p));
                }else{
                    let obj = {
                        display: true,
                        title: 'Error',
                        text: resData.message
                    }
                    setShowModal(obj);
                }
                setIsLoading(false);
            }catch(err){
                console.log(err);
                let obj = {
                    display: true,
                    title: 'Error',
                    text: 'Error loading the product'
                }

                setShowModal(obj);
                setIsLoading(false);
            }
            
        }
        getProduct();
    }, [])

    


    return(
        <>
            {loading && <div>Loading</div>}
            {product && 
                <div style={{backgroundColor: '#f1f1f1', height: '100%', paddingLeft: '5rem', paddingRight: '5rem', display: 'flex', flexDirection: 'row', overflow: 'hidden'}}>
                    <div style={{display: 'flex', alignItems: 'center', width:'45%'}}>
                        <img src={`http://localhost:5000/${product.image}`} width="100%" height="500px" />
                    </div>
                    <div style={{textAlign: 'left', marginLeft: '2rem', display: 'flex', alignItems: 'center', width: '65%', paddingLeft: '1rem'}}>
                        <div style={{width: '100%'}}>
                            <h2 style={{fontFamily: 'Georgia', fontSize: '2.5rem'}}>{product.name}</h2>
                            <span style={{fontFamily: 'Georgia', fontWeight: 'normal',fontSize: '1.2rem', textDecorationLine: 'line-through', textDecorationStyle: 'solid', marginRight: '1rem'}}>Rs. {product.price}</span>
                            <span style={{fontWeight: 'bold', color:'#e91e63',fontSize: '1.2rem', marginLeft: '1rem'}}>Rs. {newPrice.toFixed(2)}</span>
                            <span style={{fontFamily: 'Georgia', fontWeight: 'bold', color:'#04aa6d',fontSize: '1.2rem', marginLeft: '1rem'}}>({product.discount}%)</span>
                            <p>{product.description}</p>

                            <div style={{marginTop: '3rem', width: '50%', display: 'flex', justifyContent: 'space-between'}}>
                                <Wishlist product={product} />
                                <AddToCart product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            }

            {modal.display && <InfoModal title={modal.title} text={modal.text} />}
        </>
    );
};

export default SingleProductPage