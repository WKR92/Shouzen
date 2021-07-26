import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../store/store';
import deleteIcon from '../icons/delete.png';
import plusIcon from '../icons/plus.png';
import minusIcon from '../icons/minus.png';
import { Products } from '../store/interfaces';
import { updateCartUnits } from '../store/productsActions';
import React, { useCallback } from 'react';
import { removeProductFromCart } from '../store/productsActions';
import { ProductsTableProps } from '../store/interfaces';
import { useEffect } from 'react';

const ProductsTable = (props: ProductsTableProps) => {

    const listOfProductsInCart = useSelector((state: RootState) => state.cartReducer)
    const dispatch = useDispatch();

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

        if(checkedProductsNodeList.length === listOfProductsInCart.length){
            allProductsInput.checked = true;
            onlyCheckedInput.checked = false;
        }else{
            allProductsInput.checked = false;
            onlyCheckedInput.checked = true;
        }

        const checkedProductsIds = checkedProductsNodeList.map(e => e.id);
        const checkedProducts: Products[] = [];
        
        for (let i of checkedProductsIds) {
            checkedProducts.push(listOfProductsInCart.filter(e => e.id === i)[0]);
        }
        let totalValue = 0;
        checkedProducts.forEach(e => totalValue = totalValue + (e.amountToOrder * e.price))
        props.setTotal(totalValue)

        if(checkedProductsNodeList.length < 1){
                props.closeNextSteps();            
            continueBtn.style['display'] = 'none';
        } else {
            continueBtn.style['display'] = '';
        }
    }

    const cutProductFromCart = (product: Products) => {
        dispatch(removeProductFromCart(product));
    }

    const handleOnlyCheckedRadioBtn = useCallback(() => {
        const checkboxList = document.querySelectorAll('.checkbox') as NodeListOf<HTMLInputElement>;
        const checkedProductsNodeList = Object.values(checkboxList).filter(e => e.checked === true);
        const checkedProductsIds = checkedProductsNodeList.map(e => e.id);
        const checkedProducts: Products[] = [];

        for (let i of checkedProductsIds) {
            checkedProducts.push(listOfProductsInCart.filter(e => e.id === i)[0]);
        }
        return checkedProducts;
    }, [listOfProductsInCart])

    const handleRemoveBtn = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
        event.preventDefault();
        const allProductsInput= document.getElementById('allProducts') as HTMLInputElement;
        if(allProductsInput.checked) {
            listOfProductsInCart.forEach(e => dispatch(removeProductFromCart(e)));
        } else {
            handleOnlyCheckedRadioBtn().forEach(e => dispatch(removeProductFromCart(e)));
        }
    }

    const decrementOrder = (
        event: React.MouseEvent<HTMLImageElement>, 
        product: Products
        ) => {
        event.preventDefault();
        const name = product.name
        let amountToOrder = product.amountToOrder;
        if(amountToOrder === 1) { 
            const confirm = window.confirm("Are you sure? It will remove product from the cart completely.")
            if(confirm) {
                dispatch(removeProductFromCart(product));
                return;
            } else {
                amountToOrder++
            }
        }
        amountToOrder--
        dispatch(updateCartUnits({name, amountToOrder}))
    }

    const incrementOrder = (
        event: React.MouseEvent<HTMLImageElement>,
        product: Products
    ) => {
        event.preventDefault();
        const name = product.name
        let amountToOrder = product.amountToOrder;
        amountToOrder++
        dispatch(updateCartUnits({name, amountToOrder}))
        const plusIcon = document.querySelectorAll('.plusIcon') as NodeListOf<HTMLButtonElement>;
        const loader = document.querySelectorAll('.loader') as NodeListOf<HTMLDivElement>;
        Object.values(plusIcon).map(e => e.style['display'] = "none");
        Object.values(loader).map(e => e.style['display'] = "inline-block");
        setTimeout(() => {
            Object.values(plusIcon).map(e => e.style['display'] = "inline");
            Object.values(loader).map(e => e.style['display'] = "none");
        }, 1500)
    }

    useEffect(() => {
        // set total value of order
        let totalValue = 0;
        handleOnlyCheckedRadioBtn().forEach(e => totalValue = totalValue + (e.amountToOrder * e.price))
        props.setTotal(totalValue);
    }, [props, handleOnlyCheckedRadioBtn])

    return (
        <div className="cartOuterContainer">
                <form  className="cartInnerContainer">
                    <h2>Your cart:</h2>
                    {listOfProductsInCart.length > 0
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
                    {listOfProductsInCart.length > 0
                    ? listOfProductsInCart.map(elem => {return (
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
                            <img alt="delete_icon" src={deleteIcon} onClick={() => cutProductFromCart(elem)} />
                        </div>
                    </div>
                    )})
                    : <div style={{textAlign: 'center'}}>Your cart is empty</div>}
                    {listOfProductsInCart.length > 0
                    ? <div className="proceedToPayment">
                        <div>Total: {props.total}$</div>
                        <button className="continueBtn" 
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => props.openUserInfoTable(event)}>Continue</button>
                        </div>
                    : null}
                </form>
            </div>
    )
}
export default ProductsTable;