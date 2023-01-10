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
    const vol = scrollTop / 500 < 1 ? scrollTop / 500 : 1
    //const scale = 1 - (scrollTop / 1000)
    //const opacity = 1 - (scrollTop / 1000)

    // Update the style of each element based on the scroll position
    const element1Style = {
        transform: `scale(${1 - vol}) translateY(${-scrollTop}px)`,
        opacity: `${1 - vol}`
    };

    const element2Style = {
        transform: `scale(${1 - vol}) translateX(${scrollTop * 2}px)`,
        opacity: `${1 - vol}`
    };


    return (
        <>
            <div id="home" className='home'>
                <div style={element1Style} className='main-title'>
                    <div className='para'>Hi, my name is</div>
                    <div style={element2Style} className='head'>Uamir Ahmad.</div>
                    <div className='para'>I'm a freelance</div>
                    <div style={element2Style} className='head'>graphic designer and web developer</div>
                    <div className='para'>based in NYC.</div>
                </div>
            </div>
            <Card scroll={scrollTop} />
        </>
    )
}

export default Home