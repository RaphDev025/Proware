import React from 'react'
import { useItemContext } from 'Context/ItemContext';

const ViewItem = () => {
    const { selectedItem, clearSelectedItem } = useItemContext();

    // Check if selectedItem exists before accessing its properties
    const itemName = selectedItem ? selectedItem.item_name : '';

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">View Item</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {itemName}
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

export default ViewItem