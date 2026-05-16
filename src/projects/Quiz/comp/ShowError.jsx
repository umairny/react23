export default function ShowError (props) {
    return (
        <div className="error">
            <p className="quiz-kicker">Question fetch failed</p>
            <h1>Could not load this quiz.</h1>
            <p>{props.err.message}</p>
            <button className="btn btn-primary" onClick={props.onChangeSettings}>
                Change Settings
            </button>
        </div>
    )
}
