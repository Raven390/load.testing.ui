import {flow, Instance, SnapshotOut, types} from "mobx-state-tree";
import {TestCaseModel} from "../models/api/TestCaseModel";
import {withRootStore} from "./extensions/with-root-store";
import {withEnvironment} from "./extensions/with-environment";


export const TestCasesModel = types
    .model("TestCaseStore")
    .props({
        isShowEditTestCaseModal: types.optional(types.boolean, false),
        isShowAddTestCaseModal: types.optional(types.boolean, false),
        isShowDeleteTestCaseModal: types.optional(types.boolean, false),
        currentTestCaseId: types.optional(types.string, ""),
        testCases: types.optional(types.array(TestCaseModel), []),
    })
    .extend(withRootStore)
    .extend(withEnvironment)
    .views((self) => ({
        get getCurrentTestCase() {
            return self.testCases.find((v) => v.id === self.currentTestCaseId);
        },
    }))
    .actions((self) => ({
        setCurrentTestCaseId(id: string) {
            self.currentTestCaseId = id;
        },
        showEditTestCaseModal() {
            self.isShowEditTestCaseModal = true;
        },
        hideEditTestCaseModal() {
            self.isShowEditTestCaseModal = false;
        },
        showAddTestCaseModal() {
            self.isShowAddTestCaseModal = true;
        },
        hideAddTestCaseModal() {
            self.isShowAddTestCaseModal = false;
        },
        showDeleteTestCaseModal() {
            self.isShowDeleteTestCaseModal = true;
        },
        hideDeleteTestCaseModal() {
            self.isShowDeleteTestCaseModal = false;
        },
    }))
    .actions((self) => ({
        reset() {
            self.currentTestCaseId = "";
        },
    }))
    .actions((self) => ({
        load: flow(function* () {
            console.log("Load test case store")
            self.reset();
            self.testCases.splice(0);

            const result = yield self.environment.testCaseApi.getAllTestCases();
            console.log(result.data);
            if (result) {
                result.data.forEach((vm: JSON) => {
                    self.testCases.push(
                        TestCaseModel.create(JSON.parse(JSON.stringify(vm)))
                    );
                });
                console.log(self.testCases);
            }
        }),
        deleteTestCase: flow(function* () {
            console.log("Delete test case by id: " + self.currentTestCaseId);
            const result = yield self.environment.testCaseApi.deleteTestCaseById(self.currentTestCaseId);
            console.log(result.data);
            if (result) {
                self.testCases.splice(0);
            }
        }),

    }));

export interface ITestCaseStore
    extends Instance<typeof TestCasesModel> {}
export interface ICasesStoreSnapshot
    extends SnapshotOut<typeof TestCasesModel> {}
export const createCasesStoreDefaultModel = () =>
    types.optional(TestCasesModel, {});