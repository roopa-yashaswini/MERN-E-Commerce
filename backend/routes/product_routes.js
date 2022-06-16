const express = require('express')
const {check, oneOf} = require('express-validator');
const fileUpload = require('../middleware/file_upload')

const router = express.Router();
const productController = require('../controllers/products')
router.post('/create', fileUpload.single('image'),
[
    check('name').not().isEmpty(),
    check('description').isLength({min: 10}),
    check('price').isNumeric(),
    check('discount').isNumeric(),
    check('stock').isInt(),
    check('category').not().isEmpty()
],
productController.createProduct)
router.post('/update/:productId', fileUpload.single('image'),
[
    check('name').not().isEmpty(),
    check('description').isLength({min: 10}),
    check('price').isNumeric(),
    check('discount').isNumeric(),
    check('stock').isInt(),
    check('category').not().isEmpty()
],
productController.updateProduct)
router.get('/delete/:productId', productController.deleteProduct);
router.post('/addtowishlist', productController.addProductToWishlist);
router.post('/wishlist', productController.getWishlistItems);
router.post('/deletefromwishlist', productController.deleteProductFromWishlist);
router.post('/addtocart', productController.addProductToCart);
router.post('/cart', productController.getCartItems);
router.post('/deletefromcart', productController.deleteProductFromCart);
router.post('/movetowishlist', productController.moveToWishlist);
router.post('/makeorder', productController.makeOrder)
router.get('/filter/:productName', productController.filterProducts);
router.get('/getProduct/:productId', productController.getProductById)
router.get('/', productController.getProducts);


module.exports = router;
