import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import RedirectModal from '../comp/RedirectModal';
import {useState, useContext} from 'react';
import InfoPopup from '../comp/InfoPopup';
import UserContext from '../../context/user-context'
import InfoModal from '../comp/InfoModal';


const Wishlist = (props) => {
    const {product, page} = props;
    const ctx = useContext(UserContext);
    const [showPopup, setShowPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [info, setInfo] = useState({
        display: false,
        title: '',
        text: ''
    })

    const openModal = async() => {
        const id = product.id;
        if(!ctx.isLoggedIn){
            setShowModal(true);
        }else{
            if(page === 'cart'){
                ctx.deleteProductFromCart(product._id); 
            }
            try{
                const res = await fetch('http://localhost:5000/products/addtowishlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        productId: id,
                        userId: ctx.userId
                    })
                })
                const resData = await res.json();
                if(resData.message === 'added to wishlist'){
                    ctx.addProductToWishlist(product);
                }else{
                    setInfo({
                        display: true,
                        title: 'Error',
                        text: resData.message
                    })
                }
                
                setShowPopup(true);
            }catch(err){
                console.log(err);
            }       
        }
    }


    return(
        <>
            <IconButton aria-label="wishlist" onClick={openModal}>
                <FavoriteBorderIcon style={{ color: "#e91e63" }} />
            </IconButton>
            {showModal && <RedirectModal title="You are not Logged in" buttonText="Log In" onShowModal={setShowModal} showModal={showModal} redirectionLink="/login" />}
            {showPopup && <InfoPopup text="Added to wishlist" onShowPopup={setShowPopup} />}
            {info.display && <InfoModal text={info.text} title={info.title} />}
        </>
    );
}

export default Wishlist;