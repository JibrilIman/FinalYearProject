import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { login, logout } from "../../store/actions/authAction";
// import { Button } from "reactstrap";
const AuthView = (props) => {
    let dispatch = useDispatch();
    return (
        <>
            <h2>Auth View</h2>
            <button
                onClick={(e) => {
                    // dispatch(login());
                }}
            >
                Login
            </button>

            <button
                onClick={(e) => {
                    // dispatch(logout());
                }}
            >
                Logout
            </button>
            <Link to="/main">Main View</Link>
        </>
    );
};

export default AuthView;
