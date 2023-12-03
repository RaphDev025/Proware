import React, {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import yellowLogo from 'assets/images/yellowed.png'
const MyCart = () => {
    const [cart, setCart] = useState(null)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://proware-api.vercel.app/api/cart');
                const json = await response.json();
                console.log(json);
                if (response.ok) {
                    // Assuming 'apparel' is the field indicating whether it's for men or women
                    
                    setCart(json);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchProducts();
    }, []);

    // Function to handle decrease button
    const handleDecrease = (itemId) => {
        const selectedItem = cart.find((item) => item._id === itemId);
        if (selectedItem.qty > 1) {
            handleQuantityChange(itemId, selectedItem.qty - 1);
        }
    };

    // Function to handle increase button
    const handleIncrease = (itemId) => {
        const selectedItem = cart.find((item) => item._id === itemId);
        handleQuantityChange(itemId, selectedItem.qty + 1);
    };

    // Function to handle quantity change
    const handleQuantityChange = (itemId, newQuantity) => {
        setCart((prevCart) =>
        prevCart.map((item) =>
            item._id === itemId ? { ...item, qty: newQuantity } : item
        )
        );
    };
        
    return (
        <>
            <main className='mt-5 d-flex gap-2 px-5 py-3 h-100'>
                <section className='item-section h-100'>  
                    <h3>Student's Cart</h3>
                    <div className='d-flex flex-column gap-3 pb-4 overflow-y-auto h-100'>
                    {cart && cart.map((item) => (
                        <div key={item._id} className='border d-flex border-2 p-3'>
                            <img alt={''} height={'300px'} src={''} />
                            <div className='d-flex gap-3 w-100'>
                                <div className='w-25 d-flex bg-dark-subtle opacity-50'>
                                    <img src={item.product_img || yellowLogo} alt={item.item_name} />
                                </div>
                                <div className='d-flex flex-column w-75 justify-content-around'>
                                    <div>
                                        <h4>{item.item_name}</h4>
                                        <p className='m-0'>Product ID: {item._item_code}</p>
                                    </div>
                                    <div className='d-flex gap-3'>
                                        <div className='d-flex align-items-center'>
                                            QTY:
                                            <button onClick={() => handleDecrease(item._id)} className='ms-2 m-0 px-1 rounded-2 button-qty'>-</button>
                                            <p className='qty-indicator m-0 px-3 border-top border-1 border-black border-bottom'>{item.qty}</p>
                                            <button onClick={() => handleIncrease(item._id)} className='m-0 px-1 rounded-2 button-qty'>+</button>
                                        </div>
                                        <div>
                                            
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className='fw-bold'>Unit Price: {item.unit_price}</h6>
                                        <h5 className='text-end'>Sub Total: <strong>{item.unit_price * item.qty}</strong></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </section>
                <section className='summary'>
                    <div>
                        <h5>Order Summary | </h5>
                    </div>
                    <div>

                    </div>
                    <div className='d-flex flex-column gap-2'>
                        <p className='text-secondary m-0' style={{fontSize: '12px'}}>Confirmed orders CANNOT BE MODIFIED</p>
                        <button className='text-uppercase w-100'>Checkout</button>
                        <button className='text-uppercase w-100'>Continue Browsing</button>
                    </div>
                </section>
            </main>
            
        </>
    )
}

export default MyCart