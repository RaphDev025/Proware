import React from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const ConfirmationModal = () => {
    const content = 'The student who orders using the Modiform app is required to show the invoice receipt after pressing the check out button. The invoice receipt should be downloaded or screenshot and it must be presented to the cashier. The official receipt from the cashier serves as proof of payment for the ordered uniform, which will be shown to Proware to receive the purchased item(s).'

    return (
        <div className="modal fade" id="confirmation" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5 text-uppercase" id="staticBackdropLabel">Confirmation</h1>
                    <button type="button" data-tooltip-id='tip0' ></button>
                    <ReactTooltip style={{width: '300px', backgroundColor: 'white', color: 'black'}} id={'tip0'} place={'right'} content={content} />
                </div>
                <div className="modal-body">
                    <div className='d-flex flex-column w-100'>
                        <label htmlFor='user_name' >Full Name</label>
                        <input type='text' className='p-2 rounded-3' id='user_name' placeholder='Full Name' required />                        
                    </div>
                    <div className='d-flex flex-column w-100'>
                        <label htmlFor='user_id' >Student Number</label>
                        <input type='text' className='p-2 rounded-3' id='user_id' placeholder='Student Number' required />                        
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="btn btn-def btn-primary w-100">Confirm</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
