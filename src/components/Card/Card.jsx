import React from 'react'
import Data from '../../data/Data'
import './Card.scss'
import { Link } from 'react-router-dom'
import Animate from '../Animate/Animate'

const Card = () => {
    return (
        <section id='projects' className='projects-section'>
            <div className='projects-intro'>
                <p className='section-kicker'>Selected work</p>
                <h2>Small apps, polished into product-like experiences.</h2>
            </div>
            <div className='card-grid'>
            {Data.map((item, index) =>
                <article id={item.heading} key={index} className='project-card'>
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
                                <Link className='btn btn-primary' to={`/${item.appBtn}`}>Try App</Link>
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
                </article>
            )}
            </div>
        </section>
    )
}

export default Card
