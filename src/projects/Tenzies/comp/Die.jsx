export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "var(--secondary)" : "white",
        borderColor: props.isHeld ? "var(--secondary)" : "transparent",
        transform: props.isHeld ? "scale(0.95)" : "scale(1)"
    }

    return (
        <div
            className={`die-face ${props.isHeld ? 'held' : ''}`}
            style={styles}
            onClick={props.holdDice}
        >
            <div 
                className={`dot dot-${props.value}`}
                style={{ filter: props.isHeld ? 'brightness(0) invert(1)' : 'none' }}
            ></div>
        </div>
    )
}
