import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState, useContext } from 'react';
import styles from '../../css/pages/Home.module.css'
import ProductGrid from '../comp/ProductGrid'
import UserContext from '../../context/user-context';
import InfoModal from '../comp/InfoModal'

const SearchProduct = () => {
    const ctx = useContext(UserContext);
    const [modal, setShowModal] = useState({
        display: false,
        title: '',
        text: ''
    });
    const [formData, setFormdata] = useState({
        product: {
            value: '',
            error: false,
            helperText: ''
        }
    });
    const [products, setProducts] = useState(null);

    const buttons = {
        wishlist: ctx.role === 'admin' ? false : true,
        addToCart: ctx.role === 'admin' ? false : true,
        delete: ctx.role === 'admin' ? true : false,
        update: ctx.role === 'admin' ? true : false
    }

    const inputHandler = (e) => {
        let f = formData['product']
        f.value = e.target.value
        setFormdata({...formData, ['product']: f});
    }

    const searchHandler = async(e) => {
        try{
            const res = await fetch(`http://localhost:5000/products/filter/${formData.product.value}`, {
                method: 'GET'
            })

            const resData = await res.json();
            if(resData.products){
                setProducts(resData.products);
            }else{
                let obj = {
                    display: true,
                    title: 'Error',
                    text: resData.message
                }
                setShowModal(obj);
            }
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <TextField
                        name="name"
                        error={formData.product.error}
                        id="name"
                        label="Name"
                        margin="normal"
                        helperText={formData.product.helperText}
                        style={{width: '55%'}}
                        value={formData.product.value}
                        onChange={inputHandler}
                    />

                    <Tooltip title="Search">
                        <IconButton onClick={searchHandler}>
                            <SearchIcon fontSize='large'/>
                        </IconButton>
                    </Tooltip>
                    
                </div>

                <div className={styles['main_content']}>
                    {products && <ProductGrid products = {products} buttons={buttons} />}
                </div>
            </div>
            {modal.display && <InfoModal title={modal.title} text={modal.text} />}
        </>
    );
}


export default SearchProduct