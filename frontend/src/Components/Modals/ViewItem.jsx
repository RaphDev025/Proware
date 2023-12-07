import React from 'react';
import { useItemContext } from 'Context/ItemContext';

const ViewItem = () => {
    const { selectedItem, clearSelectedItem } = useItemContext();

    // Check if selectedItem exists before accessing its properties
    const {
        item_code,
        item_name,
        unit_price,
        qty,
        invClass,
        category,
        subCategory,
        apparel,
        status,
        product_img,
        size,
    } = selectedItem || {};

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">View Item</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src={product_img} alt={product_img} className='d-flex text-center' style={{width: '200px', height: '200px'}} />
                        <p><strong>Item Code:</strong> {item_code}</p>
                        <p><strong>Item Name:</strong> {item_name}</p>
                        <p><strong>Unit Price:</strong> {unit_price}</p>
                        <p><strong>Quantity:</strong> {qty}</p>
                        <p><strong>Inventory Class:</strong> {invClass}</p>
                        <p><strong>Category:</strong> {category}</p>
                        <p><strong>Subcategory:</strong> {subCategory}</p>
                        <p><strong>Apparel:</strong> {apparel}</p>
                        <p><strong>Status:</strong> {status}</p>
                        <p><strong>Size:</strong> {size && size.join(', ')}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Understood</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewItem;
