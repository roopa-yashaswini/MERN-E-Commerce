import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RedirectModal from '../comp/RedirectModal';
import {useState, useContext} from 'react';
import InfoPopup from '../comp/InfoPopup';
import UserContext from '../../context/user-context';
import InfoModal from '../comp/InfoModal'

const AddToCart = (props) => {
    const {product, page} = props;
    const ctx = useContext(UserContext);
    const [showPopup, setShowPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [info, setInfo] = useState({
        display: false,
        title: '',
        text: ''
    });

    const openModal = async() => {
        if(!ctx.isLoggedIn){
            setShowModal(true);
        }else{
            setShowPopup(true);
            if(page === 'wishlist'){
                ctx.deleteProductFromWishlist(product._id);
            }

            try{
                const res = await fetch('http://localhost:5000/products/addtocart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        productId: product._id,
                        userId: ctx.userId
                    })
                })

                const resData = await res.json();
                if(resData.message === 'added to cart'){
                    ctx.addProductToCart(product);
                }else{
                    setInfo({
                        display: true,
                        title: 'Error',
                        text: resData.message
                    })
                }
            }catch(err){
                console.log(err);
            }
        }
    }
    return(
        <>
            <Button variant="contained" style={{backgroundColor: '#e91e63', color: '#FFFFFF'}} endIcon={<ShoppingCartIcon />} onClick={openModal}>
                Add To cart
            </Button>
            {showModal && <RedirectModal title="You are not Logged in" buttonText="Log In" onShowModal={setShowModal} showModal={showModal} redirectionLink="/login" /> }
            {showPopup && <InfoPopup text="Added to cart" onShowPopup={setShowPopup} />}
            {info.display && <InfoModal text={info.text} title={info.title} />}

        </>
    );
};

export default AddToCart