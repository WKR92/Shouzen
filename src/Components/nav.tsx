import React, {useState, useLayoutEffect, useRef} from 'react';
import menu from '../icons/menu.png'
import {Link} from 'react-router-dom';
import Links from './links'

const Nav = () => {

    const [isToggleOn, setIsToggleOn] = useState(false);
    const toggleRef = useRef(false);

    const activateToggle = () => {
        if(window.innerWidth < 650){
            setIsToggleOn(!isToggleOn);
            toggleRef.current = !toggleRef.current
        }

        const body = document.body;
        if(toggleRef.current){body.classList.add("stop-scrolling");}
        else {body.classList.remove("stop-scrolling");}
    }

    const activateToggleForBrandBtnOnly = () => {
        if (!isToggleOn) { 
            return; }
        else {
            activateToggle()
        }
    }

    useLayoutEffect(() => {
        window.addEventListener('resize', () => {
            if(window.innerWidth >= 650){
                setIsToggleOn(false)

                const body = document.body;
                body.classList.remove("stop-scrolling");
            }
        });
        return () => window.addEventListener('resize', () => {
            if(window.innerWidth >= 650){
                setIsToggleOn(false)

                const body = document.body;
                body.classList.remove("stop-scrolling");
            }
        });
    }, []);

    return (
        <nav className="mainNavBar">
            <div className="preResize">
                <Link className="linkHolder" to={"/"} onClick={() => activateToggleForBrandBtnOnly()}>
                    <i className="fas fa-shoe-prints foot-prints-icon"></i>
                    <h3>Shouzen</h3>
                </Link>
                <Links activateToggle={activateToggle} />
                <img onClick={() => activateToggle()} alt="menu_icon" src={menu}
                className="navToggle" id="navToggle" />
            </div>
            {isToggleOn
                ? <div className="afterResize" transition-style="in:circle:hesitate">
                    <Links activateToggle={activateToggle} />
                </div>
                : null}
        </nav>
    )
}
export default Nav;