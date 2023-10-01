import {Button, Layout, Menu} from "antd";
import {BugOutlined, ControlOutlined, HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import styles from "../../screens/homepage/Homepage.module.css";
import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {ROUTE} from "../../common/routes";

const { Sider } = Layout;

const getMenuKeyForPath = (path) => {
    // Здесь вы можете определить логику соответствия
    // пути ключам меню в зависимости от ваших требований.
    // Например, вы можете убрать последний сегмент пути.
    const segments = path.split('/');
    if (segments.length > 2) {
        return `/${segments.slice(1, -1).join('/')}`;
    }
    return path;
};

export default function MainSider() {
    const [collapsed, setCollapsed] = useState(true);
    const location = useLocation();
    const selectedKeys = [getMenuKeyForPath(location.pathname)];

    return (
    <Sider style={{position: "fixed", height: "100vh", transition: 'width 0.2s', bottom: "0", top: "0px"}} theme="dark" width={200}
           trigger={null} collapsible collapsed={collapsed}>
        <Button
            style={{paddingLeft: "30px"}}
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined className={styles.buttonMenuIcon}/> :
                <MenuFoldOutlined className={styles.buttonMenuIcon}/>}
            onClick={() => setCollapsed(!collapsed)}
            className={styles.buttonMenu}
            color="white"
        />
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[ROUTE.home]}
            selectedKeys={selectedKeys}
        >
            <Menu.Item key={ROUTE.home} icon={<HomeOutlined/>} title={"Домой"} >
                Домой
                <Link to={ROUTE.home}/>
            </Menu.Item>
            <Menu.Item key={ROUTE.test} icon={<BugOutlined/>} title={"Тесты"}>
                Тесты
                <Link to={ROUTE.test}/>
            </Menu.Item>
            <Menu.Item key={ROUTE.settings} icon={<ControlOutlined/>} title={"Настройки"}>
                Настройки
                <Link to={ROUTE.settings}/>
            </Menu.Item>
        </Menu>
    </Sider>
    );

}