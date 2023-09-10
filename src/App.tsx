import React from "react";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./services/keycloak";
import {BrowserRouter, redirect, Route, Routes} from "react-router-dom";
import {observer} from 'mobx-react-lite';
import {ROUTE} from "./common/routes";
import Homepage from "./screens/homepage/Homepage";
import Login from "./screens/login/Login";

const App = observer(() => {
    return (
        <>
            <ReactKeycloakProvider authClient={keycloak} onEvent={(eventType) => {
                switch (eventType) {
                    case 'onAuthRefreshError': {
                        keycloak.logout().then(() => keycloak.login());
                        break;
                    }

                    case 'onReady':
                        if (!keycloak.authenticated) {
                            keycloak.login().then(() => redirect("/"));
                        }
                        break;


                    case 'onAuthSuccess':
                        break;
                    case 'onAuthError':
                        console.log('onAuthError');
                        break;

                    case 'onAuthLogout':
                        keycloak.logout().then(() => keycloak.login());
                        break;
                }
            }}
            >

                <BrowserRouter>
                    <Routes>
                        <Route
                            path={ROUTE.home}
                            element={<Homepage/>}>
                        </Route>
                        <Route path={ROUTE.login}
                               element={<Login/>}>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ReactKeycloakProvider>
        </>
    );
});

export default App;