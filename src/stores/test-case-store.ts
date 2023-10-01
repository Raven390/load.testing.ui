import {flow, Instance, SnapshotOut, types} from "mobx-state-tree";
import {ITestCaseModel, TestCaseModel} from "../models/api/TestCaseModel";
import {withRootStore} from "./extensions/with-root-store";
import {withEnvironment} from "./extensions/with-environment";
import {IMetricsModel, MetricsModel} from "../models/api/MetricsModel";
import {IRunTestCaseRequestModel, RunTestCaseRequestModel} from "../models/api/RunTestCaseRequestModel";


export const TestCasesModel = types
    .model("TestCaseStore")
    .props({
        isShowEditTestCaseModal: types.optional(types.boolean, false),
        isShowAddTestCaseModal: types.optional(types.boolean, false),
        isShowDeleteTestCaseModal: types.optional(types.boolean, false),
        isShowRunTestCaseModal: types.optional(types.boolean, false),
        currentTestCaseId: types.optional(types.string, ""),
        currentTestCaseMetrics: types.maybe(MetricsModel),
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
        showRunTestCaseModal() {
            self.isShowRunTestCaseModal = true;
        },
        hideRunTestCaseModal() {
            self.isShowRunTestCaseModal = false;
        },
    }))
    .actions((self) => ({
        reset() {
            self.currentTestCaseId = "";
            self.currentTestCaseMetrics = undefined;
        },
    }))
    .actions((self) => ({
        load: flow(function* () {
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
            const result = yield self.environment.testCaseApi.deleteTestCaseById(self.currentTestCaseId);
            if (result) {
                self.testCases.splice(0);
            }
        }),
        saveTestCase: flow(function* (testCase: ITestCaseModel) {
            yield self.environment.testCaseApi.saveTestCase(testCase);
        }),
        getMetricsData: flow(function* () {
            console.log("Get metrics data from store");
            const result = yield self.environment.testCaseApi.getMetricsData(self.currentTestCaseId);
            console.log(result.data);
            if (result) {
                let jsonData = result.data;
                self.currentTestCaseMetrics = MetricsModel.create({
                    memoryMetricsMap: {
                        init: jsonData.memoryMetricsMap.init.map((item: any) => ({
                            timestamp: Object.keys(item)[0], // Получаем дату-время из ключа
                            value: item[Object.keys(item)[0]],
                        })),
                        committed: jsonData.memoryMetricsMap.committed.map((item: any) => ({
                            timestamp: Object.keys(item)[0], // Получаем дату-время из ключа
                            value: item[Object.keys(item)[0]],
                        })),
                        max: jsonData.memoryMetricsMap.max.map((item: any) => ({
                            timestamp: Object.keys(item)[0], // Получаем дату-время из ключа
                            value: item[Object.keys(item)[0]],
                        })),
                        used: jsonData.memoryMetricsMap.used.map((item: any) => ({
                            timestamp: Object.keys(item)[0], // Получаем дату-время из ключа
                            value: item[Object.keys(item)[0]],
                        })),
                        // Повторите этот процесс для остальных полей (committed, max, used) при необходимости
                    },
                    responseStatusMetricMap: jsonData.responseStatusMetricMap,
                });
            }
        }),
        startTestCase: flow(function* (runTestCaseRequest: IRunTestCaseRequestModel) {
            yield self.environment.testCaseApi.startTestCase(self.currentTestCaseId, runTestCaseRequest);
        }),

    }));

export interface ITestCaseStore
    extends Instance<typeof TestCasesModel> {
}

export interface ICasesStoreSnapshot
    extends SnapshotOut<typeof TestCasesModel> {
}

export const createCasesStoreDefaultModel = () =>
    types.optional(TestCasesModel, {});