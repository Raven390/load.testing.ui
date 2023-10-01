import {Instance, types} from "mobx-state-tree";

export const RunTestCaseRequestModel = types.model("RunTestCaseRequestModel", {
    duration: types.string,
    parallelRequests: types.integer,
    jmxHost: types.maybeNull(types.string),
    jmxPort: types.maybeNull(types.integer)
});

export type IRunTestCaseRequestModel = Instance<typeof RunTestCaseRequestModel>;
