import { useState, useEffect, useRef } from 'react'
import './Home.scss'
import Card from '../../components/Card/Card'

const Home = () => {
    const [scrollTop, setScrollTop] = useState(0)
    const frameRef = useRef(null)

    useEffect(() => {
        function handleScroll() {
            if (frameRef.current) return

            frameRef.current = window.requestAnimationFrame(() => {
                setScrollTop(window.pageYOffset || document.documentElement.scrollTop)
                frameRef.current = null
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (frameRef.current) {
                window.cancelAnimationFrame(frameRef.current)
            }
        }
    }, [])

    const vol = Math.min(scrollTop / 600, 1)

    const titleStyle = {
        transform: `translateY(${scrollTop * 0.2}px)`,
        opacity: 1 - vol * 0.8
    }

    return (
        <>
            <div id="home" className='home'>
                <div style={titleStyle} className='hero-content'>
                    <p className='hero-subtitle'>Portfolio / React projects</p>
                    <h1 className='hero-title gradient-text'>Umair Ahmad.</h1>
                    <p className='hero-description'>
                        I'm a <span className='highlight'>digital creator</span> and <span className='highlight'>web developer</span> based in NYC, building focused interfaces with playful details.
                    </p>
                    <a className='hero-scroll-link' href='#projects'>View Projects</a>
                </div>
            </div>
            <Card />
        </>
    )
}

export default Home
