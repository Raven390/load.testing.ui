import {Instance, types} from "mobx-state-tree";

const HeaderMap = types.model("Header", {
    name: types.string,
    value: types.string,
})


export const TestCaseRequest = types.model("TestCaseRequest", {
    url: types.string,
    body: types.maybeNull(types.string),
    header: types.maybeNull(types.map(types.string)),
});



export type ITestCaseRequestModel = Instance<typeof TestCaseRequest>;
