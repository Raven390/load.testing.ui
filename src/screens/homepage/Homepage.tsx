import {useKeycloak} from '@react-keycloak/web';
import React from 'react';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Button, Layout, Menu, theme} from 'antd';
import {parseJwt} from "../../utils/parse-jwt";


const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);


const Homepage: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const {keycloak} = useKeycloak();
    let keycloakToken = keycloak.token != null ? keycloak.token.toString() : '';


    return (
        <Layout style={{ margin: '0', padding: 0, minHeight: "100vh"}}>
            <Header style={{justifyContent: "space-between", display: "flex", alignItems: "center", height: "9vh"}}>
                <div className="demo-logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
                <div style={{marginLeft: "auto"}}>
                    <UserOutlined style={{color: "white", fontSize: '25px'}}>
                    </UserOutlined>
                    <Button type="link" style={{color:"white"}}>
                        {parseJwt(keycloakToken).preferred_username}
                    </Button>
                    <Button type="primary" onClick={() => {keycloak.logout().then(() => keycloak.login())}}>
                        Logout
                    </Button>
                </div>

            </Header>

            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: colorBgContainer, height: "70%"}}>
                    <Sider style={{ background: colorBgContainer }} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                            items={items2}
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: "68vh" }}>Content</Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' , height: "12%"}}>Load Testing App ©2023 Created by Potapov Nikita</Footer>
        </Layout>
    );
};

export default Homepage;