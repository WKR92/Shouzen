import React, {} from 'react';
import products from './products';
import { connect } from 'react-redux';
import * as productAction from '../store/productsActions';
import {Products, PropsFromStateForBoots} from '../store/interfaces'
import {store} from '../store/store'

const Boots = (props: PropsFromStateForBoots) => {

    const addProductToCart = (product: Products) => {     
        props.getProduct(product);
        const cartBtn = document.querySelectorAll('.cartBtn') as NodeListOf<HTMLButtonElement>;
        const loader = document.querySelectorAll('.loaderHolder') as NodeListOf<HTMLDivElement>;
        Object.values(cartBtn).map(e => e.style['display'] = "none");
        Object.values(loader).map(e => e.style['display'] = "inline-block");
        setTimeout(() => {
            Object.values(cartBtn).map(e => e.style['display'] = "inline");
            Object.values(loader).map(e => e.style['display'] = "none");
        }, 1500)
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
                        <div className="btnAndLoaderContainer">{elem.callToAction} <button onClick={() => addProductToCart(elem)} className="cartBtn">Add</button> 
                            <div className="loaderHolder">
                                <button className="loader"></button>
                            </div> to cart.
                        </div>
                    </div>
                    <img src={elem.picture} alt="nike_shoes"/>
                </div>
            </div>
            {/* to check state from localStore */}
            <button style={{height: 60, width: 60}} onClick={() => console.log(store.getState())}> show state</button>
            <button style={{height: 60, width: 60}} onClick={() => localStorage.clear()}>clear local storage</button>
        </div>)})
        : null}
        </>  
    )
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getProduct: (product: Products) => dispatch(productAction.addProductToCart(product))
    }
};

export default connect(undefined , mapDispatchToProps)(Boots);