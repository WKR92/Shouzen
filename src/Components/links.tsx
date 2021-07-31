import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../icons/shopping-cart.png';
import logInIcon from '../icons/log-in.png';
import infoIcon from '../icons/information-button.png';
import { RootState } from '../store/store'
import { PropsForLinks, LooseObject } from '../store/interfaces';
import { useSelector } from 'react-redux';

const Links = (props: PropsForLinks) => {

    const listOfProductsInCart = useSelector((state: RootState) => state.cartReducer);
    let amountOfProductsInCart = 0
    listOfProductsInCart?.forEach(e => amountOfProductsInCart = amountOfProductsInCart + e.amountToOrder)
    
    const [itemsInCart, setItemsInCart] = useState(0);
    const [prevState, setPrevState] = useState(amountOfProductsInCart);
    const user = useSelector((state: LooseObject) => state.loggedUserReducer);

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
            }, 1500)
            setPrevState(itemsInCart)
        }
        return() => {
            setItemsInCart(0);
            setPrevState(amountOfProductsInCart)
        }
    }, [props, itemsInCart, prevState, amountOfProductsInCart])

    return (
        <ul className="nav_links">
            <Link className="linkHolder" to={"/about"} onClick={() => props.activateToggle()}>
                <img className="icon" alt="info_icon" src={infoIcon} />
                <li>About</li>
            </Link>
            <Link className="linkHolder" to={"/login"} onClick={() => props.activateToggle()}>
                <img className="icon" alt="logIn_icon" src={logInIcon} />
                <li>{Object.keys(user).length !== 0 || (user[0] && Object.keys(user[0]).length !== 0) ? "Profile" : "Log In"}</li>
            </Link>
            <Link className="linkHolder cartLink" to={"/cart"} onClick={() => props.activateToggle()}>
                <img className="icon" alt="cart_icon" src={cartIcon} />
                <li>Cart (<span className="preAnimationCartSpan">{itemsInCart}</span>)</li>
            </Link>
        </ul>
    )
}
export default Links;