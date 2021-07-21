import {useEffect} from 'react';
import { connect } from 'react-redux';
import {RootState} from '../store/store';
import {Order, Products} from '../store/interfaces';
import * as productAction from '../store/productsActions';
import { useHistory } from "react-router-dom";

interface PaymentProps {
    setShowModal: Function,
    order?: Order[],
    removeProduct: Function,
    listOfProductsInCart?: Products[]
}
const ThankYouModal = (props: PaymentProps) => {

    const history = useHistory();

    useEffect(() => {
        console.log(props.order)
    }, [props])

    const handleEndOfOrder = () => {
        props.listOfProductsInCart!.forEach(e => props.removeProduct(e));
        history.push("/");
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'auto'
          });
        props.setShowModal(false);
    }

    return (
        <div className="modal">
            <div className="innerModalContainer" transition-style="in:circle:hesitate">
                <h2>Thank You, your order has been made and now will be realized.</h2>
                <h3>Expect your shoes from Shouzen in few days.</h3>
                <p>You can check your order at your profile page.</p>
                <p>Don't hesitate to contact us with any questions or problems</p>
                <button 
                    onClick={handleEndOfOrder} 
                    type="submit"
                    className="endBtn">
                    Close
                </button>
            </div>
        </div>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        listOfProductsInCart: state.cartReducer,
        order: state.orderReducer
    }
};
const mapDispatchToProps = (dispatch: Function) => {
    return {
        removeProduct: (product: Products) => dispatch(productAction.removeProductFromCart(product)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ThankYouModal);
