import { useState, useLayoutEffect } from 'react'
import './Home.scss'
import Card from '../../components/Card/Card'

const Home = () => {
    const [scrollTop, setScrollTop] = useState(0);

    // Set up an event listener to update the scroll position
    useLayoutEffect(() => {
        function handleScroll() {
            setScrollTop(window.pageYOffset || document.documentElement.scrollTop);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const vol = Math.min(scrollTop / 600, 1);

    const titleStyle = {
        transform: `translateY(${scrollTop * 0.2}px)`,
        opacity: 1 - vol * 0.8
    };

    return (
        <>
            <div id="home" className='home'>
                <div style={titleStyle} className='hero-content'>
                    <p className='hero-subtitle'>Hi, my name is</p>
                    <h1 className='hero-title gradient-text'>Umair Ahmad.</h1>
                    <p className='hero-description'>
                        I'm a <span className='highlight'>digital creator</span> & <span className='highlight'>web developer</span> based in NYC, crafting premium digital experiences.
                    </p>
                </div>
            </div>
            <Card scroll={scrollTop} />
        </>
    )
}

export default Home