import React, {useState, useEffect} from 'react'
import { iconPath, handleStatus } from 'Utils/handlingFunction'
import { IconPark } from 'assets/SvgIcons'
import { format } from 'date-fns';

const Table = ({data, headers, subHeader, height="300px"}) => {
    
    return (
        <div role="table" className='accordion' id='tableAccordion'>
            <TableHeader headers={headers} />
            <TableBody dataContents={data} subHeader={subHeader} height={height} />
        </div>
    )
}

const TableBody = ({ dataContents, height, subHeader }) => {
    const [orders, setOrders] = useState(null)
    
    useEffect(() => {
        // Update the local state when dataContents prop changes
        setOrders(dataContents);
    }, [dataContents]);
    
    const setStatus = async (orderId, newStatus) => {
        try {
          // Send a PATCH request to update the order status
        const response = await fetch(`https://modiform-api.vercel.app/api/orders/${orderId}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });
    
        if (!response.ok) {
            throw new Error('Failed to update order status');
        }
    
        
        // If the request is successful, you can update the local state to reflect the changes immediately
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );
            console.log('Order status updated successfully');
        } catch (error) {
            console.error('Error updating order status:', error.message);
        }
    }
    
    return (
        <div className='d-flex flex-column gap-2 table-container' role='rowgroup' style={{ height: height }}>
            {orders && orders.map((data, indx) => (
            <div role='row' key={indx} className='rounded-3 accordion-item text-light' style={{color: 'var(--white)', border: '1px solid var(--dark-blue)',backgroundColor: 'var(--light-black)'}}>
                <h4 className={`accordion-header rounded-3 d-flex gap-2 align-items-center`}>
                    <button className='btn w-100 d-flex gap-2 align-items-center text-light py-2 pe-0 collapsed' type='button' data-bs-toggle='collapse' data-bs-target={`#collapse${data._id}`} aria-expanded='false' aria-controls={`collapse${data._id}`}>
                        <span className='w-100 text-truncate' style={{ fontSize: '12px' }} role='cell' >{data._id}</span>
                        <span className='w-100 text-truncate' style={{ fontSize: '12px' }} role='cell' >{data.createdAt && format(new Date(data.createdAt), 'MMM dd, yyyy')}</span>
                        <span className='w-100 text-truncate' style={{ fontSize: '12px' }} role='cell' >{data.user_id}</span>
                        <span className='w-100 text-truncate' style={{ fontSize: '12px' }} role='cell' >{data.user_name}</span>
                        <span className='w-100 text-truncate' style={{ fontSize: '12px' }} role='cell' >{data.total_qty}</span>
                        <span className='w-100 text-truncate' style={{ fontSize: '12px' }} role='cell' >{data.total_amount}</span>
                        <span className='w-100 text-truncate rounded-4 py-1' style={{ fontSize: '12px', backgroundColor: handleStatus(data.status) }} role='cell' >{data.status}</span>
                    </button>
                    <div className="dropdown d-flex justify-content-center align-items-center " style={{width: '180px'}}>
                        <button className="btn w-100 btn-sm dropdown-toggle text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: '12px', backgroundColor: '#2E3039'}}>
                            {data.status} 
                        </button>
                        <ul className="dropdown-menu" >
                            {['Processing', 'Canceled', 'Pending', 'Received'].map((status, index) => (
                                <li key={index}>
                                    <p className='dropdown-item' onClick={() => setStatus(data._id, status)} style={{ cursor: 'pointer' }} >
                                        {status}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='d-flex gap-2 px-3 p-0'>
                        <button className='btn btn-sm text-light'>  
                            <IconPark path={iconPath('', 'messages', 'ph:printer-bold', 'ph:printer-bold')} size={20} />
                        </button>
                        <button className='btn btn-sm text-light'>
                            <IconPark path={iconPath('', 'messages', 'heroicons:magnifying-glass-plus-20-solid', 'heroicons:magnifying-glass-plus-20-solid')} size={20} />
                        </button>
                    </div>
                </h4>
                <div id={`collapse${data._id}`} className='accordion-collapse collapse' data-bs-parent='#tableAccordion'>
                <div className='accordion-body d-flex gap-3 py-2' style={{ fontSize: '10px', backgroundColor: '#142D3F' }}>
                    <div className='w-100'>
                        <div className='d-flex gap-2 align-items-center'>
                            <p className='fw-bolder m-0 header-txt'>Items</p>
                            <hr className='w-100 my-2' />
                        </div>
                        <div className='d-flex align-items-center gap-2 text-center' style={{color: '#ffffff60'}}>
                            {subHeader.map((header, indx) => (
                                <span className='w-100' key={indx}>{header}</span>
                            ))}
                        </div>
                        {Array.isArray(data.item_list) &&
                        data.item_list.map((item, i) => (
                            <div className='d-flex align-items-center gap-2 text-center py-1' key={i}>
                                <span className='w-100'>{item.item_code}</span>
                                <span className='w-100'>{item.item_name}</span>
                                <span className='w-100'>{item.invClass}</span>
                                <span className='w-100'>{item.qty}</span>
                                <span className='w-100'>{item.unit_price}</span>
                                <span className='w-100'>{item.subTotal}</span>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
        );
}

const TableHeader = ({headers}) => {
    return (
        <div role='rowgroup'>
            <div role='row' className='d-flex gap-2 px-2 header-txt mb-3'>
            {headers.map((header, indx) => (
                <span key={indx} role='cell' className='w-100 text-light text-center'>{header}</span>
            ))}
            </div>
        </div>
    )
}
export default Table