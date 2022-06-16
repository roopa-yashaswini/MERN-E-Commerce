import { useReducer } from "react";
import UserContext from "./user-context";

const defaultState = {
    isLoggedIn: false,
    userId: null,
    user: null,
    role: null,
    wishlistItems: [],
    cartItems: [],
    orders: [],
    token: null
}

const userReducer = (state, action) => {
    if(action.type === 'LOGOUT'){
        return {
            ...state,
            isLoggedIn: false,
            user: null,
            role: null,
            userId: null,
            wishlistItems: [],
            cartItems: [],
            orders: [],
            token: null
        }
    }
    else if(action.type === 'LOGIN'){

        return {
            ...state,
            isLoggedIn: true,
            user: action.user.user,
            userId: action.user.user._id,
            role: action.user.user.role,
            wishlistItems: action.user.user.wishlistItems,
            cartItems: action.user.user.cartItems,
            orders: action.user.user.orders,
            token: action.user.token
        }
    
    }else if(action.type === 'ADD_TO_WISHLIST'){
        let updatedWishlist = state.wishlistItems.concat(action.product);
        return{
            ...state,
            wishlistItems: updatedWishlist
        }
    }else if(action.type === 'ADD_TO_CART'){
        let updatedCart = state.cartItems.concat(action.product);
        return{
            ...state,
            cartItems: updatedCart
        }
    }else if(action.type === 'DELETE_FROM_WISHLIST'){
        let updatedWishlist = state.wishlistItems.filter(p=> p._id !== action.productId);
        return {
            ...state,
            wishlistItems: updatedWishlist
        }
    }else if(action.type === 'DELETE_FROM_CART'){
        let updatedCart = state.cartItems.filter(p=> p._id !== action.productId);
        return {
            ...state,
            cartItems: updatedCart
        }
    }
    return defaultState;
};

const UserProvider = (props) => {
    const [userState, userDispatch] = useReducer(userReducer, defaultState);
    const login = (user) => {
        const expirationDate = new Date(new Date().getTime() + 1000*60*60);
        userDispatch({type: 'LOGIN', user: user});
        localStorage.setItem('userData', JSON.stringify({userId: user.user._id, token: user.token, expirationDate: expirationDate.toISOString()}));
    }
    const addProductToWishlist = (product) => {
        console.log('called');
        userDispatch({type: 'ADD_TO_WISHLIST', product: product});
        console.log(userState);
    }
    const deleteProductFromWishlist = (productId) => {
        userDispatch({type: 'DELETE_FROM_WISHLIST', productId: productId});
    };

    const addProductToCart = (product) => {
        userDispatch({type: 'ADD_TO_CART', product: product});
    };

    const deleteProductFromCart = (productId) => {
        userDispatch({type: 'DELETE_FROM_CART', productId: productId});
    }

    const logout = () => {
        userDispatch({type: 'LOGOUT'});
        localStorage.removeItem('userData');
    }

    const userContext = {
        isLoggedIn: userState.isLoggedIn,
        userId: userState.userId,
        user: userState.user,
        role: userState.role,
        wishlistItems: userState.wishlistItems,
        cartItems: userState.cartItems,
        orders: userState.orders,
        token: userState.token,
        login: login,
        addProductToWishlist: addProductToWishlist,
        deleteProductFromWishlist: deleteProductFromWishlist,
        addProductToCart: addProductToCart,
        deleteProductFromCart: deleteProductFromCart,
        logout: logout
    }
    return(
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;