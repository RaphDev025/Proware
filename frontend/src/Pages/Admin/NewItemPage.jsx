import React, {useState} from 'react'
import { useNavigate  } from 'react-router-dom'; 
import vector from 'assets/images/camera.png'

const NewItemPage = () => {
  const sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', 'none']
  const [selectedSizes, setSelectedSizes] = useState([])
  const [loading, setLoading] = useState(false)
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
    size: []
  })

  const handleSizeChange = (size) => {
    if (size === 'NONE') {
      // If 'none' is selected, clear all other selected sizes
      setSelectedSizes([]);
    } else {
      // Toggle the selected state of the size
      const updatedSizes = selectedSizes.includes(size)
        ? selectedSizes.filter((selectedSize) => selectedSize !== size)
        : [...selectedSizes, size];
      setSelectedSizes(updatedSizes);
      setFormData((prevData) => ({ ...prevData, size: updatedSizes }));
    }
  } 

  const handleDropdownChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  }

  const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({
          ...prevData,
          [id]: value,
      }));
  }

  const handleNumberInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true)
    try {
      const response = await fetch('https://modiform-api.vercel.app/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const json = await response.json()
      if(!response.ok){
        alert('Product Not Uploaded')
        console.log(json)
        setLoading(false)
        navigate('/admin/products')
        setFormData({
          item_code: '',
          item_name: '',
          invClass: '',
          category: '',
          subCategory: '',
          apparel: '',
          qty: 0,
          unit_price: 0,
          product_img: '',
          size: []
        })
        setSelectedSizes([])
    }
    if(response.ok){
        alert('Product Uploaded')
        setLoading(false)
        console.log(json)
        setFormData({
          item_code: '',
          item_name: '',
          invClass: '',
          category: '',
          subCategory: '',
          apparel: '',
          qty: 0,
          unit_price: 0,
          product_img: '',
          size: []
        })
        setSelectedSizes([])
    }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  const handleCLear = () => {
    navigate('/admin/products')
    setFormData({
      item_code: '',
      item_name: '',
      invClass: '',
      category: '',
      qty: 0,
      unit_price: 0,
      product_img: '',
      size: [],
    })
    setSelectedSizes([])
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file)
    setFormData((prevData) => ({
        ...prevData,
        'product_img': base64,
    }));
}

  return (
    <main id='new-item' className='container-fluid'>
      <div className='px-3 pt-3'>
        <h2 className='py-2 m-0 page-header'>Add New Item</h2>
        <p style={{fontSize: '11px', color: 'gray'}}>Create new item</p>
      </div>
      <section className="container-fluid p-3">
        <form onSubmit={handleSubmit} className="rounded-3 statistic p-3">
          <div className='d-flex gap-3 align-items-end mb-3'>
            <div className="dropdown statistic w-100">
              <button className="statistic-2 text-light py-2 rounded-3 dropdown-toggle w-100" style={{width: '350px'}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {formData.invClass ? formData.invClass : 'Inventory Class'}
              </button>
              <ul className="dropdown-menu">
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('invClass', 'Uniform')}>Uniform</p></li>
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('invClass', 'Others')}>Others</p></li>
              </ul>
            </div>

            <div className="dropdown statistic w-100">
              <button className="statistic-2 text-light py-2 rounded-3 dropdown-toggle w-100" style={{width: '350px'}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {formData.category ? formData.category : 'Category'}
              </button>
              <ul className="dropdown-menu">
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('category', 'Faculty')}>Faculty</p></li>
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('category', 'College')}>College</p></li>
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('category', 'Senior High')}>Senior High</p></li>
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('category', 'Junior High')}>Junior High</p></li>
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('category', 'Others')}>Others</p></li>
              </ul>
            </div>
            {formData.category === 'College' 
            ? <div className="dropdown statistic w-100">
              <button className="statistic-2 text-light py-2 rounded-3 dropdown-toggle w-100" style={{width: '350px'}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {formData.subCategory ? formData.subCategory : 'Sub-Category'}
              </button>
              <ul className="dropdown-menu">
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('subCategory', 'Information Technology')}>Information Technology</p></li>
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('subCategory', 'Hospitality Management')}>Hospitality Management</p></li>
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('subCategory', 'Tourism Management')}>Tourism Management</p></li>
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('subCategory', 'Business Management')}>Business Management</p></li>
              </ul>
            </div>
            : '' 
            }

            <div className="dropdown statistic w-100">
              <button className="statistic-2 text-light py-2 rounded-3 dropdown-toggle w-100" style={{width: '350px'}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {formData.apparel ? formData.apparel : 'Apparel'}
              </button>
              <ul className="dropdown-menu">
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('apparel', 'For Men')}>For Men</p></li>
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('apparel', 'For Women')}>For Women</p></li>
                <li><p className="dropdown-item" onClick={() => handleDropdownChange('apparel', 'Others')}>Others</p></li>
              </ul>
            </div>
          </div>

          <div className='d-flex gap-3 mb-3'>    
            <div className="d-flex w-100 flex-column">
              <label htmlFor="item_code">Item Code</label>
              <input type="text" onChange={handleChange} value={formData.item_code} className="p-2 w-100 rounded-2" id="item_code" placeholder="Item Code" name="item_code" required />
            </div>

            <div className="d-flex w-100 flex-column">
              <label htmlFor="item_name">Item Description</label>
              <input type="text" onChange={handleChange} value={formData.item_name} className="p-2 w-100 rounded-2" id="item_name" placeholder="Item Description" name="item_name" required />
            </div>

            <div className="d-flex w-100 flex-column">
              <label htmlFor="unti_price">Selling Price</label>
              <input type="number" min={0} onChange={(e) => handleNumberInputChange('unit_price', e.target.value)} value={formData.unit_price} className="p-2 w-100 rounded-2" id="unti_price" placeholder="Selling Price" name="unti_price" required />
            </div>

            <div className="d-flex w-100 flex-column">
              <label htmlFor="qty">Quantity</label>
              <input type="number" min={0} onChange={(e) => handleNumberInputChange('qty', e.target.value)} value={formData.qty} className="p-2 w-100 rounded-2" id="qty" placeholder="Quantity" name="qty" required />
            </div>
          </div>

          <div className='d-flex gap-3 mb-3'>
            <div className='p-3 statistic-2 rounded-3 '>
              <p className='header'>Size</p>
              {sizes.map((size, index) => (
                <div key={index} className='form-check'>
                  <input type='checkbox' className='form-check-input bg-dark ' id={`sizeCheckbox-${size}`} checked={selectedSizes.includes(size)} onChange={() => handleSizeChange(size)} />
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
                type='file' lable='Image' className='p-2 rounded-3' id='product_img' name='product_img' accept='.jpeg, .png, .jpg' />
                <p className='text-light text-center p-0 m-0'>Click to Upload an image</p>
                <p style={{fontSize: '10px'}} className='text-light text-center p-0 fst-italic '>(Only .jpeg, .png, and .jpg images are accepted)</p>
              </div>
            </div>
          </div>
          
          <div className='d-flex gap-3 justify-content-end align-items-end flex-column'>
            <button type='submit'  className={`rounded-2 w-25 text-light px-3 py-2 ${loading ? 'disabled loading-button' : 'button'}`} >Add Item</button>
            <button onClick={handleCLear} type='button' className='btn w-25 text-light px-3 py-2' style={{backgroundColor: 'var(--gray)'}}>Cancel</button>
          </div>

        </form>
      </section>
    </main>
  )
}

export default NewItemPage