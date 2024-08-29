import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Main = (props) => {
    const history=useHistory();
    const {user}=useSelector((state)=>state.auth);
    if(!user){
    history.push('/login');
    }
    return (
        <>
            <Navbar />
            {props.children}
        </>
    );
};

export default Main;
