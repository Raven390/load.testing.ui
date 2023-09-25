
import styles from "../../screens/homepage/Homepage.module.css";
import {Avatar, Button} from "antd";
import React, {useState} from "react";
import {Header} from "antd/es/layout/layout";
import {parseJwt} from "../../utils/parse-jwt";
import keycloak from "../../services/keycloak";
import {observer} from "mobx-react-lite";
import {useStores} from "../../stores/root-store/root-store-context";



export const MainHeader = observer(() => {
    const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const [color, setColor] = useState(ColorList[0]);

    const { profileStore: store, } = useStores();
    let username = store.userShortName;



    return (
        <Header className={styles.header}>
            <div style={{marginLeft: "auto"}}>
                <Avatar style={{backgroundColor: color, verticalAlign: 'middle', marginRight: "20px"}} size="large">
                    {username != null ? username.substring(0, 1) : username}
                </Avatar>
                <Button className={styles.buttonLogout} type="primary" onClick={() => {
                    keycloak.logout().then(() => keycloak.login())
                }}>
                    Logout
                </Button>
            </div>
        </Header>
    );

});
