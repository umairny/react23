import React from 'react'
import "./Footer.scss"


const Footer = () => {
    return (
        <footer className='footer glass'>
            <div className='footer-content'>
                <div className='footer-left'>
                    <p className='copyright'>&copy; {new Date().getFullYear()} Umair Ahmad.</p>
                    <p className='location'>Crafted in NYC</p>
                </div>
                <div className='footer-right'>
                    <div className='social-links'>
                        <a href="https://github.com/umairny" target="_blank" rel="noreferrer" className='social-link'>GitHub</a>
                        <a href="https://www.youtube.com/@umair4ahmad" target="_blank" rel="noreferrer" className='social-link'>YouTube</a>
                        <a href="https://twitter.com/UmairAh04797202" target="_blank" rel="noreferrer" className='social-link'>Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer