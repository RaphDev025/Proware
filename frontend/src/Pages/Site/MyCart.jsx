import React, {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import yellowLogo from 'assets/images/yellowed.png'
import { IconPark } from 'assets/SvgIcons'

const MyCart = () => {
    const [cart, setCart] = useState(null)
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://proware-api.vercel.app/api/cart');
                const json = await response.json();
                console.log(json);
                if (response.ok) {
                    // Assuming 'apparel' is the field indicating whether it's for men or women
                    setCart(json);
                    console.log(json)
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

    // const handleItemClick = (itemId) => {
    //     // Toggle selection
    //     setSelectedItemId((prevSelectedItemId) =>
    //         prevSelectedItemId === itemId ? null : itemId
    //     );
    
    //     // Check if the item is already selected
    //     const isSelected = selectedItems.some((item) => item._id === itemId);
    
    //     if (!isSelected) {
    //       // Find the selected item from the cart
    //         const selectedItem = cart.find((item) => item._id === itemId);
        
    //         // Add the selected item to the list
    //         setSelectedItems((prevSelectedItems) => [
    //             ...prevSelectedItems,
    //             selectedItem,
    //         ]);
        
    //         // Recalculate total quantity and total amount
    //         computeTotals();
    //     }
    // };
    useEffect(() => {
        // Function to compute totals
        const computeTotals = () => {
          // Set the state for total quantity and total amount
          // This will trigger a re-render and update the displayed values
            setSelectedItems(selectedItems);
        };
    
        // Invoke computeTotals when selectedItems changes
        computeTotals();
    }, [selectedItems]);
    // Function to handle delete button
    const handleDeleteItem = async (itemId) => {
        try {
        // Make an API call to delete the item from the cart in the database
        await fetch(`https://proware-api.vercel.app/api/cart/${itemId}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        // If the API call is successful, update the state
        setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
        // Update selectedItems by removing the deleted item
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((item) => item._id !== itemId)
        );

        } catch (error) {
            console.error('Error deleting item from the cart:', error);
        }
    };

    const handleItemClick = (itemId) => {
        // Toggle selection
        setSelectedItemId((prevSelectedItemId) =>
            prevSelectedItemId === itemId ? null : itemId
        );
    
        // Check if the item is already selected
        const isSelected = selectedItems.some((item) => item._id === itemId);
    
        if (!isSelected) {
          // Find the selected item from the cart
            const selectedItem = cart.find((item) => item._id === itemId);
        
            // Add the selected item to the list
            setSelectedItems((prevSelectedItems) => [
                ...prevSelectedItems,
                selectedItem,
            ]);
        }
    };
    
    // Function to compute total quantity of items in the cart
    const computeTotalQuantity = () => {
        return selectedItems?.reduce((total, item) => total + item.qty, 0);
    };

    // Function to compute total amount of items in the cart
    const computeTotalAmount = () => {
        return selectedItems?.reduce(
        (total, item) => total + item.unit_price * item.qty,
        0
        );
    };

    return (
        <>
            <main className='mt-5 d-flex gap-2 px-5 py-3 h-100'>
                <section className='item-section h-100'>  
                    <h3>Student's Cart</h3>
                    {cart && cart.length > 0 ? (
                        <div className='d-flex flex-column gap-3 pb-4 overflow-y-auto h-100'>
                        {cart.map((item) => (
                            <div onClick={() => handleItemClick(item._id)} key={item._id} className={`border d-flex border-2 p-3 cursor-pointer ${selectedItemId === item._id ? 'border-info' : ''}`} >
                                <div className={`d-flex gap-3 w-100 `}>
                                    <div className='w-25 d-flex bg-dark-subtle'>
                                        <img src={item.product_img || yellowLogo} width={'100%'} height={'250px'} alt={item.item_name} />
                                    </div>
                                    <div className='d-flex flex-column w-75 justify-content-around'>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <h4>{item.item_name}</h4>
                                                <p className='m-0' style={{ fontSize: '12px' }}>
                                                    Product ID: {item.item_code}
                                                </p>
                                            </div>
                                            <div>
                                                <button type='button' className='btn btn-sm btn-outline-danger' onClick={() => handleDeleteItem(item._id)} >
                                                    <IconPark path={'healthicons:x-outline'} size={23} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-3'>
                                            <div className='d-flex align-items-center'>
                                                QTY:
                                                <button onClick={() => handleDecrease(item._id)} className='ms-2 m-0 px-1 rounded-2 button-qty' > - </button>
                                                <p className='qty-indicator m-0 px-3 border-top border-1 border-black border-bottom'>
                                                    {item.qty}
                                                </p>
                                                <button onClick={() => handleIncrease(item._id)} className='m-0 px-1 rounded-2 button-qty' > + </button>
                                            </div>
                                            <div>

                                            </div>
                                        </div>
                                        <div>
                                            <h6 className='fw-bold'>Unit Price: {item.unit_price}</h6>
                                            <h5 className='text-end'> Sub Total: <strong>{item.unit_price * item.qty}</strong></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <div className='d-flex align-items-center justify-content-center h-100'>
                            <p className='text-muted'>Your cart is empty. Add items to your cart!</p>
                        </div>
                    )}
                </section>
                <section className='summary'>
                    <div className='border border-1 d-flex flex-column gap-2 justify-content-between h-100 p-3'>
                        <h6 className='text-uppercase'>Order Summary | {computeTotalQuantity()} Items(s)</h6>
                        <div className='h-100 overflow-y-auto py-3 border-1 border-top border-bottom '>
                        {selectedItems && selectedItems.map((items) => (
                            <div key={items._id} className='d-flex gap-1 border-bottom flex-column py-2'>
                                <h6>{items.item_name}</h6>
                                <span className='text-uppercase'>QTY: {items.qty}</span>
                                <span className='text-uppercase'>Size: {items.size}</span>
                            </div>
                        ))}
                        </div>
                        <div className='d-flex align-items-center justify-content-between gap-3'>
                            <h6 className='fw-bold m-0'>Order Total:</h6>
                            <h5 className='fw-bold m-0'>Php {computeTotalAmount()}</h5>
                        </div>     
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