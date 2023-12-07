import React, { useState, useEffect } from 'react';
import { useCart } from 'Context/CartContext'
import chart from 'assets/imges/sizeChart.png'
import { FaTimes, FaMinus, FaPlus } from 'react-icons/fa'
import { useUserContext  } from 'Context/UserContext'

const AddToCartModal = () => {
    const { itemData, isModalOpen, closeModal } = useCart()
    const [isActive, setActive] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const { userData } = useUserContext()
    const [availableSizes, setAvailableSizes] = useState([])

    // New state for form data
    const [formData, setFormData] = useState({
        item_id: '',
        item_name: '',
        size: '',
        qty: 1,
        unit_price: 0, // Add the actual unit price
        total_amount: 0, // Add the logic for calculating the total amount
        user_id: '',
        user_name: '',
        category: '',
        product_img: ''
    })

    useEffect(() => {
        console.log("userData:", userData);
        console.log("FormData:", itemData);
        if (itemData && userData) {
            setFormData((prevData) => ({
                ...prevData,
                item_id: itemData._id,
                item_name: itemData.item_name,
                unit_price: itemData.unit_price,
                user_id: userData.user_id,
                user_name: userData.user_name,
                category: userData.category,
                product_img: itemData.product_img
            }));
        }
    }, [itemData, userData])

    useEffect(() => {
        // Set available sizes based on the 'size' property of itemData
        if (itemData && itemData.size && Array.isArray(itemData.size)) {
            setAvailableSizes(itemData.size);
        }
    }, [itemData]);

    if (!isModalOpen || !itemData) {
        return null
    }
    
    const handleDecrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    }

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity < 3 ? prevQuantity + 1 : 3);
    }
    const handleSizeClick = (size) => {
        setActive(size);
        // Update the form data with the selected size
        setFormData((prevData) => ({ ...prevData, size }));
    }

    const handleAddToCart = async (e) => {
        e.preventDefault();

        const totalAmount = quantity * itemData.unit_price;

        // Update formData with calculated total_amount
        setFormData((prevData) => ({
            ...prevData,
            qty: quantity,
            total_amount: totalAmount,
        }));

        const response = await fetch('https://proware-api.vercel.app/api/cart', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        console.log('JSON: ',json)
        console.log('Form Data: ', formData)
        if(!response.ok){
            alert('Cart Item Not Uploaded')
            setFormData({
                item_id: '',
                item_name: '',
                size: '',
                qty: 1,
                unit_price: 0, // Add the actual unit price
                total_amount: 0, 
                user_id: '',
                user_name: '',
                category: ''
            })
        }
        if(response.ok){
            alert('Cart Item Uploaded')
            setFormData({
                item_id: '',
                item_name: '',
                size: '',
                qty: 1,
                unit_price: 0, // Add the actual unit price
                total_amount: 0, 
                user_id: '',
                user_name: '',
                category: ''
            })
        }
    }

    return (
        <>
            <div style={{visibility: `${isModalOpen ? 'visible' : 'hidden'}`}} className="modal-overlay d-flex justify-content-center align-items-center  w-100 h-100 position-fixed" >
                <div style={{visibility: `${isModalOpen ? 'visible' : 'hidden'}`}} className="modal-cust d-flex justify-content-center align-items-center flex-column rounded-2 bg-light opacity-100">
                    <div className='position-relative w-100'>
                        <button className='position-absolute top-0 end-0 m-2 btn' style={{color: 'var(--blue)'}} onClick={() => {setActive(null); closeModal();}}><FaTimes size={24}/></button>
                    </div>
                    <form onSubmit={handleAddToCart} className='d-flex p-5 gap-3'>
                        <img src={itemData.product_img} height={'300px'} alt={itemData.item_name} />
                        <div className='d-flex flex-column justify-content-start gap-0 align-items-start'>
                            <p className='text-uppercase fw-bold fs-4 m-0'>{itemData.item_name}</p>
                            <p className='fw-bold fs-5 m-0'>P {itemData.unit_price}.00</p>
                            <button type='button' className='btn btn-outline-secondary btn-sm px-3 py-1 mt-5' data-bs-toggle="modal" data-bs-target="#exampleModal">Size Guide</button>
                            <div>
                                <p className='text-uppercase fw-medium fs-6 p-0 m-0 mt-5'>available sizes</p>
                                <ul className='list-group list-group-horizontal'>
                                {availableSizes.map((size) => (
                                    <li key={size} style={{ backgroundColor: `${isActive === size ? 'var(--dark-blue)' : ''}`, }} className={`${isActive === size ? 'text-light' : ''} list-group-item text-uppercase text-center list-group-item-action text-decoration-none`} onClick={() => handleSizeClick(size)}  >
                                    {size}
                                    </li>
                                ))}
                                </ul>
                            </div>
                            <div className='d-flex gap-2 align-items-end justify-content-between w-100 mt-5'>
                                <div className='d-flex flex-column w-50'>
                                    <p className='fw-medium text-uppercase fs-6 p-0 m-0'>Quantity</p>
                                    <div className='d-flex'>
                                        <ul className='list-group list-group-horizontal '>
                                            <li className='list-group-item list-group-item-action ac p-0 py-2 d-flex align-items-center justify-content-center' onClick={handleDecrement}><FaMinus style={{color: 'var(--blue)'}} size={12}/></li>
                                            <li className='list-group-item list-group-item-action p-0 d-flex justify-content-center align-items-center'>
                                                <input type='number' onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)} min={1} max={3}  value={quantity} className='w-100 inpt text-end'/>
                                            </li>
                                            <li className='list-group-item list-group-item-action ac p-0 py-2 d-flex align-items-center justify-content-center' onClick={handleIncrement}><FaPlus style={{color: 'var(--blue)'}} size={12}/></li>
                                        </ul>
                                    </div>
                                </div>
                                <button type='submit' className='py-2 px-4 cart-btn'> Add to Cart </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div id='exampleModal' className='modal fade' aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered z-3 position-absolute top-50 start-50 translate-middle">
                    <div className="modal-content" style={{width: '2500px'}}>
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center" >
                            <img src={chart}width={'700px'} alt={chart} />
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
};

export default AddToCartModal;
