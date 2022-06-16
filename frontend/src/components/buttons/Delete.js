import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import UserContext from '../../context/user-context'
import { useContext, useState} from 'react';
import InfoPopup from '../comp/InfoPopup';
import ConfirmationModal from '../comp/ConfirmationModal';
import { useHistory } from 'react-router-dom';
import InfoModal from '../comp/InfoModal';

const Delete = (props) => {
    const history = useHistory();
    const {product, page} = props;
    const ctx = useContext(UserContext);
    const [showPopup, setShowPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [info, setInfo] = ({
        display: false,
        title: '',
        text: ''
    })

    const deletefromcart = async() => {
        try{
            const res = await fetch('http://localhost:5000/products/deletefromcart', {
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
            console.log(resData);
            if(resData.message === 'deleted from cart'){
                ctx.deleteProductFromCart(product._id);
                setShowPopup(true);
            }else{
                setInfo({
                    display: true,
                    title: 'Error',
                    text: resData.message
                })
            }
            
        }catch(err){
            console.log(err);
            setInfo({
                display: true,
                title: 'Error',
                text: 'Error deleting from cart'
            })
        }
    }
    const moveToWishlist = async() => {
        try{
            const res = await fetch('http://localhost:5000/products/movetowishlist', {
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
            console.log(resData);
            if(resData.message === 'moved from cart to wishlist'){
                ctx.deleteProductFromCart(product._id);
                ctx.addProductToWishlist(product._id);
            }else{
                setInfo({
                    display: true,
                    title: 'Error',
                    text: resData.message
                })
            }
            
        }catch(err){
            console.log(err);
            setInfo({
                display: true,
                title: 'Error',
                text: 'Error moving to wishlist'
            })
        }
    }
    const removeItemHandler = async() => {
        if(page === 'wishlist'){
            try{
                const res = await fetch('http://localhost:5000/products/deletefromwishlist', {
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
                console.log(resData);
                if(resData.message === 'deleted from wishlist'){
                    ctx.deleteProductFromWishlist(product._id);
                    setShowPopup(true);
                }else{
                    setInfo({
                        display: true,
                        title: 'Error',
                        text: resData.message
                    })
                }
            }catch(err){
                console.log(err);
                setInfo({
                    display: true,
                    title: 'Error',
                    text: 'Error deleting from wishlist'
                })
            }
            
        }else if(page === 'cart'){
            setShowModal(true);
        }else if(page === 'search'){
            try{
                const res = await fetch(`http://localhost:5000/products/delete/${product._id}`, {
                    method: 'GET'
                })

                const resData = await res.json();
                if(resData.message === 'Product deleted'){
                    history.push('/');
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

    const closeModalHandler = () => {
        setShowModal(false);
    }

    return(
        <>
            <IconButton onClick={removeItemHandler}>
                <DeleteOutlineOutlinedIcon  />
            </IconButton>
            {showPopup && <InfoPopup text={`Removed from ${page}`} onShowPopup={setShowPopup} />}
            {showModal && <ConfirmationModal onCloseModal={closeModalHandler} onDelete={deletefromcart} onMove={moveToWishlist} />}
            {info.display && <InfoModal text={info.text} title={info.title} />}
        </>
    );
};


export default Delete;