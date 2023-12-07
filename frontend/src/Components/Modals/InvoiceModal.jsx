import React from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const InvoiceModal = () => {
    return (
        <div className="modal fade" id="invoice" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5 text-uppercase" id="staticBackdropLabel">Confirmation</h1>
                </div>
                <div className="modal-body d-flex flex-column gap-3">
                    <div className='rounded-2 bg-primary-subtle'>
                        Thank you name here, Your reservation has been received!
                    </div>
                    <div>
                        <div className='d-flex flex-column rounded-2 bg-info'>
                            <div>
                                <h3 className='text-uppercase'>Invoice</h3>
                                <pre>Status: Processing</pre>
                            </div>
                            <div>
                                <img />
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>DATE</p>
                                <p>Date</p>
                            </div>
                            <div>
                                <p className='text-uppercase'>Invoice No.</p>
                                <p>#Date</p>
                            </div>
                            <div>
                                <p className=';text-uppercase'>Invoice To</p>
                                <p>Date</p>
                                <p>stud number</p>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-3'>
                        <div>headers</div>
                        <div>val</div>

                        <div>table</div>
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="btn btn-def btn-primary w-100 text-uppercase">Download Invoice</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceModal
