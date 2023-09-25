import {Route, Routes} from "react-router-dom";
import {ROUTE} from "./common/routes";

import Login from "./screens/login/Login";
import React from "react";
import {TestScreen} from "./screens/test/TestCasePage";
import Homepage from "./screens/homepage/Homepage";


function AppRoutes() {
    return (
        <Routes>
            <Route
                path={ROUTE.home}
                element={<Homepage/>}>
            </Route>
            <Route path={ROUTE.login}
                   element={<Login/>}>
            </Route>
            <Route path={ROUTE.test}
                element={<TestScreen/>}/>
            <Route path={ROUTE.settings}/>
        </Routes>
    );
}

export default AppRoutes;