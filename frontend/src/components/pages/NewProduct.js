import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserContext from '../../context/user-context'
import ImageUpload from '../comp/ImageUpload';
import InputLabel from '@mui/material/InputLabel';
import styles from '../../css/pages/AddProduct.module.css'
import { useParams, useHistory } from "react-router-dom";
import InfoModal from '../comp/InfoModal';


const NewProduct = (props) => {
    let role = 'new';
    const {productId} = useParams();

    const [modal, setShowModal] = React.useState({
        display: false,
        title: '',
        text: ''
    });


    if(props.page){
        role = 'update';
    }

    const ctx = React.useContext(UserContext);
    const history = useHistory();

    const [formData, setFormData] = React.useState({
        name: {
            value: '',
            error: false,
            helperText: ''
        },
        description: {
            value: '',
            error: false,
            helperText: ''
        },
        price: {
            value: '',
            error: false,
            helperText: ''
        },
        discount: {
            value: '',
            error: false,
            helperText: ''
        },
        stock: {
            value: '',
            error: false,
            helperText: ''
        },
        image: {
            value: '',
            error: false,
            helperText: ''
        },
        category: {
            value: '',
            error: false,
            helperText: ''
        }
      });

      const initialise = (product) => {
        let newObj = {
            name: {
                value: product.name,
                error: false,
                helperText: ''
            },
            description: {
                value: product.description,
                error: false,
                helperText: ''
            },
            price: {
                value: product.price.toString(),
                error: false,
                helperText: ''
            },
            discount: {
                value: product.discount.toString(),
                error: false,
                helperText: ''
            },
            stock: {
                value: product.stock.toString(),
                error: false,
                helperText: ''
            },
            image: {
                value: '',
                error: false,
                helperText: ''
            },
            category: {
                value: product.category,
                error: false,
                helperText: ''
            }
        }

        setFormData(newObj);
      }

      React.useEffect(() => {
        const getProduct = async() => {
            console.log(productId)
            try{
                const res = await fetch(`http://localhost:5000/products/getProduct/${productId}`, {
                    method: 'GET'
                });
    
                const resData = await res.json();
                console.log(resData);
                if(resData.product){
                    initialise(resData.product);
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
                    text: 'Error loading product'
                }

                setShowModal(obj);
            }
            
        }
        if(role === 'update'){
            getProduct();
        }
      }, [])
    
      const handleChange = (field) => (e) => {
        const val = formData[field];
        val.value = e.target.value;
        setFormData({ ...formData, [field]:val });
      };

      const handleImage = (id, file, valid) => {
        const val = formData[id];
        val.value = file;
        val.error = !valid;

        setFormData({ ...formData, [id]:val });
      }


    const sendData = async(e) => {
        e.preventDefault();
        for (const key in formData) {
            if (typeof formData[key] === 'object' && key !== 'image') {
                console.log(key)
                if(formData[key]['value'].trim() === ''){
                    const val = formData[key];
                    val.error = true;
                    val.helperText = "Enter a value"
                    setFormData({ ...formData, [key]:val });
                }
            }
        }
        const formD = new FormData();
        formD.append('name', formData.name.value);
        formD.append('description', formData.description.value);
        formD.append('price', formData.price.value);
        formD.append('stock', formData.stock.value);
        formD.append('discount', formData.discount.value);
        formD.append('category', formData.category.value);
        formD.append('image', formData.image.value)

        try{
            if(role === 'update'){
                const res = await fetch(`http://localhost:5000/products/update/${productId}`, {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + ctx.token
                    },
                    body: formD
                })

                const resData = await res.json();
                if(resData.product){
                    history.push('/');
                    console.log(resData);
                }else{
                    let obj = {
                        display: true,
                        title: 'Error',
                        text: resData.message
                    }
    
                    setShowModal(obj);
                }
                
            }else{
                const res = await fetch('http://localhost:5000/products/create', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + ctx.token
                    },
                    body: formD
                })

                const resData = await res.json();
                if(resData.product){
                    history.push('/');
                    console.log(resData);
                }else{
                    let obj = {
                        display: true,
                        title: 'Error',
                        text: resData.message
                    }
    
                    setShowModal(obj);
                }
            }
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <h1>{ role === 'new' ? 'Add Product' : 'Update Product'}</h1>
            <CssBaseline />
            <div className={styles.container}>
                {/* <Box sx={{border: '1px solid grey' }}> */}
                    <div>
                        <InputLabel>Name</InputLabel>
                        <TextField
                            name="name"
                            error={formData.name.error}
                            id="name"
                            label="Name"
                            margin="normal"
                            onChange={handleChange('name')}
                            helperText={formData.name.helperText}
                            value={formData.name.value}
                        />
                    </div>
                    <div>
                        <InputLabel>Description</InputLabel>
                        <TextField
                            name="description"
                            error={formData.description.error}
                            id="description"
                            label="Description"
                            margin="normal"
                            onChange={handleChange('description')}
                            helperText={formData.description.helperText}
                            value={formData.description.value}
                        />
                    </div>
                    <div>
                        <InputLabel>Price</InputLabel>
                        <TextField
                            name="price"
                            error={formData.price.error}
                            id="price"
                            label="Price"
                            margin="normal"
                            onChange={handleChange('price')}
                            helperText={formData.price.helperText}
                            value={formData.price.value}
                        />
                    </div>
                    <div>
                        <InputLabel>Discount</InputLabel>
                        <TextField
                            name="discount"
                            error={formData.discount.error}
                            id="discount"
                            label="Discount"
                            margin="normal"
                            onChange={handleChange('discount')}
                            helperText={formData.discount.helperText}
                            value={formData.discount.value}
                        />
                    </div>
                    <div>
                        <InputLabel>Stock</InputLabel>
                        <TextField
                            name="stock"
                            error={formData.stock.error}
                            id="stock"
                            label="Stock"
                            margin="normal"
                            onChange={handleChange('stock')}
                            helperText={formData.stock.helperText}
                            value={formData.stock.value}
                        />
                    </div>
                    <div>
                        <InputLabel>Category</InputLabel>
                        <TextField
                            name="category"
                            error={formData.category.error}
                            id="category"
                            label="Category"
                            margin="normal"
                            onChange={handleChange('category')}
                            helperText={formData.category.helperText}
                            value={formData.category.value}
                        />
                    </div>
                    <div style={{marginTop: '16px'}}>
                        <InputLabel>Image</InputLabel>
                        <ImageUpload id='image' center onInput={handleImage} />
                    </div>
                    <div>
                        <Button type="submit" variant="contained" size="large" onClick={sendData} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '30px', marginBottom: '10px'}}>{ role === 'new' ? 'Add Product' : 'Update Product'}</Button>
                    </div>
            </div>

            {modal.display && <InfoModal title={modal.title} text={modal.text} />}
        </>
    )
}

export default NewProduct