import {Instance, types} from "mobx-state-tree";
import {TestCaseRequest} from "./TestCaseRequestModel";

export const TestCaseModel = types.model("TestCase", {
    id: types.string,
    name: types.string,
    testCaseRequest: types.maybeNull(TestCaseRequest),
});

export type ITestCaseModel = Instance<typeof TestCaseModel>;
