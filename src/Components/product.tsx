import React, {} from 'react';
import products from './products';
import { connect } from 'react-redux';
import * as productAction from '../store/productsActions';
import {Products, PropsFromStateForBoots} from '../store/storeInterfaces'
import {store} from '../store/store'

const Boots = (props: PropsFromStateForBoots) => {

    const addProductToCart = (product: Products) => {     
        props.getProduct(product);
    }

    return (
        <>
        {products.length > 0
        ? products.map(elem => {return (
        <div key={elem.id} className="productBg">
            <div className="productContainer">
                <div className={`${elem.id}__container`}>
                    <div className="product__info">
                        <h2><span className="headlineSpan">{elem.name}.</span> {elem.headline}</h2>
                        <p>{elem.description}</p>
                        <p>price: {elem.price}$</p>
                        <p>{elem.callToAction} <button onClick={() => addProductToCart(elem)} className="cartBtn">Add</button> to cart.</p>
                    </div>
                    <img src={elem.picture} alt="nike_shoes"/>
                </div>
            </div>
            {/* to check state from localStore */}
            {/* <button style={{height: 60, width: 60}} onClick={() => console.log(store.getState())}> show state</button>
            <button style={{height: 60, width: 60}} onClick={() => localStorage.clear()}>clear local storage</button> */}
        </div>)})
        : null}
        </>  
    )
}

const mapStateToProps = (state: Products[]) => {
    return {
      listOfProductsInCart: state
    }
  };
  
  const mapDispatchToProps = (dispatch: Function) => {
    return {
      getProduct: (product: Products) => dispatch(productAction.addProductToCart(product))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Boots);