import React from 'react'
import { HeroPage, CollegeShop, HighShop, OtherShop, InvoiceModal, MyCart } from 'Pages/Site'
import { Navbar } from 'Components'
import { CartProvider } from 'Context/CartContext';
import { CheckoutProvider } from 'Context/CheckoutContext'
import { Routes, Route } from 'react-router-dom';

const ContainerPage = () => {
    return (
        <CheckoutProvider>
            <CartProvider> 
                <Navbar />
                <Routes>
                    <Route path='/' element={<HeroPage />} />
                    <Route path='college-shop' element={<CollegeShop />} />
                    <Route path='invoice' element={<InvoiceModal />} />
                    <Route path='high-shop' element={<HighShop />} />
                    <Route path='other-shop' element={<OtherShop />} />
                    <Route path='cart' element={<MyCart />} />
                </Routes>
            </CartProvider>
        </CheckoutProvider>
    );
};
export default ContainerPage