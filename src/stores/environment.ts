import {TestCaseApi} from "../services/api/test-case-api";

/**
 * The environment is a place where services and shared dependencies
 * between models live. They are made available to every model
 * svia dependency injection.
 */
export class Environment {
    constructor() {
        this.testCaseApi = new TestCaseApi();
    }

    async setup() {
        await this.testCaseApi.setup();
    }

    /**
     * Our api.
     */
    testCaseApi: TestCaseApi;
}
