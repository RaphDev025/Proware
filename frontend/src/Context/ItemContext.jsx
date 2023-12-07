import React, { createContext, useContext, useState } from 'react';

const ItemContext = createContext();

export function useItemContext() {
  return useContext(ItemContext);
}

export function ItemProvider({ children }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const selectItem = (item) => {
    setSelectedItem(item);
  };

  const clearSelectedItem = () => {
    setSelectedItem(null);
  };

  return (
    <ItemContext.Provider value={{ selectedItem, selectItem, clearSelectedItem }}>
      {children}
    </ItemContext.Provider>
  );
}
