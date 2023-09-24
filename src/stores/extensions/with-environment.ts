import {getEnv, IStateTreeNode} from "mobx-state-tree";
import {Environment} from "../environment";

export const withEnvironment = (self: IStateTreeNode) => ({
    views: {
        /**
         * The environment.
         */
        get environment() {
            return getEnv<Environment>(self);
        },
    },
});