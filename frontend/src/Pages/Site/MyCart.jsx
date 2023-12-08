import React, { useState, useEffect } from 'react';
import yellowLogo from 'assets/images/yellowed.png';
import { IconPark } from 'assets/SvgIcons';
import { useUserContext } from 'Context/UserContext';
import { ConfirmationModal } from 'Components'
import { useCheckoutContext } from 'Context/CheckoutContext';

const MyCart = () => {
  const { userData } = useUserContext();
  const [cart, setCart] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const { cart2, updateCart } = useCheckoutContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://proware-api.vercel.app/api/cart');
        const json = await response.json();
        console.log(json);
        if (response.ok) {
          setCart(json);
          console.log(json);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDecrease = (itemId) => {
    const selectedItem = cart.find((item) => item._id === itemId);
    if (selectedItem.qty > 1) {
      handleQuantityChange(itemId, selectedItem.qty - 1);
    }
  };

  const handleIncrease = (itemId) => {
    const selectedItem = cart.find((item) => item._id === itemId);
    handleQuantityChange(itemId, selectedItem.qty + 1);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, qty: newQuantity } : item
      )
    );

    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.map((item) =>
        item._id === itemId ? { ...item, qty: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    const computeTotals = () => {
      setSelectedItems(selectedItems);
    };

    computeTotals();
  }, [selectedItems]);

  const handleDeleteItem = async (itemId) => {
    try {
      await fetch(`https://proware-api.vercel.app/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));

      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error('Error deleting item from the cart:', error);
    }
  };

  const handleItemClick = (itemId) => {
    setSelectedItemId((prevSelectedItemId) =>
      prevSelectedItemId === itemId ? null : itemId
    );

    const isSelected = selectedItems.some((item) => item._id === itemId);

    if (!isSelected) {
      const selectedItem = cart.find((item) => item._id === itemId);

      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        selectedItem,
      ]);
    }
  };

  const computeTotalQuantity = () => {
    return selectedItems?.reduce((total, item) => total + item.qty, 0);
  };

  const computeTotalAmount = () => {
    return selectedItems?.reduce(
      (total, item) => total + item.unit_price * item.qty,
      0
    );
  };

  const computeSubtotal = (item) => {
    return item.unit_price * item.qty;
  };

  const handleSubmit = async () => {
    try {
      if (!selectedItems || selectedItems.length === 0) {
        alert('Cannot checkout, please select items...');
        return;
      }

      const totalAmount = computeTotalAmount();
      const totalQty = computeTotalQuantity();

      const itemList = selectedItems.map((item) => ({
        item_code: item.item_code,
        item_name: item.item_name,
        qty: item.qty,
        invClass: item.invClass,
        size: item.size,
        unit_price: item.unit_price,
        subtotal: computeSubtotal(item),
      }));

      const orderData = {
        user_name: userData.user_name,
        user_id: userData.user_id,
        total_amount: totalAmount,
        total_qty: totalQty,
        item_list: itemList,
        status: 'Pending',
      };
      updateCart(orderData)

      setCart([]);
      setSelectedItems([]);
      
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  return (
    <>
      <main className='mt-5 d-flex gap-2 px-5 py-3 h-100'>
        <section className='item-section h-100'>
          <h3>Student's Cart</h3>
          {cart && cart.length > 0 ? (
            <div className='d-flex flex-column gap-3 pb-4 overflow-y-auto h-100'>
              {cart.map((item) => (
                <div
                  onClick={() => handleItemClick(item._id)}
                  key={item._id}
                  className={`border d-flex border-2 p-3 cursor-pointer ${
                    selectedItemId === item._id ? 'border-info' : ''
                  }`}
                >
                  <div className={`d-flex gap-3 w-100 `}>
                    <div className='w-25 d-flex bg-dark-subtle'>
                      <img
                        src={item.product_img || yellowLogo}
                        width={'100%'}
                        height={'250px'}
                        alt={item.item_name}
                      />
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
                          <button
                            type='button'
                            className='btn btn-sm btn-outline-danger'
                            onClick={() => handleDeleteItem(item._id)}
                          >
                            <IconPark path={'healthicons:x-outline'} size={23} />
                          </button>
                        </div>
                      </div>
                      <div className='d-flex gap-3'>
                        <div className='d-flex align-items-center'>
                          QTY:
                          <button
                            onClick={() => handleDecrease(item._id)}
                            className='ms-2 m-0 px-1 rounded-2 button-qty'
                          >
                            {' '}
                            -{' '}
                          </button>
                          <p className='qty-indicator m-0 px-3 border-top border-1 border-black border-bottom'>
                            {item.qty}
                          </p>
                          <button
                            onClick={() => handleIncrease(item._id)}
                            className='m-0 px-1 rounded-2 button-qty'
                          >
                            {' '}
                            +{' '}
                          </button>
                        </div>
                        <div className='dropdown'>
                          <button
                            className='btn text-uppercase btn-secondary dropdown-toggle'
                            type='button'
                            data-bs-toggle='dropdown'
                            aria-expanded='false'
                          >
                            {item.size}
                          </button>
                          <ul className='dropdown-menu'>
                            <li>
                              <button className='dropdown-item'>xs</button>
                            </li>
                            <li>
                              <button className='dropdown-item'>S</button>
                            </li>
                            <li>
                              <button className='dropdown-item'>M</button>
                            </li>
                            <li>
                              <button className='dropdown-item'>L</button>
                            </li>
                            <li>
                              <button className='dropdown-item'>xl</button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h6 className='fw-bold'>Unit Price: {item.unit_price}</h6>
                        <h5 className='text-end'>
                          {' '}
                          Sub Total: <strong>{computeSubtotal(item)}</strong>
                        </h5>
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
            <h6 className='text-uppercase'>
              Order Summary | {computeTotalQuantity()} Items(s)
            </h6>
            <div
              style={{ height: '350px' }}
              className=' overflow-y-auto py-3 border-1 border-top border-bottom '
            >
              {selectedItems && selectedItems.map((item) => (
                <div key={item._id} className='d-flex gap-1 border-bottom flex-column py-2'>
                  <h6>{item.item_name}</h6>
                  <span className='text-uppercase'>QTY: {item.qty}</span>
                  <span className='text-uppercase'>Size: {item.size}</span>
                  <span className='text-uppercase'>Subtotal: {computeSubtotal(item)}</span>
                </div>
              ))}
            </div>
            <div className='d-flex align-items-center justify-content-between gap-3'>
              <h6 className='fw-bold m-0'>Order Total:</h6>
              <h5 className='fw-bold m-0'>Php {computeTotalAmount()}</h5>
            </div>
          </div>
          <div className='d-flex flex-column gap-2'>
            <p className='text-secondary m-0' style={{ fontSize: '12px' }}>
              Confirmed orders CANNOT BE MODIFIED
            </p>
            <button data-bs-toggle="modal" data-bs-target="#confirmation" type='button' onClick={handleSubmit} className='text-uppercase w-100 p-2 btn-def'>
              Checkout
            </button>
            <button className='text-uppercase w-100 p-2 btn-def-outline'>Continue Browsing</button>
          </div>
        </section>
        <ConfirmationModal />
      </main>
    </>
  );
};

export default MyCart;
