import { useRouteError, Link } from "react-router-dom";
import "./Error.scss"

export default function Error() {
    const error = useRouteError();
    //console.error(error);

    return (
        <div className="error">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/">Go back home</Link>
        </div>
    );
}