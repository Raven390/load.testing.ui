import React from 'react';
import {RootStore} from './root-store';

/**
 * Create a context we can use to
 * - Provide access to our stores from our root component
 * - Consume stores in our screens (or other components, though it's
 *   preferable to just connect screens)
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const RootStoreContext = React.createContext<RootStore>({} as RootStore);

/**
 * The provider our root component will use to expose the root store
 */
export const RootStoreProvider = RootStoreContext.Provider;

/**
 * A hook that screens can use to gain access to our stores, with
 * `const { someStore, someOtherStore } = useStores()`,
 * or less likely: `const rootStore = useStores()`
 */
export const useStores = (): RootStore => React.useContext(RootStoreContext);
