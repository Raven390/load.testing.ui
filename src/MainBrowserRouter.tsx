import {BrowserRouter} from "react-router-dom";
import {Layout, Space, Spin} from "antd";
import MainSider from "./components/sider/MainSider";

import {Content} from "antd/es/layout/layout";
import AppRoutes from "./app-routes";
import MainFooter from "./components/footer/Footer";
import React from "react";
import {MainHeader} from "./components/header/Header";


export default function MainBrowserRouter(keycloakReady: boolean) {
    if (keycloakReady) {
        return (
            <BrowserRouter>
                <div className="App">
                    <Layout hasSider>
                        <MainSider/>
                        <Layout className="site-layout"
                                style={{transition: 'width 0.2s', marginLeft: 80, minHeight: "100vh"}}>
                            <MainHeader/>
                            <Layout className="App-layout"
                                    style={{height: "100%", transition: 'width 0.2s', marginLeft: 100, marginRight: 100}}>
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
    } else {
        return (
            <div style={{display: "flex", justifyContent: "center", height: "100vh"}}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
        );
    }

}
