import Wishlist from '../../components/pages/Wishlist';
import Cart from '../../components/pages/Cart';
import Orders from '../../components/pages/Orders'
import Signup from '../../components/pages/Signup';
import Home from '../../components/pages/Home';
import SingleProductPage from '../pages/SingleProduct';
import SearchProduct from '../pages/SearchProduct';
import {Route, Switch, Redirect} from 'react-router-dom'
import UserContext from '../../context/user-context';
import {useContext} from 'react'
import NewProduct from '../pages/NewProduct';
import SignInSide from '../pages/LoginSide'



const Routes = () => {
    const ctx = useContext(UserContext);
    return(
        <main style={{height: '100%'}}>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/products/addProduct'>
              <NewProduct />
            </Route>
            <Route path='/products/updateProduct/:productId'>
              <NewProduct page="update"/>
            </Route>
            <Route path='/products/searchProduct'>
              <SearchProduct />
            </Route>
            <Route path='/products/:productId'>
              <SingleProductPage />
            </Route>
            
            <Route path='/login' exact>
              {/* {!ctx.isLoggedIn ? <Login /> : <Redirect to="/" />} */}
              {!ctx.isLoggedIn ? <SignInSide /> : <Redirect to="/" />}
            </Route>
            <Route path='/signup' exact>
              {!ctx.isLoggedIn ? <Signup /> : <Redirect to="/" />}
            </Route>

            <Route path='/wishlist' exact>
              {ctx.isLoggedIn ? <Wishlist /> : <Redirect to="/login" />}
            </Route>
            <Route path='/cart' exact>
              {ctx.isLoggedIn ? <Cart /> : <Redirect to="/login" />}
            </Route>
            <Route path='/orders' exact>
              {ctx.isLoggedIn ? <Orders /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </main>
    );
}

export default Routes;
