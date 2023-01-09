import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import './Header.scss';
import Data from '../../data/Data';

const Header = () => {
    const [toggel, setToggel] = useState(false)
    const location = useLocation();
    const path = location.pathname.substring(1)
    //console.log("path", path, location)

    const scrollTo = (id) => {
        const scroll = document.getElementById(id);
        window.scrollTo({
            top: scroll?.offsetTop ? scroll?.offsetTop - 100 : 100,
            left: 0,
            behavior: 'smooth',
        });
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
        <nav className='nav-container'>
            <div className="wrapper">
                <Link className='nav-logo' to="/" onClick={() => { scrollToTop(), setToggel(false) }}>Projects</Link>
                <div className={toggel ? 'nav-menu toggel show' : 'nav-menu toggel hide'}>
                    {path.length === 0 && Data.map((item, index) =>
                        <a key={index}
                            onClick={() => {
                                scrollTo(`${item.heading}`),
                                    setToggel(false)
                            }}
                            /*className={path === "" ? 'nav-link active' : 'nav-link'}*/ className='nav-link'>
                            {item.heading}
                        </a>
                    )}
                </div>
                {path.length === 0 &&
                    <div onClick={() => setToggel(!toggel)} className='nav-toggel-btn'>
                        {toggel ? <>&#215;</> : <>&equiv;</>}
                    </div>
                }
            </div>
        </nav >
    );
}

export default Header;
