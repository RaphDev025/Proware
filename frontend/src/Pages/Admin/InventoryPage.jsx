import React, { useState, useEffect } from 'react'
import { Table3 } from 'Components'
import {IconPark} from 'assets/SvgIcons'
import {iconPath} from 'Utils/handlingFunction' 

const InventoryPage = () => {
  const headers = ['Inventory Class', 'Category', 'Item Code', 'Item Description', 'In Stock']
  const [inventory, setInventory] = useState(null) 
  const [formData, setFormData] = useState({
    item_id: '',
    item_code: '',
    item_name: '',
    qty: 1, // Default quantity
    invClass: '', // Default inventory class
    category: '', // Default category
  });

  // Fetching Data from Database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
          const response = await fetch('https://modiform-api.vercel.app/api/products');
          const json = await response.json();
          console.log(json)
          if (response.ok) {
            setInventory(json);
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      } 
    };
    fetchProducts()
  }, [])

  const handleItemCodeChange = (event) => {
    const newItemCode = event.target.value;
  
    // Assuming inventory is an array of objects with 'item_code' property
    const selectedItem = inventory.find(item => item.item_code === newItemCode);
  
    if (selectedItem) {
      setFormData({
        ...formData,
        item_id: selectedItem._id,
        item_code: newItemCode,
        item_name: selectedItem.item_name,
        // You may need to update these properties based on your data structure
        // For now, setting default values
        qty: selectedItem.qty,
        invClass: selectedItem.invClass,
        category: selectedItem.category,
      });
    } else {
      // If the entered item_code doesn't match any item, reset the other fields
      setFormData({
        ...formData,
        item_code: newItemCode,
        item_name: '',
        qty: 1,
        invClass: '',
        category: '',
      });
    }
  };
  
  // Handling function for updating data
  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://modiform-api.vercel.app/api/products/${formData.item_id}`, {
        method: 'PATCH', // Assuming you are using PATCH method for updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (response.ok) {
        console.log('Update successful:', json);
        // You can perform additional actions after a successful update
        
        window.location.reload()
      } else {
        console.error('Update failed:', json);
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error updating data:', error);
      // Handle network or other errors
    }
  };

  // Handling function for other input fields
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handling function for dropdowns
  const handleDropdownChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Increase quantity function
  const increaseQty = () => {
    setFormData({
      ...formData,
      qty: formData.qty + 1,
    });
  };

  // Decrease quantity function
  const decreaseQty = () => {
    if (formData.qty > 1) {
      setFormData({
        ...formData,
        qty: formData.qty - 1,
      });
    }
  };

  return (
    <main id='inventory' className='container-fluid '>
      <div className='px-3 pt-3'>
        <h2 className='py-2 page-header'>Inventory Management</h2>
      </div>
      <section className='container-fluid p-3'>
        <p className='m-0 text-secondary'>Add new delivered items</p>
        <form onSubmit={handleUpdate} className='rounded-3 d-grid align-items-center grid-container statistic p-3'>
          <div className="d-flex flex-column">
            <label htmlFor="item_code">Item Code</label>
            <input type="text" className="p-2 w-100 rounded-2" id="item_code" value={formData.item_code} 
          onChange={handleItemCodeChange} placeholder="Item Code" name="item_code" required />
          </div>

          <div className="d-flex flex-column">
            <label htmlFor="item_name">Item Description</label>
            <input type="text" value={formData.item_name} onChange={(e) => handleInputChange('item_name', e.target.value)} className="p-2 w-100 rounded-2" id="item_name" placeholder="Item Description" name="item_name" required />
          </div>

          <div className="d-flex gap-3 statistic-2 p-3 rounded-2 align-items-center">
            <p className='m-0 text-light'>Quantity</p>
            <div className='d-flex gap-3'>
              <button className='btn btn-outline-light' onClick={decreaseQty}>-</button>
              <input type="number" onChange={(e) => handleInputChange('qty', e.target.value)} min={1} value={formData.qty} className="p-2 w-100 rounded-2" required />
              <button className='btn btn-outline-light' onClick={increaseQty}>+</button>
            </div>
          </div>

          <div className="dropdown statistic">
            <button className="statistic-2 text-light w-100 py-2 rounded-3 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {formData.invClass ? formData.invClass : 'Inventory Class'}
            </button>
            <ul className="dropdown-menu">
              <li><p className="dropdown-item"  onClick={() => handleDropdownChange('invClass', 'All')} >All</p></li>
              <li><p className="dropdown-item"  onClick={() => handleDropdownChange('invClass', 'Uniform')} >Uniform</p></li>
              <li><p className="dropdown-item"  onClick={() => handleDropdownChange('invClass', 'Others')} >Others</p></li>
            </ul>
          </div>

          <div className="dropdown statistic">
            <button className="statistic-2 text-light w-100 py-2 rounded-3 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {formData.category ? formData.category : 'Category'}
            </button>
            <ul className="dropdown-menu">
              <li><p className="dropdown-item"  onClick={() => handleDropdownChange('invClass', 'All')}>All</p></li>
              <li><p className="dropdown-item"  onClick={() => handleDropdownChange('invClass', 'Faculty')}>Faculty</p></li>
              <li><p className="dropdown-item"  onClick={() => handleDropdownChange('invClass', 'College')}>College</p></li>
              <li><p className="dropdown-item"  onClick={() => handleDropdownChange('invClass', 'Senior High')}>Senior High</p></li>
              <li><p className="dropdown-item"  onClick={() => handleDropdownChange('invClass', 'Junior High')}>Junior High</p></li>
            </ul>
          </div>
          <button className='btn py-2 btn-sm text-light' type='submit' style={{backgroundColor: 'var(--dark-blue)'}}>Update Item Stock <IconPark path={iconPath('', 'messages', 'ic:twotone-browser-updated', 'ic:twotone-browser-updated')} size={20} /></button>

        </form>
      </section>

      <section className='container-fluid p-3'>
        <p className='m-0 text-secondary'>Stock List</p>
        <section className='rounded-3 d-flex align-items-end gap-3 statistic p-3'>
          <Table3 data={inventory} headers={headers} />
        </section>
      </section>
    </main>
  )
}

export default InventoryPage