import React from 'react'
import "./Footer.scss"


const Footer = () => {
    return (
        <div className='footer'>
            <div className="wrapper">
                <div className="heading">
                    <h2>Stay in touch</h2>
                    <p>Queens, NYC, USA</p>
                    <p>umairny1@gmail.com</p>
                </div>
                <div className="links">
                    <div className="item">
                        <a href="https://twitter.com/UmairAh04797202" target="_blank">
                            <div className='twitter'></div>
                        </a>
                    </div>
                    <div className="item">
                        <a href="" target="_blank">
                            <div className='linkedin'></div>
                        </a>
                    </div>
                    <div className="item">
                        <a href="https://www.youtube.com/@umair4ahmad" target="_blank">
                            <div className='youtube'></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer