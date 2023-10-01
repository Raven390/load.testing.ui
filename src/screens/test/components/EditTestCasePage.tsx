import {observer} from "mobx-react-lite";
import {useStores} from "../../../stores/root-store/root-store-context";
import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Select, Table} from "antd";
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";
import {ITestCaseModel} from "../../../models/api/TestCaseModel";
import {useNavigate} from "react-router-dom";
import {ROUTE} from "../../../common/routes";
import {useForm} from "antd/es/form/Form";
import {types} from "mobx-state-tree";

import {
    HTTP_METHOD_DELETE,
    HTTP_METHOD_GET, HTTP_METHOD_HEAD, HTTP_METHOD_OPTIONS,
    HTTP_METHOD_PATCH,
    HTTP_METHOD_POST,
    HTTP_METHOD_PUT, HTTP_METHOD_TRACE
} from "../../../common/constants";

const {TextArea} = Input;
const {Column, ColumnGroup} = Table;

export const TestCaseScreen = observer(() => {
    const navigate = useNavigate();
    const [form] = useForm();

    // Get the store and form using hooks
    const {testCaseStore: store} = useStores();
    const currentTestCase = store.getCurrentTestCase;


    // State to manage header data
    const [headerData, setHeaderData] = useState([]);

    const SelectHttpMethod = (
        <Select defaultValue={currentTestCase.testCaseRequest.method} options={[
            {value: HTTP_METHOD_GET, label: HTTP_METHOD_GET},
            {value: HTTP_METHOD_POST, label: HTTP_METHOD_POST},
            {value: HTTP_METHOD_PUT, label: HTTP_METHOD_PUT},
            {value: HTTP_METHOD_PATCH, label: HTTP_METHOD_PATCH},
            {value: HTTP_METHOD_DELETE, label: HTTP_METHOD_DELETE},
            {value: HTTP_METHOD_HEAD, label: HTTP_METHOD_HEAD},
            {value: HTTP_METHOD_OPTIONS, label: HTTP_METHOD_OPTIONS},
            {value: HTTP_METHOD_TRACE, label: HTTP_METHOD_TRACE}
        ]}>
        </Select>
    );

    // Effect to populate form fields when the currentTestCase changes
    useEffect(() => {
        if (currentTestCase) {
            form.setFields([
                {
                    name: "name",
                    value: currentTestCase.name,
                },
                {
                    name: "method",
                    value: currentTestCase.testCaseRequest.method,
                },
                {
                    name: "url",
                    value: currentTestCase.testCaseRequest.url
                },
                {
                    name: "body",
                    value: currentTestCase.testCaseRequest.body,
                },
            ]);
        }
    }, [currentTestCase]);

    // Effect to update headerData when the currentTestCase changes
    useEffect(() => {
        if (currentTestCase) {
            setHeaderData(
                Array.from(currentTestCase.testCaseRequest.header.entries()).map(
                    ([key, value]) => ({
                        key,
                        value,
                    })
                )
            );
        }
    }, [currentTestCase]);

    // Handle form submission
    const onFinish = async (values) => {
        // Create updatedHeaderData object
        const updatedHeaderData = headerData.reduce((acc, {key, value}) => {
            acc[key] = value;
            return acc;
        }, {});

        // Create updatedHeader using mobx-state-tree
        const updatedHeader = types.map(types.string).create(updatedHeaderData);

        // Create updated test case object
        const updatedTestCase: ITestCaseModel = {
            id: currentTestCase.id,
            name: values.name,
            testCaseRequest: {
                method: values.method,
                url: values.url,
                body: values.body,
                header: updatedHeader,
            },
        };

        console.log(updatedTestCase);

        // Save the updated test case and navigate
        await store.saveTestCase(updatedTestCase);
        navigate(ROUTE.test);
    };

    // Update header value in the state
    const updateHeaderValue = (index, field, newValue) => {
        const updatedHeaderData = [...headerData];
        updatedHeaderData[index] = {
            ...updatedHeaderData[index],
            [field]: newValue,
        };
        console.log(updatedHeaderData);
        setHeaderData(updatedHeaderData);
    };

    // Add a new header row to the state
    const addHeaderRow = () => {
        setHeaderData([...headerData, {key: "", value: ""}]);
    };

    // Remove a header row from the state
    const removeHeaderRow = (index) => {
        const updatedHeaderData = [...headerData];
        updatedHeaderData.splice(index, 1);
        setHeaderData(updatedHeaderData);
    };

    //Validate json
    const validateJson = (text) => {
        if (typeof text !== "string") {
            return false;
        }
        try {
            let json = JSON.parse(text);
            return (typeof json === 'object');
        } catch (error) {
            return false;
        }
    }


    return (
        <>
            <div style={{marginTop: "20px", display: "flex", justifyContent: "center"}}>
                <Form layout="vertical" size="middle" style={{minWidth: "75%"}} onFinish={onFinish} form={form}>
                    <Col span={14} offset={5}>
                        {/* Form fields for test case information */}
                        <Form.Item label={"Название тест кейса"} labelCol={{span: 10}} name="name" rules={[
                            {
                                required: true,
                                message: 'Название тест кейса не заполнено!'
                            }
                        ]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Метод"} name="method" rules={[{required: true, message: "Не указан метод!"}]}>
                            {SelectHttpMethod}
                        </Form.Item>
                        <Form.Item label={"URL"} name="url" rules={[
                            {
                                required: true,
                                message: 'Поле URL не заполнено!'
                            }
                        ]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={"Тело запроса"} name="body" rules={[
                            {
                                required: false,
                            },
                            {
                                validator: (_, value) => {
                                    if (validateJson(value)) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject('Введенный JSON некорректен')
                                    }
                                }
                            }
                        ]}>
                            <TextArea autoSize onBlur={() => {
                                console.log("On blur");
                                form.setFieldValue("body", JSON.stringify(JSON.parse(form.getFieldValue("body")), null, 2));
                            }
                            }/>
                        </Form.Item>
                        {/* Table for managing headers */}
                        <Form.Item name="header">
                            <Table dataSource={headerData} rowKey={(record, index) => index}
                                   pagination={false}
                                   footer={() => (
                                       <Button type="primary" onClick={addHeaderRow} block>
                                           Добавить заголовок
                                       </Button>
                                   )}>
                                <ColumnGroup title="Заголовки запроса">
                                    <Column
                                        title="Имя заголовка"
                                        dataIndex="key"
                                        key="key"
                                        render={(text, record: { key: string; value: string }, index) => (
                                            <Input
                                                value={text}
                                                onChange={(e) => updateHeaderValue(index, "key", e.target.value)}
                                                key={index}
                                            />
                                        )}
                                    />
                                    <Column
                                        title="Значение заголовка"
                                        dataIndex="value"
                                        key="value"
                                        render={(text, record: { key: string; value: string }, index) => (
                                            <Input
                                                value={text}
                                                onChange={(e) => updateHeaderValue(index, "value", e.target.value)}
                                                key={index}
                                            />
                                        )}
                                    />
                                    <Column
                                        key="action"
                                        render={(text, record, index) => (
                                            <Button type="link" onClick={() => removeHeaderRow(index)}
                                                    icon={<CloseOutlined/>}>
                                            </Button>
                                        )}
                                    />
                                </ColumnGroup>
                            </Table>
                        </Form.Item>
                        {/* Save button */}
                        <Button
                            type="primary"
                            shape="round"
                            icon={<SaveOutlined/>}
                            size="middle"
                            style={{marginLeft: "40%"}}
                            htmlType="submit"
                        >
                            Сохранить
                        </Button>
                    </Col>
                </Form>
            </div>
        </>
    );
});
