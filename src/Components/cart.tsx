import React, {useEffect, useState, useCallback} from 'react';
import { connect } from 'react-redux';
import * as productAction from '../store/productsActions';
import {Products, PropsFromStateForCart, ChangeUnitsInStoreInterface} from '../store/interfaces';
import deleteIcon from '../icons/delete.png';
import plusIcon from '../icons/plus.png';
import minusIcon from '../icons/minus.png';
import {RootState} from '../store/store';
import UserInfoTable from './userInfoTable';
import Payment from './payment';
import ThankYouModal from './thankYouModal';
import fire from '../fire';
import LoginModal from './loginModal';

const Cart = (props: PropsFromStateForCart) => {

    const [total, setTotal] = useState(0)
    const [showUserInfoTable, setShowUserInfoTable] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal]  = useState(false);
    const [user, setUser] = useState({} as any);

    const authListener = useCallback(() => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);          
            } else {
                setUser(null);
            }
        })
    }, [])

    useEffect(() => {
        authListener();
    }, [authListener, user])

    const closeNextSteps = () => {
        setShowUserInfoTable(false)
        setShowPaymentForm(false)
        setShowModal(false)
    }

    // open UserInfoTable on state change
    useEffect(() => {
        if(showUserInfoTable){
            const continueBtn = document.querySelector('.continueBtn') as HTMLButtonElement;
            const userInfoTable = document.getElementById('userInfoTable') as HTMLDivElement;
            const userInfoTableTopLine = userInfoTable.offsetTop;
            userInfoTable.style['transform'] = 'translateY(0)'
            userInfoTable.style['opacity'] = '1'
            userInfoTable.style['transition'] = 'all 800ms'
            continueBtn.style['display'] = 'none';
            window.scrollTo({ top: userInfoTableTopLine - 20, behavior: 'smooth'});   
        }      
    }, [showUserInfoTable])

    // open Payment on state change
    useEffect(() => {
        if(showPaymentForm){
            const paymentOuterContainer = document.querySelector('.paymentOuterContainer') as HTMLDivElement;    
            paymentOuterContainer.style['transform'] = 'translateY(0)'
            paymentOuterContainer.style['opacity'] = '1'
            paymentOuterContainer.style['transition'] = 'all 800ms'
            window.scrollTo(0, document.body.scrollHeight);   
        }      
    }, [showPaymentForm])

    useEffect(() => {
        if(props.listOfProductsInCart.length < 1){
            closeNextSteps();
        }
    }, [props])

    const openUserInfoTable = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(user){
            setShowUserInfoTable(!showUserInfoTable);
            const removeItemsBox = document.querySelector('.removeItemsBox') as HTMLDivElement;
            const checkboxList = document.querySelectorAll('.checkbox') as NodeListOf<HTMLInputElement>;
            const removeProductBtnHolderList = document.querySelectorAll('.removeProductBtnHolder') as NodeListOf<HTMLDivElement>;
            const amountToOderHolderList = document.querySelectorAll('.amountToOderHolder') as NodeListOf<HTMLDivElement>;
            removeItemsBox.style['display'] = 'none';
            checkboxList.forEach(e => e.disabled = true)
            removeProductBtnHolderList.forEach(e => e.style['display'] = 'none')
            amountToOderHolderList.forEach(e => e.style['display'] = 'none')
        } else {
            setShowLoginModal(true);
        }
    }

    const removeProductFromCart = (product: Products) => {
        props.removeProduct(product);
    }

    const incrementOrder = (
        event: React.MouseEvent<HTMLImageElement>,
        product: Products
    ) => {
        event.preventDefault();
        const productName = product.name
        let amountToOrder = product.amountToOrder;
        amountToOrder++
        props.changeAmountToOrder({productName, amountToOrder})
        const plusIcon = document.querySelectorAll('.plusIcon') as NodeListOf<HTMLButtonElement>;
        const loader = document.querySelectorAll('.loader') as NodeListOf<HTMLDivElement>;
        Object.values(plusIcon).map(e => e.style['display'] = "none");
        Object.values(loader).map(e => e.style['display'] = "inline-block");
        setTimeout(() => {
            Object.values(plusIcon).map(e => e.style['display'] = "inline");
            Object.values(loader).map(e => e.style['display'] = "none");
        }, 1500)
    }

    const decrementOrder = (
        event: React.MouseEvent<HTMLImageElement>, 
        product: Products
        ) => {
        event.preventDefault();
        const productName = product.name
        let amountToOrder = product.amountToOrder;
        if(amountToOrder === 1) { 
            const confirm = window.confirm("Are you sure? It will remove product from the cart completely.")
            if(confirm) {
                props.removeProduct(product);
                return;
            } else {
                amountToOrder++
            }
        }
        amountToOrder--
        props.changeAmountToOrder({productName, amountToOrder})
    }

    const handleAllRadioBtn = () => {
        const checkboxList = document.querySelectorAll('.checkbox') as NodeListOf<HTMLInputElement>;
        Object.values(checkboxList).map(e => e.checked = true);
    }

    const handleCheckbox = () => {
        const checkboxList = document.querySelectorAll('.checkbox') as NodeListOf<HTMLInputElement>;
        const allProductsInput= document.getElementById('allProducts') as HTMLInputElement;
        const onlyCheckedInput= document.getElementById('onlyChecked') as HTMLInputElement;
        const continueBtn = document.querySelector('.continueBtn') as HTMLButtonElement;
        const checkedProductsNodeList = Object.values(checkboxList).filter(e => e.checked === true)

        if(checkedProductsNodeList.length === props.listOfProductsInCart.length){
            allProductsInput.checked = true;
            onlyCheckedInput.checked = false;
        }else{
            allProductsInput.checked = false;
            onlyCheckedInput.checked = true;
        }

        const checkedProductsIds = checkedProductsNodeList.map(e => e.id);
        const checkedProducts: Products[] = [];
        
        for (let i of checkedProductsIds) {
            checkedProducts.push(props.listOfProductsInCart.filter(e => e.id === i)[0]);
        }
        let totalValue = 0;
        checkedProducts.forEach(e => totalValue = totalValue + (e.amountToOrder * e.price))
        setTotal(totalValue)

        if(checkedProductsNodeList.length < 1){
                closeNextSteps();            
            continueBtn.style['display'] = 'none';
        } else {
            continueBtn.style['display'] = '';
        }
    }

    const handleRemoveBtn = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
        event.preventDefault();
        const allProductsInput= document.getElementById('allProducts') as HTMLInputElement;
        if(allProductsInput.checked) {
            props.listOfProductsInCart.forEach(e => props.removeProduct(e));
        } else {
            handleOnlyCheckedRadioBtn().forEach(e => props.removeProduct(e));
        }
    }

    const handleOnlyCheckedRadioBtn = useCallback(() => {
        const checkboxList = document.querySelectorAll('.checkbox') as NodeListOf<HTMLInputElement>;
        const checkedProductsNodeList = Object.values(checkboxList).filter(e => e.checked === true);
        const checkedProductsIds = checkedProductsNodeList.map(e => e.id);
        const checkedProducts: Products[] = [];

        for (let i of checkedProductsIds) {
            checkedProducts.push(props.listOfProductsInCart.filter(e => e.id === i)[0]);
        }
        return checkedProducts;
    }, [props])

    useEffect(() => {
        // set total value of order
        let totalValue = 0;
        handleOnlyCheckedRadioBtn().forEach(e => totalValue = totalValue + (e.amountToOrder * e.price))
        setTotal(totalValue);
    }, [handleOnlyCheckedRadioBtn])
     
    return (
        <section className="cartSection">
            <div className="cartOuterContainer">
                <form  className="cartInnerContainer">
                    <h2>Your cart:</h2>
                    {props.listOfProductsInCart.length > 0
                    ? <div className="removeItemsBox">
                        <div onChange={handleAllRadioBtn} className="radioHolder">
                            <input type="radio" id="allProducts" name="removeItems" defaultChecked />
                            <label htmlFor="allProducts">All</label>
                        </div>
                        <div className="radioHolder">
                            <input type="radio" id="onlyChecked" name="removeItems" />
                            <label htmlFor="onlyChecked">Only checked</label>
                        </div>
                        <button onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleRemoveBtn(event)}>
                            Remove
                        </button>
                    </div> : null}
                    {props.listOfProductsInCart.length > 0
                    ? props.listOfProductsInCart.map(elem => {return (
                    <div key={elem.id} className="productContainer">
                        <input className="checkbox" type="checkbox" id={elem.id} name="product" defaultChecked
                        onChange={handleCheckbox} />
                        <div className="productInnerContainer">
                            <div className="imgHolder">
                                <img src={elem.picture} alt="nike_shoes"/>  
                            </div>
                            <div className="headlineHolder">
                                <h3>{elem.name}.</h3>
                                <span id="headlineSpanToHideOnResize"> {elem.headline}</span>
                            </div>
                            <div className="priceHolder">
                                <p>{elem.price}$</p>
                            </div>
                            <div className="amountToOderHolder">
                                <img alt="minus_icon" src={minusIcon} 
                                onClick={(event: React.MouseEvent<HTMLImageElement>) => decrementOrder(event, elem)}/>
                                <div className="amountToOder">{elem.amountToOrder}</div>
                                <img className="plusIcon" alt="plus_icon" src={plusIcon} 
                                onClick={(event: React.MouseEvent<HTMLImageElement>) => incrementOrder(event, elem)}/>
                                <div className="loader"></div>
                            </div>
                        </div>
                        <div className="removeProductBtnHolder" id="removeProductBtnHolder">
                            <img alt="delete_icon" src={deleteIcon} onClick={() => removeProductFromCart(elem)} />
                        </div>
                    </div>
                    )})
                    : <div style={{textAlign: 'center'}}>Your cart is empty</div>}
                    {props.listOfProductsInCart.length > 0
                    ? <div className="proceedToPayment">
                        <div>Total: {total}$</div>
                        <button className="continueBtn" 
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => openUserInfoTable(event)}>Continue</button>
                        </div>
                    : null}
                </form>
            </div>
            {showLoginModal
            ? <LoginModal setShowLoginModal={setShowLoginModal}/>
            : null}
            {showUserInfoTable
            ? <UserInfoTable setShowPaymentForm={setShowPaymentForm} setShowUserInfoTable={setShowUserInfoTable} />
            : null}
            {showPaymentForm
            ? <Payment setShowModal={setShowModal} total={total} setShowPaymentForm={setShowPaymentForm} />
            : null}
            {showModal
            ? <ThankYouModal setShowModal={setShowModal} />
            : null}
        </section>
     )
}

const mapStateToProps = (state: RootState) => {
    return {
        listOfProductsInCart: state.cartReducer
    }
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        removeProduct: (product: Products) => dispatch(productAction.removeProductFromCart(product)),
        changeAmountToOrder: (productUnits: ChangeUnitsInStoreInterface) => dispatch(productAction.updateCartUnits(productUnits))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);