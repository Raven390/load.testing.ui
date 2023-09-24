import {flow, Instance, SnapshotOut, types} from "mobx-state-tree";
import {TestCasesModel} from "../test-case-store";
import {clearAll} from "../../services/clientStorage";
import {ProfileStoreModel} from "../profile-store";
import {withEnvironment} from "../extensions/with-environment";


export const RootStoreModel = types
    .model("RootStore")
    .props({
        isLoaded: types.optional(types.boolean, false),
        testCaseStore: types.optional(
            types.late(() => TestCasesModel),
            {}
        ),
        profileStore: types.optional(
            types.late(() => ProfileStoreModel),
            {}
        ),
    })
    .extend(withEnvironment)
    .actions(self => ({
        reset() {
            void clearAll();
            self.profileStore = ProfileStoreModel.create({});
            self.testCaseStore = TestCasesModel.create({});
        },
    }))
    .actions((self) => ({
        afterCreate: flow(function* () {
            self.isLoaded = true;
        }),
    }));

export interface RootStore extends Instance<typeof RootStoreModel> {
}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {
}