import { connect } from 'react-redux';
import {RootState} from '../store/store';
import * as orderAction from '../store/orderActions';
import {Products, UserInfo, PaymentProps, Order} from '../store/interfaces'

const Payment = (props: PaymentProps) => {

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        props.setShowModal(true);

        const whatIsOrdered: [string, number][] = [];
        props.listOfProductsInCart.forEach(e => whatIsOrdered.push([e.name, e.amountToOrder]))

        function guidGenerator() {
            var S4 = function() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
          }

        const order = {
            'id'            : guidGenerator(),
            'whatIsOrdered' : whatIsOrdered,
            'whoIsOrdering' : props.userInfo,
            'costOfOrder'   : props.total
        }
        
        props.setOrder(order);
    }

    const goBackToUserTable = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const userInfoTableSubmitBtn = document.querySelector('.userInfoTableSubmitBtn') as HTMLButtonElement;
        const paymentOuterContainer = document.querySelector('.paymentOuterContainer') as HTMLDivElement;
        const goBackToCartBtn = document.querySelector('.goBackToCartBtn') as HTMLButtonElement;
        const inputList = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
        inputList.forEach(e => e.disabled = false)
        goBackToCartBtn.style['display'] = "";
        window.scrollBy(0, -(paymentOuterContainer.scrollHeight + 50));
        userInfoTableSubmitBtn.style['display'] = '';
        paymentOuterContainer.style['transform'] = 'translateY(-100%)'
        paymentOuterContainer.style['opacity'] = '0'
        paymentOuterContainer.style['transition'] = 'all 800ms'
        setTimeout(() => {
            props.setShowPaymentForm(false);
        }, 800) 
    }

    return (
        <div className="paymentOuterContainer">
            <div className="paymentInnerContainer">
                <h2>Please choose the form of payment you prefer:</h2>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <input defaultChecked type="radio" id="cash" />
                    <label htmlFor="cash">Cash to courier 
                        <span className="inLabelSpan"> (this is the only available option for now)</span>
                    </label>
                    <div className="btnsContainer">
                        <button 
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => goBackToUserTable(event)} 
                            className="goBackToCartBtn">
                                Change address
                        </button>
                        <button 
                            type="submit" 
                            className="finalizeOrderBtn">
                            Finalize order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        listOfProductsInCart: state.cartReducer,
        userInfo: state.userReducer
    }
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        setOrder: (order: Order) => dispatch(orderAction.setOrder(order))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);