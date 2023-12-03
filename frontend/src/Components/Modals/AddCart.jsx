import React, {useState, useEffect} from 'react'
import { useCart } from 'Context/CartContext'
import { FaTimes, FaMinus, FaPlus } from 'react-icons/fa'

const AddCart = () => {
    const { itemData } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [isActive, setActive] = useState(null)
    const handleDecrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    }

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    }

    if (!itemData) {
        return null; // or handle the case when itemData is null
    }

    return (
        <div className="modal fade" id="addItem" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content" style={{background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.175)'}}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Item</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='d-flex p-5 gap-3'>
                            <img src={itemData.product_img} height={'20%'} alt={itemData.item_name} />
                            <div className='d-flex flex-column justify-content-start gap-0 align-items-start'>
                                <p className='text-uppercase fw-bold fs-4 m-0'>{itemData.item}</p>
                                <p className='fw-bold fs-5 m-0'>P {itemData.unit_price}.00</p>
                                <button className='btn btn-outline-secondary btn-sm px-3 py-1 mt-5' data-bs-toggle="modal" data-bs-target="#exampleModal">Size Guide</button>
                                <div>
                                    <p className='text-uppercase fw-medium fs-6 p-0 m-0 mt-5'>size</p>
                                    <ul className='list-group list-group-horizontal'>
                                        <li style={{backgroundColor: `${isActive === 's' ? 'var(--dark-blue)' : ''}`}} 
                                            className={`${isActive === 's' ? 'text-light' : ''} list-group-item list-group-item-action text-decoration-none`} 
                                            onClick={() => (setActive('s'))}>
                                            S
                                        </li>
                                        <li style={{backgroundColor: `${isActive === 'm' ? 'var(--dark-blue)' : ''}`}} 
                                            className={`${isActive === 'm' ? 'text-light' : ''} list-group-item list-group-item-action text-decoration-none`} 
                                            onClick={() => (setActive('m'))}>
                                            M
                                        </li>
                                        <li style={{backgroundColor: `${isActive === 'l' ? 'var(--dark-blue)' : ''}`}} 
                                            className={`${isActive === 'l' ? 'text-light' : ''} list-group-item list-group-item-action text-decoration-none`} 
                                            onClick={() => (setActive('l'))}>
                                            L
                                        </li>
                                        <li style={{backgroundColor: `${isActive === 'xl' ? 'var(--dark-blue)' : ''}`}} 
                                            className={`${isActive === 'xl' ? 'text-light' : ''} list-group-item list-group-item-action text-decoration-none`} 
                                            onClick={() => (setActive('xl'))}>
                                            XL
                                        </li>
                                        <li style={{backgroundColor: `${isActive === '2xl' ? 'var(--dark-blue)' : ''}`}} 
                                            className={`${isActive === '2xl' ? 'text-light' : ''} list-group-item list-group-item-action text-decoration-none`} 
                                            onClick={() => (setActive('2xl'))}>
                                            2XL
                                        </li>
                                        <li style={{backgroundColor: `${isActive === '3xl' ? 'var(--dark-blue)' : ''}`}} 
                                            className={`${isActive === '3xl' ? 'text-light' : ''} list-group-item list-group-item-action text-decoration-none`} 
                                            onClick={() => (setActive('3xl'))}>
                                            3XL
                                        </li>
                                    </ul>
                                </div>
                                <div className='d-flex gap-2 align-items-end mt-5'>
                                    <div className='d-flex flex-column w-50'>
                                        <p className='fw-medium text-uppercase fs-6 p-0 m-0'>Quantity</p>
                                        <div className='d-flex'>
                                            <ul className='list-group list-group-horizontal '>
                                                <li className='list-group-item list-group-item-action ac p-0 py-2 d-flex align-items-center justify-content-center' onClick={handleDecrement}><FaMinus style={{color: 'var(--blue)'}} size={12}/></li>
                                                <li className='list-group-item list-group-item-action p-0 d-flex justify-content-center align-items-center'>
                                                    <input type='number' min='1' value={quantity} className='w-100 inpt text-end'/>
                                                </li>
                                                <li className='list-group-item list-group-item-action ac p-0 py-2 d-flex align-items-center justify-content-center' onClick={handleIncrement}><FaPlus style={{color: 'var(--blue)'}} size={12}/></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <button className='py-2 px-4 cart-btn'> Add to Cart </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCart