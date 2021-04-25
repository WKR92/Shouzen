import React from 'react';

interface PaymentProps {
    showModal: Boolean,
    setShowModal: Function
}
const Modal = (props: PaymentProps) => {

    return (
        <div className="modal">
            <div className="innerModalContainer">
                <button 
                    onClick={() => props.setShowModal(false)} 
                    type="submit" 
                    className="finalizeOrderBtn">
                    Close
                </button>
            </div>
        </div>
    )
}
export default Modal