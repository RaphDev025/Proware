import React, { useState, useEffect } from 'react';
import { useItemContext } from 'Context/ItemContext';

const EditItem = () => {
    const { selectedItem, clearSelectedItem } = useItemContext();

    // State to manage input values
    const [editedItem, setEditedItem] = useState({
        item_code: '',
        item_name: '',
        unit_price: 0,
        qty: 0,
        invClass: '',
        category: '',
        subCategory: '',
        apparel: '',
        status: '',
        product_img: '',
        size: '',
    });

    useEffect(() => {
        // Update state when selectedItem changes
        if (selectedItem) {
            setEditedItem({
                item_code: selectedItem.item_code || '',
                item_name: selectedItem.item_name || '',
                unit_price: selectedItem.unit_price || 0,
                qty: selectedItem.qty || 0,
                invClass: selectedItem.invClass || '',
                category: selectedItem.category || '',
                subCategory: selectedItem.subCategory || '',
                apparel: selectedItem.apparel || '',
                status: selectedItem.status || '',
                product_img: selectedItem.product_img || '',
                size: selectedItem.size ? selectedItem.size.join(', ') : '',
            });
        }
        console.log('slectedItem: ', selectedItem)
    }, [selectedItem]);

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            if (!selectedItem || !selectedItem._id) {
                console.error('Cannot save changes. Invalid item data.');
                return;
            }
    
            // Make a PATCH request to update the item
            const response = await fetch(`https://proware-api.vercel.app/api/products/${selectedItem._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedItem),
            });
    
            if (response.ok) {
                // Placeholder logic - replace with your own logic
                console.log('Changes saved successfully:', editedItem)
                alert('Changes saved successfully!')
    
                // Close the modal and clear the selected item
                clearSelectedItem();
            } else {
                console.error('Failed to save changes:', response.statusText)
                alert('Changes Unsuccessfully!')
            }
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };
    
    return (
        <div className="modal fade" id="editItem" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Item</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src={editedItem.product_img} alt={editedItem.product_img} className='d-flex text-center' style={{width: '200px', height: '200px'}} />

                        {/* Input fields for editing */}
                        <div className="mb-3">
                            <label htmlFor="item_name" className="form-label">Item Name</label>
                            <input type="text" className="form-control" id="item_name" name="item_name" value={editedItem.item_name} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="unit_price" className="form-label">Unit Price</label>
                            <input type="number" className="form-control" id="unit_price" name="unit_price" value={editedItem.unit_price} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="qty" className="form-label">Quantity</label>
                            <input type="number" className="form-control" id="qty" name="qty" value={editedItem.qty} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="invClass" className="form-label">Inventory Class</label>
                            <input type="text" className="form-control" id="invClass" name="invClass" value={editedItem.invClass} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <input type="text" className="form-control" id="category" name="category" value={editedItem.category} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subCategory" className="form-label">Subcategory</label>
                            <input type="text" className="form-control" id="subCategory" name="subCategory" value={editedItem.subCategory} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apparel" className="form-label">Apparel</label>
                            <input type="text" className="form-control" id="apparel" name="apparel" value={editedItem.apparel} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <input type="text" className="form-control" id="status" name="status" value={editedItem.status} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="size" className="form-label">Size</label>
                            <input type="text" className="form-control" id="size" name="size" value={editedItem.size} onChange={handleInputChange} />
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"  data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => handleSubmit()}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditItem;
