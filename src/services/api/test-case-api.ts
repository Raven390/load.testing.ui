import {ApiResponse, ApisauceInstance, create} from 'apisauce';
import {API_URL} from "../../common/constants";
import keycloak from "../keycloak";
import {DefaultResponse} from "../../models/api/DefaultResponse";
import {ITestCaseModel} from "../../models/api/TestCaseModel";
import {stringify} from "querystring";
import {IMetricsModel} from "../../models/api/MetricsModel";
import {IRunTestCaseRequestModel} from "../../models/api/RunTestCaseRequestModel";


export class TestCaseApi {
    apisauce!: ApisauceInstance;

    setup() {
        // construct the apisauce instance
        this.apisauce = create({
            baseURL: API_URL,
            headers: {
                'Cache-Control': 'no-cache',
                Accept: 'application/json',
            }
        });

        this.apisauce.axiosInstance.interceptors.request.use(
            (config) => {
                console.log(keycloak.token)
                config.headers.Authorization = `Bearer ${keycloak.token}`;

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.apisauce.axiosInstance.interceptors.response.use(
            response => response,
            async (error: any) => {
                const originalReq = error.config;
                if (
                    error.response.status === 401 &&
                    error.config &&
                    !error.config._retry
                ) {
                    console.log("401 ERROR processing");
                    originalReq._retry = true;
                    try {
                        await keycloak.updateToken(5);
                        if (keycloak.authenticated && keycloak.token != null) {
                            console.log(keycloak.token);
                            originalReq.headers.Authorization = `Bearer ${keycloak.token}`;
                            return await this.apisauce.any(error.response.config);
                        } else {
                            return await Promise.reject(error);
                        }
                    } catch (e) {
                        console.log('refreshAuthToken', e);
                    }
                    return await Promise.reject(error);
                }
            }
        )
    }

    async getAllTestCases() {
        type TestCaseResponse = Omit<DefaultResponse, "data"> & {
            data: ITestCaseModel[];
        };

        const response: ApiResponse<any> = await this.apisauce.get<TestCaseResponse>("test/");

        if (!response.ok) {
            return response.status;
        }


        return response.data;
    }

    async deleteTestCaseById(id: string) {
        type TestCaseResponse = Omit<DefaultResponse, "data"> & {
            data: ITestCaseModel[];
        };

        const response: ApiResponse<any> = await this.apisauce.delete<TestCaseResponse>(`/test/delete/${id}`)

        if (!response.ok) {
            return response.status;
        }
        return response.data;
    }

    async saveTestCase(testCase: ITestCaseModel) {
        type TestCaseResponse = Omit<DefaultResponse, "data"> & {
            data: ITestCaseModel[];
        };

        let body = JSON.stringify(testCase);
        console.log(body);

        const response: ApiResponse<any> = await this.apisauce.post<TestCaseResponse>(`/test/save`, testCase);

        if (!response.ok) {
            return response.status;
        }
        return response.data;
    }

    async getMetricsData(testCaseId: string) {
        console.log("Sending GET Metrics request: " + testCaseId);
        type TestCaseResponse = Omit<DefaultResponse, "data"> & {
            data: IMetricsModel[];
        };

        const response: ApiResponse<any> = await this.apisauce.get<TestCaseResponse>(`test/${testCaseId}/metrics`);
        console.log(response.data);
        if (!response.ok) {
            return response.status;
        }

        return response.data;
    }

    async startTestCase(id: string, startTestCaseRequest: IRunTestCaseRequestModel) {
        type TestCaseResponse = Omit<DefaultResponse, "data"> & {
            data: string;
        };

        let body = JSON.stringify(startTestCaseRequest);
        console.log(body);

        const response: ApiResponse<any> = await this.apisauce.post<TestCaseResponse>(`/test/start/${id}`, startTestCaseRequest);

        if (!response.ok) {
            return response.status;
        }
        return response.data;
    }
}