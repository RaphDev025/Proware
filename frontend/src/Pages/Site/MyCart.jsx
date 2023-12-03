import React, {useState, useEffect} from 'react'

const MyCart = () => {
    const [cart, setCart] = useState(null)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://modiform-api.vercel.app/api/cart');
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

    return (
        <>
            <main className='mt-5 d-flex gap-2 px-5 py-3 h-100'>
                <section className='px-3 h-100 w-75'>  
                    <h3>Student's Cart</h3>
                    <div className='d-flex flex-column gap-3 py-5'>
                    {cart && cart.map((item) => (
                        <div key={item._id} className='border d-flex border-2 p-3'>
                            <img alt={''} height={'300px'} src={''} />
                            <div>

                            </div>
                        </div>
                    ))}
                    </div>
                </section>
                <section className='d-flex flex-column w-25 px-3 py-5'>
                    <div>
                        <h5>Order Summary | </h5>
                    </div>
                    <p className='text-secondary' style={{fontSize: '12px'}}>Confirmed orders CANNOT BE MODIFIED</p>
                    <div className='d-flex flex-column gap-2'>
                        <button className='text-uppercase w-100'>Checkout</button>
                        <button className='text-uppercase w-100'>Continue Browsing</button>
                    </div>
                </section>
            </main>
            
        </>
    )
}

export default MyCart