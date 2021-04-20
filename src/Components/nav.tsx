import React from 'react';
import {Link} from 'react-router-dom';
import cartIcon from '../icons/shopping-cart.png';
import logInIcon from '../icons/log-in.png';
import infoIcon from '../icons/information-button.png';

const Nav = () => {

    return (
        <nav className="mainNavBar">
            <Link className="linkHolder" to={"/"} >
                <h3>Shouzen</h3>
            </Link>
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
                    <li>Cart</li>
                </Link>
            </ul>
        </nav>
    )
}
export default Nav;