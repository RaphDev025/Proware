import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import vector from 'assets/images/camera.png';
import { useItemContext } from 'Context/ItemContext';

const EditItem = () => {
    const { selectedItem, clearSelectedItem } = useItemContext();
    const sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'none'];
    const [initialSizes, setInitialSizes] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
    // Update state when selectedItem changes
    if (selectedItem) {
      setFormData({
        item_code: selectedItem.item_code || '',
        item_name: selectedItem.item_name || '',
        unit_price: selectedItem.unit_price || 0,
        qty: selectedItem.qty || 0,
        invClass: selectedItem.invClass || '',
        category: selectedItem.category || '',
        subCategory: selectedItem.subCategory || '',
        apparel: selectedItem.apparel || '',
        status: selectedItem.status || '',
        product_img: selectedItem.product_img || '',
        size: selectedItem.size ? selectedItem.size : [],
      });

      setInitialSizes(selectedItem.size || []);
      setSelectedSizes(selectedItem.size || []);
    }
  }, [selectedItem]);

  const handleSizeChange = (size) => {
    if (size === 'none') {
      // If 'none' is selected, use the initial sizes
      setSelectedSizes([]);
    } else {
      // Toggle the selected state of the size
      const updatedSizes = selectedSizes.includes(size)
        ? selectedSizes.filter((selectedSize) => selectedSize !== size)
        : [...selectedSizes, size];

      setSelectedSizes(updatedSizes);
    }
  };

  const handleDropdownChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleNumberInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!selectedItem || !selectedItem._id) {
        console.error('Cannot save changes. Invalid item data.');
        return;
      }

      // Make a PATCH request to update the item
      const response = await fetch(`https://proware-api.vercel.app/api/products/${selectedItem._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, size: selectedSizes }),
      });

      if (response.ok) {
        // Placeholder logic - replace with your own logic
        console.log('Changes saved successfully:', formData);
        alert('Changes saved successfully!');

        // Close the modal and clear the selected item
        clearSelectedItem();
      } else {
        console.error('Failed to save changes:', response.statusText);
        alert('Changes Unsuccessful!');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    navigate('/admin/products');
    setFormData({
      item_code: '',
      item_name: '',
      invClass: '',
      category: '',
      qty: 0,
      unit_price: 0,
      product_img: '',
      size: [],
    });
    setSelectedSizes([]);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFormData((prevData) => ({
      ...prevData,
      product_img: base64,
    }));
  };

  return (
    <main id='new-item' className='container-fluid'>
      <div className='px-3 pt-3'>
        <h2 className='py-2 m-0 page-header'>Edit Item</h2>
        <p style={{ fontSize: '11px', color: 'gray' }}>Edit item details</p>
      </div>
      <section className='container-fluid p-3'>
        <form onSubmit={handleSubmit} className='rounded-3 statistic p-3'>
          <div className='d-flex gap-3 align-items-end mb-3'>
            <div className='dropdown statistic w-100'>
              <button
                className='statistic-2 text-light py-2 rounded-3 dropdown-toggle w-100'
                style={{ width: '350px' }}
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                {formData.invClass ? formData.invClass : 'Inventory Class'}
              </button>
              <ul className='dropdown-menu'>
                <li>
                  <p className='dropdown-item' onClick={() => handleDropdownChange('invClass', 'Uniform')}>
                    Uniform
                  </p>
                </li>
                <li>
                  <p className='dropdown-item' onClick={() => handleDropdownChange('invClass', 'Proware')}>
                    Others
                  </p>
                </li>
              </ul>
            </div>

            <div className='dropdown statistic w-100'>
              <button
                className='statistic-2 text-light py-2 rounded-3 dropdown-toggle w-100'
                style={{ width: '350px' }}
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                {formData.category ? formData.category : 'Category'}
              </button>
              <ul className='dropdown-menu'>
                <li>
                  <p className='dropdown-item' onClick={() => handleDropdownChange('category', 'College')}>
                    College
                  </p>
                </li>
                <li>
                  <p className='dropdown-item' onClick={() => handleDropdownChange('category', 'Senior High')}>
                    Senior High
                  </p>
                </li>
                <li>
                  <p className='dropdown-item' onClick={() => handleDropdownChange('category', 'Junior High')}>
                    Junior High
                  </p>
                </li>
                <li>
                  <p className='dropdown-item' onClick={() => handleDropdownChange('category', 'Others')}>
                    Others
                  </p>
                </li>
              </ul>
            </div>
            {formData.category === 'College' ? (
              <div className='dropdown statistic w-100'>
                <button
                  className='statistic-2 text-light py-2 rounded-3 dropdown-toggle w-100'
                  style={{ width: '350px' }}
                  type='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  {formData.subCategory ? formData.subCategory : 'Sub-Category'}
                </button>
                <ul className='dropdown-menu'>
                  <li>
                    <p
                      className='dropdown-item'
                      onClick={() => handleDropdownChange('subCategory', 'Information Technology')}
                    >
                      Information Technology
                    </p>
                  </li>
                  <li>
                    <p
                      className='dropdown-item'
                      onClick={() => handleDropdownChange('subCategory', 'Hospitality Management')}
                    >
                      Hospitality Management
                    </p>
                  </li>
                  <li>
                    <p className='dropdown-item' onClick={() => handleDropdownChange('subCategory', 'Tourism Management')}>
                      Tourism Management
                    </p>
                  </li>
                  <li>
                    <p
                      className='dropdown-item'
                      onClick={() => handleDropdownChange('subCategory', 'Business Management')}
                    >
                      Business Management
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              ''
            )}

            <div className='dropdown statistic w-100'>
              <button
                className='statistic-2 text-light py-2 rounded-3 dropdown-toggle w-100'
                style={{ width: '350px' }}
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                {formData.apparel ? formData.apparel : 'Apparel'}
              </button>
              <ul className='dropdown-menu'>
                <li>
                  <p className='dropdown-item' onClick={() => handleDropdownChange('apparel', 'For Men')}>
                    For Men
                  </p>
                </li>
                <li>
                  <p className='dropdown-item' onClick={() => handleDropdownChange('apparel', 'For Women')}>
                    For Women
                  </p>
                </li>
                <li>
                  <p className='dropdown-item' onClick={() => handleDropdownChange('apparel', 'Others')}>
                    Others
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className='d-flex gap-3 mb-3'>
            <div className='d-flex w-100 flex-column'>
              <label htmlFor='item_code'>Item Code</label>
              <input
                type='text'
                onChange={handleChange}
                value={formData.item_code}
                className='p-2 w-100 rounded-2'
                id='item_code'
                placeholder='Item Code'
                name='item_code'
                required
              />
            </div>

            <div className='d-flex w-100 flex-column'>
              <label htmlFor='item_name'>Item Description</label>
              <input
                type='text'
                onChange={handleChange}
                value={formData.item_name}
                className='p-2 w-100 rounded-2'
                id='item_name'
                placeholder='Item Description'
                name='item_name'
                required
              />
            </div>

            <div className='d-flex w-100 flex-column'>
              <label htmlFor='unit_price'>Selling Price</label>
              <input
                type='number'
                min={0}
                onChange={(e) => handleNumberInputChange('unit_price', e.target.value)}
                value={formData.unit_price}
                className='p-2 w-100 rounded-2'
                id='unit_price'
                placeholder='Selling Price'
                name='unit_price'
                required
              />
            </div>

            <div className='d-flex w-100 flex-column'>
              <label htmlFor='qty'>Quantity</label>
              <input
                type='number'
                min={0}
                onChange={(e) => handleNumberInputChange('qty', e.target.value)}
                value={formData.qty}
                className='p-2 w-100 rounded-2'
                id='qty'
                placeholder='Quantity'
                name='qty'
                required
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
                    onChange={() => handleSizeChange(size)}
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
                <input
                  onChange={(e) => handleFileUpload(e)}
                  type='file'
                  label='Image'
                  className='p-2 rounded-3'
                  id='product_img'
                  name='product_img'
                  accept='.jpeg, .png, .jpg'
                />
                <p className='text-light text-center p-0 m-0'>Click to Upload an image</p>
                <p style={{ fontSize: '10px' }} className='text-light text-center p-0 fst-italic '>
                  (Only .jpeg, .png, and .jpg images are accepted)
                </p>
              </div>
            </div>
          </div>

          <div className='d-flex gap-3 justify-content-end align-items-end flex-column'>
            <button
              type='submit'
              className={`rounded-2 w-25 text-light px-3 py-2 ${loading ? 'disabled loading-button' : 'button'}`}
            >
              Update Item
            </button>
            <button
              onClick={handleClear}
              type='button'
              className='btn w-25 text-light px-3 py-2'
              style={{ backgroundColor: 'var(--gray)' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditItem;
