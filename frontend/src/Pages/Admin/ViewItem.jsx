import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import vector from 'assets/images/camera.png';
import { useItemContext } from 'Context/ItemContext';

const ViewItem = () => {
  const sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'none'];
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { selectedItem } = useItemContext();
  const [formData, setFormData] = useState({
    item_code: '',
    item_name: '',
    invClass: '',
    category: '',
    subCategory: '',
    apparel: '',
    qty: 0,
    unit_price: 0,
    product_img: '',
    size: [],
  });

  useEffect(() => {
    // Set formData and selectedSizes based on selectedItem
    if (selectedItem) {
      setFormData({
        item_code: selectedItem.item_code || '',
        item_name: selectedItem.item_name || '',
        invClass: selectedItem.invClass || '',
        category: selectedItem.category || '',
        subCategory: selectedItem.subCategory || '',
        apparel: selectedItem.apparel || '',
        qty: selectedItem.qty || 0,
        unit_price: selectedItem.unit_price || 0,
        product_img: selectedItem.product_img || '',
        size: selectedItem.size || [],
      });

      setSelectedSizes(selectedItem.size || []);
    }
  }, [selectedItem]);

  return (
    <main id='new-item' className='container-fluid'>
      <div className='px-3 pt-3'>
        <h2 className='py-2 m-0 page-header'>View Item</h2>
        <p style={{ fontSize: '11px', color: 'gray' }}>View item details</p>
      </div>
      <section className='container-fluid p-3'>
        <form className='rounded-3 statistic p-3'>
        <div className='d-flex gap-3 align-items-end mb-3'>
            {/* Inventory Class Dropdown */}
            <div className='dropdown statistic w-100'>
              <button
                className='statistic-2 text-light py-2 rounded-3 dropdown-toggle w-100'
                style={{ width: '350px' }}
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                disabled
              >
                {formData.invClass ? formData.invClass : 'Inventory Class'}
              </button>
              <ul className='dropdown-menu'>
                {/* No need for li and p elements here, as the dropdown is disabled */}
              </ul>
            </div>

            {/* Category Dropdown */}
            <div className='dropdown statistic w-100'>
              <button
                className='statistic-2 text-light py-2 rounded-3 dropdown-toggle w-100'
                style={{ width: '350px' }}
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                disabled
              >
                {formData.category ? formData.category : 'Category'}
              </button>
              <ul className='dropdown-menu'>
                {/* No need for li and p elements here, as the dropdown is disabled */}
              </ul>
            </div>

            {/* Sub-Category Dropdown */}
            {formData.category === 'College' && (
              <div className='dropdown statistic w-100'>
                <button
                  className='statistic-2 text-light py-2 rounded-3 dropdown-toggle w-100'
                  style={{ width: '350px' }}
                  type='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                  disabled
                >
                  {formData.subCategory ? formData.subCategory : 'Sub-Category'}
                </button>
                <ul className='dropdown-menu'>
                  {/* No need for li and p elements here, as the dropdown is disabled */}
                </ul>
              </div>
            )}

            {/* Apparel Dropdown */}
            <div className='dropdown statistic w-100'>
              <button
                className='statistic-2 text-light py-2 rounded-3 dropdown-toggle w-100'
                style={{ width: '350px' }}
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                disabled
              >
                {formData.apparel ? formData.apparel : 'Apparel'}
              </button>
              <ul className='dropdown-menu'>
                {/* No need for li and p elements here, as the dropdown is disabled */}
              </ul>
            </div>
          </div>
          <div className='d-flex gap-3 mb-3'>
            <div className='d-flex w-100 flex-column'>
              <label htmlFor='item_code'>Item Code</label>
              <input
                type='text'
                value={formData.item_code}
                className='p-2 w-100 rounded-2'
                id='item_code'
                placeholder='Item Code'
                name='item_code'
                readOnly
              />
            </div>

            <div className='d-flex w-100 flex-column'>
              <label htmlFor='item_name'>Item Description</label>
              <input
                type='text'
                value={formData.item_name}
                className='p-2 w-100 rounded-2'
                id='item_name'
                placeholder='Item Description'
                name='item_name'
                readOnly
              />
            </div>

            <div className='d-flex w-100 flex-column'>
              <label htmlFor='unit_price'>Selling Price</label>
              <input
                type='number'
                min={0}
                value={formData.unit_price}
                className='p-2 w-100 rounded-2'
                id='unit_price'
                placeholder='Selling Price'
                name='unit_price'
                readOnly
              />
            </div>

            <div className='d-flex w-100 flex-column'>
              <label htmlFor='qty'>Quantity</label>
              <input
                type='number'
                min={0}
                value={formData.qty}
                className='p-2 w-100 rounded-2'
                id='qty'
                placeholder='Quantity'
                name='qty'
                readOnly
              />
            </div>
          </div>

          <div className='d-flex gap-3 mb-3'>
            <div className='p-3 statistic-2 rounded-3 '>
              <p className='header'>Size</p>
              {sizes.map((size, index) => (
                <div key={index} className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input bg-dark '
                    id={`sizeCheckbox-${size}`}
                    checked={selectedSizes.includes(size)}
                    disabled
                  />
                  <label className='form-check-label' htmlFor={`sizeCheckbox-${size}`}>
                    {size.toUpperCase()}
                  </label>
                </div>
              ))}
            </div>

            <div className='p-3 statistic-2 rounded-3 w-100'>
              <div className='d-flex flex-column justify-content-center'>
                <h6 className='text-light text-start'>Upload Item Images</h6>
                <label htmlFor='product_img' className='p-4 h-100 rounded-5 text-center'>
                  <img alt={vector || ''} height={'200px'} src={formData.product_img || vector} />
                </label>
                <input type='file' label='Image' className='p-2 rounded-3' id='product_img' name='product_img' accept='.jpeg, .png, .jpg' disabled />
                <p className='text-light text-center p-0 m-0'>Click to Upload an image</p>
                <p style={{ fontSize: '10px' }} className='text-light text-center p-0 fst-italic '>
                  (Only .jpeg, .png, and .jpg images are accepted)
                </p>
              </div>
            </div>
          </div>

          <div className='d-flex gap-3 justify-content-end align-items-end flex-column'>
            <button
              type='button'
              className='btn w-25 text-light px-3 py-2'
              onClick={() => navigate('/admin/products')}
              style={{ backgroundColor: 'var(--gray)' }}
            >
              Back
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ViewItem;
