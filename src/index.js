import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./assets/css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
ReactDOM.render(
    <Provider store={store}>
          <ToastContainer autoClose={5000} />
        <App />
    </Provider>,
    document.getElementById("root")
);
