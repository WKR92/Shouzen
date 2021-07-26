import {RootState} from '../store/store';
import { removeProductFromCart } from '../store/productsActions';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { TYModalProps } from '../store/interfaces';


const ThankYouModal = (props: TYModalProps) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const listOfProductsInCart = useSelector((state: RootState) => state.cartReducer);

    const handleEndOfOrder = () => {
        listOfProductsInCart!.forEach(e => dispatch(removeProductFromCart(e)));
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
export default ThankYouModal;
