import Example from "../utils/Carousel"
import ProductGrid from '../comp/ProductGrid'
import styles from '../../css/pages/Home.module.css'
import {useEffect, useState, useContext} from 'react'
import UserContext from '../../context/user-context';
import InfoModal from '../comp/InfoModal'

const Home = () => {
    const ctx = useContext(UserContext);
    const [modal, setShowModal] = useState({
        display: false,
        title: '',
        text: ''
    });
    const [products, setProducts] = useState(null);
    useEffect(() => {
        
        const getProducts = async() => {
            try{
                const response = await fetch('http://localhost:5000/products/');
                const resData = await response.json();
                console.log(resData);
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
                let obj = {
                    display: true,
                    title: 'Error',
                    text: 'Error loading the products'
                }

                setShowModal(obj);
            }
        }
        getProducts();
    }, [])

    const buttons = {
        wishlist: true,
        addToCart: true,
        delete: false
    }

    return(
        <>
            <Example />
            <div className={styles['main_content']}>
                {products && <ProductGrid products = {products} buttons={buttons} />}
            </div>

            {modal.display && <InfoModal title={modal.title} text={modal.text} />}
        </>
    )
}

export default Home