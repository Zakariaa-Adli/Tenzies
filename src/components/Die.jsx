
export default function Die({ value, isHeld, hold }) {
    const dotPositions = {
        1: ["center"],
        2: ["top-left", "bottom-right"],
        3: ["top-left", "center", "bottom-right"],
        4: ["top-left", "top-right", "bottom-left", "bottom-right"],
        5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
        6: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"]
    }

    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }

    return (
        <button
            className="die"
            style={styles}
            onClick={hold}
            aria-pressed={isHeld}
            aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"}`}
        >
            {dotPositions[value].map(position => (
                <span
                    key={position}
                    className={`pip ${position}`}
                />
            ))}
        </button>
    )
}
