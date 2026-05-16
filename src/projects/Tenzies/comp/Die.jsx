export default function Die(props) {
    return (
        <button
            type="button"
            className={`die-face ${props.isHeld ? 'held' : ''}`}
            onClick={props.holdDice}
            aria-pressed={props.isHeld}
            aria-label={`${props.isHeld ? "Release" : "Hold"} die showing ${props.value}`}
        >
            <div 
                className={`dot dot-${props.value}`}
            ></div>
        </button>
    )
}
