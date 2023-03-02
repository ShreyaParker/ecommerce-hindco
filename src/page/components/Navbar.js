import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
    return (
        <div className="bg-black text-white p-3 flex">
            <h1 className="mr-auto">Shop</h1>
            <ShoppingCartIcon/>
        </div>
    );
};

export default Navbar;