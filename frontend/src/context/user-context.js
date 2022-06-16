import React from 'react'

const UserContext = React.createContext({
    isLoggedIn: false,
    userId: null,
    user: null,
    role: null,
    wishlistItems: null,
    cartItems: null,
    orders: null,
    token: null,
    login: (user)=>{},
    addProductToWishlist: (productId)=>{},
    deleteProductFromWishlist: (productId)=>{},
    addProductToCart: (productId)=>{},
    deleteProductFromCart: (productId)=>{},
    logout: ()=>{}
});

export default UserContext;