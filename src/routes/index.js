import Diabetes from "../components/Diabetes";
import FoodList from "../components/FoodList";
import FoodLog from "../components/FoodLog";
import AuthView from "../views/auth/AuthView";
import MainView from "../views/MainView";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

let routes = [
    // {
    //     path: "/auth",
    //     component: AuthView,
    //     layout: "auth",
    // },
    {
        path: "/login",
        component: Login,
        layout: "auth",
    },
    {
        path: "/register",
        component: Register,
        layout: "auth",
    },
    {
        path: "/index",
        component: FoodLog,
        layout: "main",
    },
    {
        path: "/foodlist",
        component: FoodList,
        layout: "main",
    },
    {
        path: "/diabetes",
        component: Diabetes,
        layout: "main",
    },
];
export default routes;
