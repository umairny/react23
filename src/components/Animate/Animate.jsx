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
        transition: "700ms 150ms ease-in-out"
    };
    return (createElement("div", {
        ref: ref, style: onScreen
            ? Object.assign(Object.assign({}, defaultStyles), to) : Object.assign(Object.assign({}, defaultStyles), from)
    }, children));
};
const FadeIn = ({ children }) => (createElement(AnimateIn, { from: { opacity: 0 }, to: { opacity: 1 } }, children));
const FadeUp = ({ children }) => (createElement(AnimateIn, { from: { opacity: 0, translate: "0 2rem" }, to: { opacity: 1, translate: "none" } }, children));
const FadeDown = ({ children }) => (createElement(AnimateIn, { from: { opacity: 0, translate: "0 -2rem" }, to: { opacity: 1, translate: "none" } }, children));
const FocusIn = ({ children }) => (createElement(AnimateIn, { from: { opacity: 0, letterSpacing: "1em", filter: "blur(12px)" }, to: { opacity: 1, filter: "blur(0)" } }, children));
const TiltIn = ({ children }) => (createElement(AnimateIn, { from: { opacity: 0, transform: "rotateX(-30deg) translateX(-300px) skewX(30deg)" }, to: { opacity: 1, transform: "rotateX(0deg) translateX(0px) skewX(0deg)" } }, children));
const ScaleIn = ({ children }) => (createElement(AnimateIn, { from: { scale: "0" }, to: { scale: "1" } }, children));
const Animate = {
    FadeIn,
    FadeUp,
    FadeDown,
    FocusIn,
    TiltIn,
    ScaleIn
};

export default Animate