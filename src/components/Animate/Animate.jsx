import { useState, useEffect, useRef, createElement } from 'react';

function useElementOnScreen(ref, rootMargin = "0px") {
    const [isIntersecting, setIsIntersecting] = useState(true);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, { rootMargin });
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);
    return isIntersecting;
}
const AnimateIn = ({ from, to, children }) => {
    const ref = useRef(null);
    const onScreen = useElementOnScreen(ref);
    const defaultStyles = {
        transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
        willChange: "transform, opacity"
    };
    return (createElement("div", {
        ref: ref, style: onScreen
            ? Object.assign(Object.assign({}, defaultStyles), to) : Object.assign(Object.assign({}, defaultStyles), from)
    }, children));
};
const FadeIn = ({ children }) => (createElement(AnimateIn, { from: { opacity: 0 }, to: { opacity: 1 } }, children));
const FadeUp = ({ children }) => (createElement(AnimateIn, { from: { opacity: 0, transform: "translateY(30px)" }, to: { opacity: 1, transform: "translateY(0)" } }, children));
const FadeDown = ({ children }) => (createElement(AnimateIn, { from: { opacity: 0, transform: "translateY(-30px)" }, to: { opacity: 1, transform: "translateY(0)" } }, children));
const FocusIn = ({ children }) => (createElement(AnimateIn, { from: { opacity: 0, letterSpacing: "0.2em", filter: "blur(8px)" }, to: { opacity: 1, letterSpacing: "normal", filter: "blur(0)" } }, children));
const TiltIn = ({ children }) => (createElement(AnimateIn, { from: { opacity: 0, transform: "rotateX(-15deg) translateY(20px)" }, to: { opacity: 1, transform: "rotateX(0deg) translateY(0)" } }, children));
const ScaleIn = ({ children }) => (createElement(AnimateIn, { from: { opacity: 0, scale: "0.95" }, to: { opacity: 1, scale: "1" } }, children));
const Animate = {
    FadeIn,
    FadeUp,
    FadeDown,
    FocusIn,
    TiltIn,
    ScaleIn
};

export default Animate