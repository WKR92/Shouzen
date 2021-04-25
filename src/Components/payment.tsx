import { connect } from 'react-redux';
import {RootState} from '../store/store';

interface PaymentProps {
    showModal: Boolean,
    setShowModal: Function
}

const Payment = (props: PaymentProps) => {

    // const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    //     event.preventDefault();
    //     props.setShowModal(true);
    // }

    return (
        <div className="paymentOuterContainer">
            <div className="paymentInnerContainer">
                <h2>Please choose the form of payment you prefer:</h2>
                <form>
                    <input defaultChecked type="radio" id="cash" />
                    <label htmlFor="cash">Cash to courier - this is the only available option for now.</label>
                    <button 
                        onClick={() => props.setShowModal(true)}
                        type="submit" 
                        className="finalizeOrderBtn">
                        Finalize order
                    </button>
                </form>
            </div>
        </div>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        listOfProductsInCart: state.cartReducer
    }
};

// const mapDispatchToProps = (dispatch: Function) => {
//     return {
//         removeProduct: (product: Products) => dispatch(productAction.removeProductFormCart(product)),
//         changeAmountToOrder: (productUnits: ChangeUnitsInStoreInterface) => dispatch(productAction.updateCartUnits(productUnits))
//     }
// };

export default connect(mapStateToProps, null)(Payment);