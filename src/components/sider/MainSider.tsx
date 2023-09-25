import {Button, Layout, Menu} from "antd";
import {HomeOutlined, BugOutlined, ControlOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import styles from "../../screens/homepage/Homepage.module.css";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {ROUTE} from "../../common/routes";

const { Sider } = Layout;

export default function MainSider() {
    const [collapsed, setCollapsed] = useState(true);
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
            defaultSelectedKeys={['1']}
        >
            <Menu.Item key={1} icon={<HomeOutlined/>} title={"Домой"} >
                Домой
                <Link to={ROUTE.home}/>
            </Menu.Item>
            <Menu.Item key={2} icon={<BugOutlined/>} title={"Тесты"}>
                Тесты
                <Link to={ROUTE.test}/>
            </Menu.Item>
            <Menu.Item key={3} icon={<ControlOutlined/>} title={"Настройки"}>
                Настройки
                <Link to={ROUTE.settings}/>
            </Menu.Item>
        </Menu>
    </Sider>
    );

}