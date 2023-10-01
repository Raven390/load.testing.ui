import {Route, Routes} from "react-router-dom";
import {ROUTE} from "./common/routes";

import Login from "./screens/login/Login";
import React from "react";
import {TestScreen} from "./screens/test/TestCasesPage";
import Homepage from "./screens/homepage/Homepage";
import {TestCaseScreen} from "./screens/test/components/EditTestCasePage";
import {BrowseTestCase} from "./screens/test/components/BrowseTestCase"

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
            <Route path={ROUTE.editTestCase}
                   element={<TestCaseScreen/>}/>
            <Route path={ROUTE.settings}/>
            <Route path={ROUTE.viewTestCase}
                   element={<BrowseTestCase/>}/>
        </Routes>
    );
}

export default AppRoutes;