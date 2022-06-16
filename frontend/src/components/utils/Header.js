import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import UserContext from '../../context/user-context';
import {useContext} from 'react'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
    const ctx = useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutHandler = () => {
        ctx.logout();
    }
    
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar  style={{position:'fixed', top: '0px', width: '100%'}}>
                    <Toolbar>
                        {/* <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{textAlign: 'left'}}>
                            <Button color="inherit" component={Link} to="/">Shop</Button>
                        </Typography>
                        {
                            !ctx.isLoggedIn && 
                            <>
                                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                            </>
                        }{
                            ctx.role === 'admin' && 
                            <>
                                <Button color="inherit" component={Link} to="/products/addProduct">Add Product</Button>
                            </>
                        }
                        {
                            ctx.isLoggedIn && 
                            <>
                                <IconButton component={Link} to="/products/searchProduct" aria-label="seartch">
                                    <SearchIcon style={{ color: "white" }} />
                                </IconButton>
                                <IconButton component={Link} to="/wishlist" aria-label="wishlist">
                                    <FavoriteBorderIcon style={{ color: "white" }} />
                                </IconButton>
                                <IconButton component={Link} to="/cart" aria-label="cart">
                                    <ShoppingCartIcon style={{ color: "white" }} />
                                </IconButton>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                    </IconButton>
                                </Tooltip>
                            </>
                        }
            
                    </Toolbar>
                </AppBar>
            </Box>

            <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem component={Link} to="/orders">
                    My Orders
                </MenuItem>
                <MenuItem>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={logoutHandler}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
         </>
  );
}

export default Header;
