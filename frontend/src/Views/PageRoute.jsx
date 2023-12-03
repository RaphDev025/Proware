import React from 'react'
import { Navigation } from 'Components'
import { Dashboard, InventoryPage, OrderPage, NewItemPage, StudentPage, ProductPage } from 'Pages/Admin';
import { Routes, Route } from 'react-router-dom'

const PageRoute = () => {
  return (
    <>
      <Navigation />
      <Routes>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/inventory' element={<InventoryPage/>} />
          <Route path='/order' element={<OrderPage/>} />
          <Route path='/new-item' element={<NewItemPage/>} />
          <Route path='/student-list' element={<StudentPage/>} />
          <Route path='/products' element={<ProductPage/>} />
      </Routes>
    </>
  )
}

export default PageRoute