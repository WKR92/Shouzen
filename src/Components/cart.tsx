import React, {} from 'react';
import { connect } from 'react-redux';
import * as productAction from '../store/productsActions';
import {Products, PropsFromStateForCart, ChangeUnitsInStoreInterface} from '../store/storeInterfaces';
import deleteIcon from '../icons/delete.png'
import plusIcon from '../icons/plus.png';
import minusIcon from '../icons/minus.png'

const Cart = (props: PropsFromStateForCart) => {

    const handleSubmit = (event: MouseEvent) => {
        event.preventDefault();
    }

    const removeProductFromCart = (product: Products) => {
        props.removeProduct(product);
    }

    const incrementOrder = (event: React.MouseEvent<HTMLImageElement>, productName: string, amountToOrder: number) => {
        event.preventDefault();
        amountToOrder++
        props.changeAmountToOrder({productName, amountToOrder})
    }

    const decrementOrder = (event: React.MouseEvent<HTMLImageElement>, productName: string, amountToOrder: number) => {
        event.preventDefault();
        if(amountToOrder <= 0){ return; }
        amountToOrder--
        props.changeAmountToOrder({productName, amountToOrder})
    }
     
    return (
        <section className="cartSection">
            <div className="cartOuterContainer">
                <form onSubmit={() => handleSubmit} className="cartInnerContainer">
                    <h2>Your cart:</h2>
                    {props.listOfProductsInCart.length > 0
                    ? props.listOfProductsInCart.map(elem => {return (
                    <div key={elem.id} className="productContainer">
                        <input className="checkbox" type="checkbox" id={elem.id} name="product" defaultChecked />
                        <label htmlFor="scales">
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
                        </label>
                        <div className="removeProductBtnHolder" id="removeProductBtnHolder">
                            <img alt="delete_icon" src={deleteIcon} onClick={() => removeProductFromCart(elem)} />
                        </div>
                    </div>)})
                    : <div style={{textAlign: 'center'}}>Your cart is empty</div>}
                    {props.listOfProductsInCart.length > 0
                    ? <div className="proceedToPayment">
                        <div>Razem: 0</div>
                        <button>Go to payment</button>
                        </div>
                    : null}
                </form>
            </div>
        </section>
     )
}

const mapStateToProps = (state: Products[]) => {
    return {
      listOfProductsInCart: state
    }
  };
  
  const mapDispatchToProps = (dispatch: Function) => {
    return {
      removeProduct: (product: Products) => dispatch(productAction.removeProductFormCart(product)),
      changeAmountToOrder: (productUnits: ChangeUnitsInStoreInterface) => dispatch(productAction.updateCartUnits(productUnits))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Cart);