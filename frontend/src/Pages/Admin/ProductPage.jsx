import React, {useState, useEffect} from 'react'
import {ToggleTable} from 'Components'
import { useNavigate  } from 'react-router-dom';

const ProductPage = () => {
  const headers = ['INV. Class', 'Category', 'Item Code', 'Item Description', 'In Stock', 'Status', 'View Item', 'Published', 'Actions']
  // State for filtering options
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedDropdown, setSelectedDropdown] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [inventory, setInventory] = useState(null) 

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

  // Filtered data based on selected options
  const filteredData = inventory
    ? inventory.filter((item) => (
        (!selectedCategory || item.category === selectedCategory) &&
        (!selectedDropdown || item.invClass === selectedDropdown) &&
        (searchText === '' || item.item_code.toLowerCase().includes(searchText.toLowerCase()))
      ))
    : []

  const handleDelete = async (itemToDelete) => {
    try {
      // Make an API call to delete the item in the database
      const response = await fetch(`https://modiform-api.vercel.app/api/products/${itemToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      // Remove the item from the local state
      setInventory((prevInventory) => prevInventory.filter((item) => item !== itemToDelete));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  // Function to handle search
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // Function to handle category dropdown change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category === 'All' ? null : category);
  };

  // Function to handle dropdown change
  const handleDropdownChange = (dropdown) => {
    setSelectedDropdown(dropdown === 'All' ? null : dropdown);
  }
  
  const navigate = useNavigate();

  return (
    <main id='product' className='container-fluid'>
      <div className='px-3 pt-3 d-flex justify-content-between align-items-center'>
        <div>
          <h2 className='py-2 m-0 page-header'>Item List</h2>
          <p className='m-0' style={{fontSize: '11px', color: 'gray'}}>Manage the items</p>
        </div>
        <div>
          <button onClick={() => {navigate('/admin/new-item');}} className='btn btn-sm p-2 px-3 text-light' style={{backgroundColor: 'var(--dark-blue)'}}>+ Add New Item</button>
        </div>
      </div>

      <section className="container-fluid p-3 pb-0">
        <div className='rounded-3 d-flex align-items-end gap-3 statistic p-3'>
          <div className="d-flex w-100 flex-column">
            <label htmlFor="search">Search Item Code</label>
            <input value={searchText} onChange={handleSearch} type="text" className="p-2 w-100 rounded-2" id="search" placeholder="Search Item Code" name="search" required />
          </div>

          <div className="dropdown w-100 statistic">
            <button className="statistic-2 text-light w-100 py-2 rounded-3 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Category
            </button>
            <ul className="dropdown-menu">
              <li><p className="dropdown-item" onClick={() => handleCategoryChange('All')}>All</p></li>
              <li><p className="dropdown-item" onClick={() => handleCategoryChange('Faculty')}>Faculty</p></li>
              <li><p className="dropdown-item" onClick={() => handleCategoryChange('College')}>College</p></li>
              <li><p className="dropdown-item" onClick={() => handleCategoryChange('Senior High')}>Senior High</p></li>
              <li><p className="dropdown-item" onClick={() => handleCategoryChange('Junior High')}>Junior High</p></li>
            </ul>
          </div>

          <div className="dropdown w-100 statistic">
            <button className="statistic-2 text-light w-100 py-2 rounded-3 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Inventory Class
            </button>
            <ul className="dropdown-menu">
              <li><p className="dropdown-item" onClick={() => handleDropdownChange('All')}>All</p></li>
              <li><p className="dropdown-item" onClick={() => handleDropdownChange('Uniform')}>Uniform</p></li>
              <li><p className="dropdown-item" onClick={() => handleDropdownChange('Others')}>Others</p></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-fluid p-3 pb-4" >
        <div className='rounded-3 d-flex align-items-start gap-3 statistic p-3 '>
          <ToggleTable headers={headers} data={filteredData} height={'460px'} onDelete={handleDelete}/>
        </div>
      </section>
    </main>
  )
}

export default ProductPage