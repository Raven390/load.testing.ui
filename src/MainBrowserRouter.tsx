import {BrowserRouter} from "react-router-dom";
import {Layout} from "antd";
import MainSider from "./components/sider/MainSider";

import {Content} from "antd/es/layout/layout";
import AppRoutes from "./app-routes";
import MainFooter from "./components/footer/Footer";
import React from "react";
import {MainHeader} from "./components/header/Header";


export default function MainBrowserRouter() {
    return (
        <BrowserRouter>
            <div className="App" >
                <Layout hasSider>
                    <MainSider/>
                    <Layout className="site-layout" style={{transition: 'width 0.2s', marginLeft: 80}}>
                        <MainHeader/>
                        <Layout className="App-layout" hasSider
                                style={{ height: "100%",transition: 'width 0.2s'}}>
                            <Content className="App-content"
                                     style={{padding: '0 20px', overflow: "initial"}}>
                                <AppRoutes/>
                            </Content>
                        </Layout>
                        <MainFooter/>
                    </Layout>
                </Layout>
            </div>
        </BrowserRouter>
    );
}
