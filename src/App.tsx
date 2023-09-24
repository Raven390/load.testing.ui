import React, {useEffect} from "react";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./services/keycloak";
import {RootStore} from "./stores/root-store/root-store";
import {setupRootStore} from "./stores/root-store/setup-root-store";
import {RootStoreProvider} from "./stores/root-store/root-store-context";
import MainBrowserRouter from "./MainBrowserRouter";
import {getCookie, removeCookie} from "./services/clientStorage";


function App() {
    const [rootStore, setRootStore] = React.useState<RootStore | undefined>(
        undefined
    );

    useEffect(() => {
        setupRootStore()
            .then(setRootStore)
            .catch((ex) => console.log("setupRootStore", ex));
        console.log("Root store loaded")
    }, []);


    if (rootStore == null || !rootStore?.isLoaded) {
        return null;
    }

    return (
        <>
            <ReactKeycloakProvider authClient={keycloak} onEvent={(eventType) => {
                switch (eventType) {
                    case 'onAuthRefreshError': {
                        const url = getCookie('redirectUrl');
                        void keycloak.logout({
                            redirectUri: url ?? keycloak.createLoginUrl()
                        });
                        void removeCookie('redirectUrl');
                        break;
                    }

                    case 'onReady':
                        if (!keycloak.authenticated) {
                            void keycloak.login();
                        }
                        break;

                    case 'onAuthSuccess':
                    case 'onAuthRefreshSuccess':
                        if (keycloak.token != null) {
                            rootStore.profileStore.setData(keycloak.token);
                        }
                        break;
                    case 'onAuthError':
                        console.log('onAuthError');
                        break;

                    case 'onAuthLogout':
                        rootStore.reset();
                        break;
                }
            }}
            >
                <RootStoreProvider value={rootStore}>
                    <MainBrowserRouter/>
                </RootStoreProvider>
            </ReactKeycloakProvider>
        </>
    );
}

export default App;