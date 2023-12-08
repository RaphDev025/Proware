import React, { useState, useEffect } from 'react'
import blackLogo from 'assets/icons/black.png'
import { useCheckoutContext } from 'Context/CheckoutContext';

const InvoiceModal = () => {
    const { cart2, updateCart } = useCheckoutContext();

    const [invoiceData, setInvoiceData] = useState(cart2);

    // Update local state when cart2 changes
    useEffect(() => {
        setInvoiceData(cart2);
    }, [cart2]);

    return (
        <main className="mt-5 d-flex flex-column gap-2 px-5 py-3 h-100" >
            <section className="modal-body d-flex flex-column gap-3">
                <div className='rounded-2 p-3 bg-primary-subtle' style={{fontSize: '12px'}}>
                    Thank you {invoiceData.user_name}, Your reservation has been received!
                </div>
                <div className='rounded-2 bg-info'>
                    <div className='d-flex justify-content-between p-2 px-3'>
                        <div>
                            <h3 className='text-uppercase'>Invoice</h3>
                            <pre style={{fontWeight: 'bold'}}>Status:<span style={{fontWeight: 'bold', color: '#FF8500'}}>Processing</span></pre>
                        </div>
                        <div>
                            <img src={blackLogo} alt={blackLogo} height={'80%'}/>
                        </div>
                    </div>
                    <div style={{fontSize: '12px', fontWeight: 'bold', color: '#57575797'}} className='d-flex justify-content-between p-2 px-3'>
                        <div>
                            <p className='m-0'>DATE</p>
                            <p className='m-0'>{invoiceData.createdAt}</p>
                        </div>
                        <div>
                            <p className='m-0 text-uppercase'>Invoice No.</p>
                            <p className='m-0'>{invoiceData.item_id}</p>
                        </div>
                        <div className='d-flex flex-column justify-content-end align-items-end' >
                            <p className='text-uppercase m-0'>Invoice To</p>
                            <p className='text-uppercase m-0'>{invoiceData.user_name}</p>
                            <p className='text-uppercase m-0'>{invoiceData.user_id}</p>
                        </div>
                    </div>
                </div>
                <div className='rounded-3'>
                    <div role='rowgroup'>
                        <div role='row' className='d-flex gap-2 header-txt text-uppercase mb-3 p-2 rounded-3' style={{fontSize: '12px', backgroundColor: '#2E3039'}}>
                            <span role='cell' className='w-100 text-light text-center'>Invoice No.</span>
                            <span role='cell' className='w-100 text-light text-center'>Date</span>
                            <span role='cell' className='w-100 text-light text-center'>User ID</span>
                            <span role='cell' className='w-100 text-light text-center'>Name</span>
                            <span role='cell' className='w-100 text-light text-center'>Total Items</span>
                            <span role='cell' className='w-100 text-light text-center'>Total Amount</span>
                        </div>
                    </div>
                    <div role='row' className='d-flex gap-2 text-uppercase mb-3 p-2 rounded-3' style={{fontSize: '12px',}}>
                        <span role='cell' className='w-100 text-dark text-center'>{invoiceData.item_id}</span>
                        <span role='cell' className='w-100 text-dark text-center'>{invoiceData.createdAt}</span>
                        <span role='cell' className='w-100 text-dark text-center'>{invoiceData.user_id}</span>
                        <span role='cell' className='w-100 text-dark text-center'>{invoiceData.user_name}</span>
                        <span role='cell' className='w-100 text-dark text-center'>{invoiceData.total_qty}</span>
                        <span role='cell' className='w-100 text-danger text-center fw-bold'>Php {invoiceData.total_amount}.00</span>
                    </div>

                    <div className='w-100'>
                        <div className='d-flex gap-2 align-items-center'>
                            <p className='fw-bolder m-0 header-txt'>Items</p>
                            <hr className='w-100 my-2' />
                        </div>
                        <div className='d-flex align-items-center gap-2 text-center' style={{color: 'black'}}>
                            <span className='w-100'>Item Code</span>
                            <span className='w-100'>Item Description</span>
                            <span className='w-100'>Inventory Class</span>
                            <span className='w-100'>Quantity</span>
                            <span className='w-100'>Selling Price</span>
                            <span className='w-100'>Sub Total</span>
                        </div>
                        {Array.isArray(invoiceData?.item_list) &&
                        invoiceData.item_list.map((item, i) => (
                            <div className="d-flex align-items-center gap-2 text-center py-1" key={i}>
                                <span className="w-100" style={{fontSize: '12px'}}>{item.item_code}</span>
                                <span className="w-100" style={{fontSize: '12px'}}>{item.item_name}</span>
                                <span className="w-100" style={{fontSize: '12px'}}>{item.invClass}</span>
                                <span className="w-100" style={{fontSize: '12px'}}>{item.qty}</span>
                                <span className="w-100" style={{fontSize: '12px'}}>{item.unit_price}</span>
                                <span className="w-100" style={{fontSize: '12px'}}>{item.subtotal}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <div className="modal-footer d-flex justify-content-end">
                <button type="button" className="btn btn-def btn-primary w-25 text-uppercase">Download Invoice</button>
            </div>
        </main>
    )
}

export default InvoiceModal
