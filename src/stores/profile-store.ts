import {Instance, SnapshotOut, types} from "mobx-state-tree";
import {parseJwt} from "../utils/parse-jwt";
import {setCookie} from "../services/clientStorage";
import keycloak from "../services/keycloak";


export const ProfileStoreModel = types
    .model('ProfileStore')
    .props({
        user: types.maybe(types.model({
            objectId: types.string,
            shortName: types.string
        })),
        roles: types.optional(types.array(types.string), [])
    })
    .views(self => ({
        get userShortName() {
            return self.user?.shortName;
        },
        get userObjectId() {
            return self.user?.objectId;
        },
        isInRole(role: string) {
            return self.roles.includes(role);
        },
    }))
    .actions(self => ({
        setData(jwtToken: string) {
            const userJson = parseJwt(jwtToken);
            console.log(userJson);
            void setCookie('redirectUrl', keycloak.createLogoutUrl());
            self.user = {
                objectId: userJson.sub,
                shortName: userJson.preferred_username
            };
            console.log(self.user);
            self.roles = userJson?.realm_access?.roles ?? [];
        }
    }));

export interface IProfileStore extends Instance<typeof ProfileStoreModel> {
}

export interface IProfileStoreSnapshot
    extends SnapshotOut<typeof ProfileStoreModel> {
}

export const createProfileStoreDefaultModel = () =>
    types.optional(ProfileStoreModel, {});