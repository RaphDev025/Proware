import React, { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext();

export function useCheckoutContext() {
  return useContext(CheckoutContext);
}

export function CheckoutProvider({ children }) {
  const [cart2, setCart] = useState([]);

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  // You can add more methods or state as needed

  return (
    <CheckoutContext.Provider value={{ cart2, updateCart }}>
      {children}
    </CheckoutContext.Provider>
  );
}
