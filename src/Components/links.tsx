import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import cartIcon from '../icons/shopping-cart.png';
import logInIcon from '../icons/log-in.png';
import infoIcon from '../icons/information-button.png';
import { connect } from 'react-redux';
import {RootState} from '../store/store'
import {PropsFromStateForLinks} from '../store/interfaces';

const Links = (props: PropsFromStateForLinks) => {
    let amountOfProductsInCart = 0
    props.listOfProductsInCart?.forEach(e => amountOfProductsInCart = amountOfProductsInCart + e.amountToOrder)
    
    const [itemsInCart, setItemsInCart] = useState(0);
    const [prevState, setPrevState] = useState(amountOfProductsInCart);

    // for animation of adding new item to cart:
    useEffect(() => {
        if(prevState < itemsInCart){
            setPrevState(itemsInCart)
        }
        setItemsInCart(amountOfProductsInCart);
        if(itemsInCart > prevState){
            const cartSpan = document.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;
            Object.values(cartSpan).map(e => e.classList.add("itemsInCartNumber"))
            setTimeout(() => {
                Object.values(cartSpan).map(e => e.classList.remove("itemsInCartNumber"))
            }, 2000)
            setPrevState(itemsInCart)
        }
        return() => {
            setItemsInCart(0);
            setPrevState(amountOfProductsInCart)
        }
    }, [props, itemsInCart, prevState, amountOfProductsInCart])

    return (
        <ul className="nav_links">
            <Link className="linkHolder" to={"/about"} >
                <img className="icon" alt="info_icon" src={infoIcon} />
                <li>About</li>
            </Link>
            <Link className="linkHolder" to={"/login"} >
                <img className="icon" alt="logIn_icon" src={logInIcon} />
                <li>Log In</li>
            </Link>
            <Link className="linkHolder cartLink" to={"/cart"} >
                <img className="icon" alt="cart_icon" src={cartIcon} />
                <li>Cart (<span className="preAnimationCartSpan">{itemsInCart}</span>)</li>
            </Link>
        </ul>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        listOfProductsInCart: state.cartReducer
    }
}
export default connect(mapStateToProps, null)(Links);