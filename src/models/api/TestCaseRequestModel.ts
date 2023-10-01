import {Instance, types} from "mobx-state-tree";

export const TestCaseRequest = types.model("TestCaseRequest", {
    method: types.string,
    url: types.string,
    body: types.maybeNull(types.string),
    header: types.maybeNull(types.map(types.string)),
});

export type ITestCaseRequestModel = Instance<typeof TestCaseRequest>;
