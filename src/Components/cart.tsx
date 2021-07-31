import React, {useEffect, useState } from 'react';
import { RootState } from '../store/store';
import ProductsTable from './productsTable';
import UserInfoTable from './userInfoTable';
import Payment from './payment';
import ThankYouModal from './thankYouModal';
import LoginModal from './loginModal';
import { useSelector } from 'react-redux';
import { LooseObject } from '../store/interfaces';

const Cart = () => {

    const [total, setTotal] = useState(0)
    const [showUserInfoTable, setShowUserInfoTable] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal]  = useState(false);
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const listOfProductsInCart = useSelector((state: RootState) => state.cartReducer);
    const user = useSelector((state: LooseObject) => state.loggedUserReducer);

    const closeNextSteps = () => {
        setShowUserInfoTable(false)
        setShowPaymentForm(false)
        setShowModal(false)
    }

    useEffect(() => {
        if(listOfProductsInCart.length < 1){
            closeNextSteps();
        }
        return () => {
            if(listOfProductsInCart.length < 1){
                closeNextSteps();
            }
        }
    }, [listOfProductsInCart])

    const openUserInfoTable = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(Object.keys(user[0]).length !== 0){
            setShowUserInfoTable(!showUserInfoTable);
            
            setTimeout(() => {
                const removeItemsBox = document.querySelector('.removeItemsBox') as HTMLDivElement;
                const checkboxList = document.querySelectorAll('.checkbox') as NodeListOf<HTMLInputElement>;
                const removeProductBtnHolderList = document.querySelectorAll('.removeProductBtnHolder') as NodeListOf<HTMLDivElement>;
                const amountToOderHolderList = document.querySelectorAll('.amountToOderHolder') as NodeListOf<HTMLDivElement>;
                removeItemsBox.style['visibility'] = 'hidden';
                checkboxList.forEach(e => e.disabled = true)
                removeProductBtnHolderList.forEach(e => e.style['visibility'] = 'hidden')
                amountToOderHolderList.forEach(e => e.style['visibility'] = 'hidden')
            }, 800);
        } else {
            setShowLoginModal(true);
        }
    }
     
    return (
        <section className="cartSection">
            <ProductsTable 
            total={total}
            setTotal={setTotal}
            closeNextSteps={closeNextSteps}
            openUserInfoTable={openUserInfoTable} />
            {showLoginModal
            ? <LoginModal setShowLoginModal={setShowLoginModal}/>
            : null}
            {showUserInfoTable
            ? <UserInfoTable setShowPaymentForm={setShowPaymentForm} setShowUserInfoTable={setShowUserInfoTable}
            setIsFormDisabled={setIsFormDisabled} isFormDisabled={isFormDisabled} />
            : null}
            {showPaymentForm
            ? <Payment setShowModal={setShowModal} total={total} setShowPaymentForm={setShowPaymentForm} 
            setIsFormDisabled={setIsFormDisabled}/>
            : null}
            {showModal
            ? <ThankYouModal setShowModal={setShowModal} />
            : null}
        </section>
     )
}
export default Cart;