import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "./layout/Auth";
import Main from "./layout/Main";
import routes from "./routes";
import store from "./store";

function App() {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        {routes.map((route, index) => {
                            switch (route.layout) {
                                case "main":
                                    return (
                                        <Route key={index} exact path={route.path}>
                                            <Main>
                                                <route.component />
                                            </Main>
                                        </Route>
                                    );
                                case "auth":
                                    return (
                                        <Route key={index} exact path={route.path}>
                                            <Auth>
                                                <route.component />
                                            </Auth>
                                        </Route>
                                    );
                            }
                        })}
                        <Redirect to="/index" />
                    </Switch>
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;
