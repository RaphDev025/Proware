import React from 'react';
import { useItemContext } from 'Context/ItemContext';

const ViewItem = () => {
    const { selectedItem, clearSelectedItem } = useItemContext();

    // Check if selectedItem exists before accessing its properties
    const {
        user_name,
        user_id,
        total_qty,
        total_amount,
        status,
        item_list,
    } = selectedItem || {};

    return (
        <div className="modal fade" id="viewItem" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">View Order</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p><strong>User Name:</strong> {user_name}</p>
                        <p><strong>User ID:</strong> {user_id}</p>
                        <p><strong>Total Quantity:</strong> {total_qty}</p>
                        <p><strong>Total Amount:</strong> {total_amount}</p>
                        <p><strong>Status:</strong> {status}</p>

                        <div className="mt-3 overflow-y-auto" style={{height: '300px'}}>
                            <h5>Item List:</h5>
                            {Array.isArray(item_list) && item_list.length > 0 ? (
                                <ul className="list-group">
                                    {item_list.map((item, index) => (
                                        <li key={index} className="list-group-item">
                                            <p><strong>Item Code:</strong> {item.item_code}</p>
                                            <p><strong>Item Name:</strong> {item.item_name}</p>
                                            <p><strong>Quantity:</strong> {item.qty}</p>
                                            <p><strong>Unit Price:</strong> {item.unit_price}</p>
                                            <p><strong>Inventory Class:</strong> {item.invClass}</p>
                                            <p><strong>Subtotal:</strong> {item.subTotal}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No items in the order.</p>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewItem;
