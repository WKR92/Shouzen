import React, {useState} from 'react';
import menu from '../icons/menu.png'
import {Link} from 'react-router-dom';
import Links from './links'

const Nav = () => {

    const [isToggleOn, setIsToggleOn] = useState(false);

    const activateToggle = (event: React.MouseEvent<HTMLImageElement>) => {
        event.preventDefault();
        setIsToggleOn(!isToggleOn);
    }

    return (
        <nav className="mainNavBar">
            <div className="preResize">
            <Link className="linkHolder" to={"/"} >
                <h3>Shouzen</h3>
            </Link>
            <Links />
            <img onClick={(event: React.MouseEvent<HTMLImageElement>) => activateToggle(event)} alt="menu_icon" src={menu}
            className="navToggle" id="navToggle" />
            </div>
            {isToggleOn
                ? <div className="afterResize">
                    <Links />
                </div>
                : null}
        </nav>
    )
}
export default Nav;