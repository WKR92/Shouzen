import { RootState } from '../store/store';
import { setOrder } from '../store/orderActions';
import { PaymentProps } from '../store/interfaces';
import fire from '../utils/fire';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Payment = (props: PaymentProps) => {

    const dispatch = useDispatch();
    const listOfProductsInCart = useSelector((state: RootState) => state.cartReducer);
    const userInfo = useSelector((state: RootState) => state.userReducer);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        props.setShowModal(true);

        const whatIsOrdered: [string, number][] = [];
        listOfProductsInCart.forEach(e => whatIsOrdered.push([e.name, e.amountToOrder]))

        function guidGenerator() {
            var S4 = function() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
          }

        const user = fire.auth().currentUser!;

        const order = {
            user: user.uid,
            order: {
                id            : guidGenerator(),
                data          : new Date().toLocaleString(),
                whatIsOrdered : whatIsOrdered,
                whoIsOrdering : userInfo,
                costOfOrder   : props.total + '$'
            }
        }
        
        dispatch(setOrder(order));
        const orderRef = fire.database().ref('Orders');
        orderRef.push(order)
    }

    const goBackToUserTable = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const paymentOuterContainer = document.querySelector('.paymentOuterContainer') as HTMLDivElement;
        const userInfoTable = document.getElementById('userInfoTable') as HTMLDivElement;
        const startLineOfUserInfoTableBlock = userInfoTable.offsetTop;
        paymentOuterContainer.style['transform'] = 'translateY(-100%)';
        paymentOuterContainer.style['opacity'] = '0';
        paymentOuterContainer.style['transition'] = 'all 800ms';
        props.setIsFormDisabled(false);

        window.scrollTo(0, startLineOfUserInfoTableBlock - 20)
        window.scrollTo()
        setTimeout(() => {
            props.setShowPaymentForm(false);
        }, 800) 
    }

    useEffect(() => {
        const paymentOuterContainer = document.querySelector('.paymentOuterContainer') as HTMLDivElement;    
        paymentOuterContainer.style['transform'] = 'translateY(0)'
        paymentOuterContainer.style['opacity'] = '1'
        paymentOuterContainer.style['transition'] = 'all 800ms'
        window.scrollTo(0, document.body.scrollHeight);   
    }, [])

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
                            className="goBackToForm">
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
export default Payment;