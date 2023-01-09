import React, { useState } from 'react'
import Data from '../../data/Data'
import './Card.scss'
import { Link } from 'react-router-dom'
import Animate from '../Animate/Animate'
import reactLogo from '/projectLogo.svg'

const Card = (props) => {
    const [anim, setAnim] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }
    /*    const handleScroll = (el, i) => {
            if (!el) return;
            const top = el.getBoundingClientRect().top
            const scrollPos = window.scrollY + window.innerHeight - 500
            console.log("postions", top, scrollPos)
            if (top < 100) {
    
    
                console.log(top, i)
            }
    
        }
    */
    return (
        <div className='cardDeck'>
            {Data.map((item, index) =>
                <div id={item.heading} className='card' key={index}>
                    <div className='cardLeft'>
                        <Animate.FocusIn><h1>{item.heading}</h1></Animate.FocusIn>
                        <Animate.ScaleIn><p>{item.detail}</p></Animate.ScaleIn>
                        <Animate.FadeDown><h3>How to:</h3></Animate.FadeDown>
                        <ol>{item.features.map((fe, i) =>
                            <Animate.TiltIn><li key={i}>{fe}</li></Animate.TiltIn>
                        )}
                        </ol>

                        <div className='links'>
                            <Link className='link' onClick={() => scrollToTop()} to={item.appBtn}>Go to app</Link>
                            <Link className='link' to={item.codeBtn}>Go to code</Link>
                        </div>
                    </div>
                    <div className='cardRight'>
                        <Animate.FadeDown>
                            <div class="container">
                                <div class="react">
                                    <div class="react__spoke react__spoke--0"></div>
                                    <div class="react__spoke react__spoke--1"></div>
                                    <div class="react__spoke react__spoke--2"></div>
                                    <div class="react__spoke--3">
                                        <p>{index + 1}</p>
                                    </div>
                                </div>
                            </div>
                        </Animate.FadeDown>
                        <Animate.FadeUp>
                            <div className='tech'>
                                <Animate.FocusIn><h3>Challages:</h3></Animate.FocusIn>
                                <p>{item.tech}</p>
                            </div>
                        </Animate.FadeUp>
                    </div>
                    <div className='youVid'>
                        <Animate.FadeUp>
                            <img className='vid' src={item.img} alt={item.img} />
                        </Animate.FadeUp>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Card