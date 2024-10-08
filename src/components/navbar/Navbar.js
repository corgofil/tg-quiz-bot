import { useState } from "react";
import "./style.css";

import {NavLink} from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const tg = window.Telegram.WebApp;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect( () => {
        tg.ready();
      }, [])
    
    const onClose = () => {
          tg.close()
      }

    return (
        <>
            <nav className="nav">
                <div className="container">
                    <div className="nav-row">
                        <div className="logo"></div>
                        {/* Burger Icon */}
                        <div className={`burger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Sidebar Menu */}
            <div className={`side-menu ${menuOpen ? "side-menu--open" : ""}`}>
                <ul className="nav-list">
                    <li className="nav-list__item">
                        <NavLink to="/" className="nav-list__link nav-list__link--active" onClick={closeMenu}>Главная</NavLink>
                    </li>
                    <li className="nav-list__item">
                        <NavLink to="/" className="nav-list__link" onClick={closeMenu}>Профиль</NavLink>
                    </li>
                    <button onClick={onClose}>Close</button>
                    <li className="nav-list__item">
                        <NavLink to="/editor" className="nav-list__link" onClick={closeMenu}>Редактор тестов</NavLink>
                    </li>
                    <li className="nav-list__item">
                        <NavLink to="/" className="nav-list__link" onClick={closeMenu}>Студенты</NavLink>
                    </li>
                </ul>
            </div>
            {/* Overlay */}
            {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
        </>
    );
};

export default Navbar;
