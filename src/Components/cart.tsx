import React, {useEffect, useState, useCallback} from 'react';
import { connect } from 'react-redux';
import * as productAction from '../store/productsActions';
import {Products, PropsFromStateForCart, ChangeUnitsInStoreInterface} from '../store/interfaces';
import deleteIcon from '../icons/delete.png'
import plusIcon from '../icons/plus.png';
import minusIcon from '../icons/minus.png'
import {RootState} from '../store/store'

const Cart = (props: PropsFromStateForCart) => {

    const [total, setTotal] = useState(0)

    const handleSubmit = (event: MouseEvent) => {
        event.preventDefault();
    }

    const removeProductFromCart = (product: Products) => {
        props.removeProduct(product);
    }

    const incrementOrder = (
        event: React.MouseEvent<HTMLImageElement>,
        productName: string,
        amountToOrder: number
    ) => {
        event.preventDefault();
        amountToOrder++
        props.changeAmountToOrder({productName, amountToOrder})
    }

    const decrementOrder = (
        event: React.MouseEvent<HTMLImageElement>, 
        productName: string, 
        amountToOrder: number
        ) => {
        event.preventDefault();
        if(amountToOrder <= 0){ return; }
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
        const checkedProductsNodeList = Object.values(checkboxList).filter(e => e.checked === true)

        if(checkedProductsNodeList.length === props.listOfProductsInCart.length){
            allProductsInput.checked = true;
            onlyCheckedInput.checked = false;
        }else{
            allProductsInput.checked = false;
            onlyCheckedInput.checked = true;
        }

        const checkedProductsIds = checkedProductsNodeList.map(e => e.id);
        const checkedProducts: any[] = [];
        
        for (let i of checkedProductsIds) {
            checkedProducts.push(props.listOfProductsInCart.filter(e => e.id === i)[0]);
        }
        let totalValue = 0;
        checkedProducts.forEach(e => totalValue = totalValue + (e.amountToOrder * e.price))
        setTotal(totalValue)
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
        const checkedProducts: any[] = [];

        for (let i of checkedProductsIds) {
            checkedProducts.push(props.listOfProductsInCart.filter(e => e.id === i)[0]);
        }
        return checkedProducts;
    }, [props])

    useEffect(() => {
        // set total value of order
        let totalValue = 0;
        handleOnlyCheckedRadioBtn().forEach(e => totalValue = totalValue + (e.amountToOrder * e.price))
        setTotal(totalValue)
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
                                <img alt="plus_icon" src={plusIcon} 
                                onClick={(event: React.MouseEvent<HTMLImageElement>) => incrementOrder(event, elem.name, elem.amountToOrder)}/>
                                <div className="amountToOder">{elem.amountToOrder}</div>
                                <img alt="minus_icon" src={minusIcon} 
                                onClick={(event: React.MouseEvent<HTMLImageElement>) => decrementOrder(event, elem.name, elem.amountToOrder)}/>
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
                        <button onClick={() => handleSubmit}>Go to payment</button>
                        </div>
                    : null}
                </form>
            </div>
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
        removeProduct: (product: Products) => dispatch(productAction.removeProductFormCart(product)),
        changeAmountToOrder: (productUnits: ChangeUnitsInStoreInterface) => dispatch(productAction.updateCartUnits(productUnits))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);