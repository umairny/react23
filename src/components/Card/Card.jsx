import React, { useState } from 'react'
import Data from '../../data/Data'
import './Card.scss'
import { Link } from 'react-router-dom'
import Animate from '../Animate/Animate'
import reactLogo from '/projectLogo.svg'
import Youtube from './Youtube'

const Card = (props) => {
    const [anim, setAnim] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }
    return (
        <div className='card-grid'>
            {Data.map((item, index) =>
                <div id={item.heading} key={index} className='project-card glass'>
                    <div className='card-content'>
                        <div className='card-header'>
                            <Animate.FadeDown><span className='project-number'>Project {index + 1}</span></Animate.FadeDown>
                            <Animate.FocusIn><h2 className='project-title'>{item.heading}</h2></Animate.FocusIn>
                        </div>
                        
                        <div className='card-body'>
                            <Animate.ScaleIn><p className='project-detail'>{item.detail}</p></Animate.ScaleIn>
                            
                            <div className='project-features'>
                                <Animate.FadeDown><h3 className='section-label'>Key Features</h3></Animate.FadeDown>
                                <ul className='feature-list'>
                                    {item.features.map((fe, i) =>
                                        <Animate.TiltIn key={i}><li>{fe}</li></Animate.TiltIn>
                                    )}
                                </ul>
                            </div>

                            <div className='project-tech'>
                                <Animate.FocusIn><h3 className='section-label'>Tech Stack</h3></Animate.FocusIn>
                                <p className='tech-tags'>{item.tech}</p>
                            </div>
                        </div>

                        <div className='card-footer'>
                            <div className='project-links'>
                                <Link className='btn btn-primary' onClick={() => scrollToTop()} to={item.appBtn}>View Live App</Link>
                                <a className='btn btn-outline' href={item.codeBtn}>Source Code</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className='card-visual'>
                        <Animate.ScaleIn>
                            <div className='image-wrapper'>
                                <img src={item.image} alt={item.heading} className='project-mockup' />
                                <div className='glass-overlay'></div>
                            </div>
                        </Animate.ScaleIn>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Card