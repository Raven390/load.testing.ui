import {observer} from "mobx-react-lite";
import {useStores} from "../../../stores/root-store/root-store-context";
import {Button, Col, Form, Input, Modal, Select, Table} from "antd";
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {useForm} from "antd/es/form/Form";
import { v4 as uuid } from 'uuid';

import {
    HTTP_METHOD_DELETE,
    HTTP_METHOD_GET, HTTP_METHOD_HEAD, HTTP_METHOD_OPTIONS,
    HTTP_METHOD_PATCH,
    HTTP_METHOD_POST,
    HTTP_METHOD_PUT, HTTP_METHOD_TRACE
} from "../../../common/constants";

import {types} from "mobx-state-tree";
import {ITestCaseModel} from "../../../models/api/TestCaseModel";
import {ROUTE} from "../../../common/routes";


const {TextArea} = Input;
const {Column, ColumnGroup} = Table;


export const AddTestCaseModal = observer(() => {
    const [form] = useForm();
    const {testCaseStore: store} = useStores();

    // State to manage header data
    const [headerData, setHeaderData] = useState([]);

    const SelectHttpMethod = (
        <Select defaultValue={HTTP_METHOD_GET} options={[
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

    const onCancel = () => {
        store.hideAddTestCaseModal();
    };


    const onOk = async (values) => {
        // Create updatedHeaderData object
        const updatedHeaderData = headerData.reduce((acc, {key, value}) => {
            acc[key] = value;
            return acc;
        }, {});

        // Create updatedHeader using mobx-state-tree
        const updatedHeader = types.map(types.string).create(updatedHeaderData);

        // Create updated test case object
        const createdTestCase = {
            id: uuid(),
            name: values.name,
            testCaseRequest: {
                method: values.method,
                url: values.url,
                body: values.body,
                header: updatedHeader,
            },
        };


        console.log(createdTestCase);

        // Save the updated test case and navigate
        await store.saveTestCase(createdTestCase);
        await store.load();
        store.hideAddTestCaseModal();
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
            return true;
        }
        try {
            let json = JSON.parse(text);
            return (typeof json === 'object');
        } catch (error) {
            return false;
        }
    }

    return (
        <Modal
            width={"80vh"}
            title="Создание тест кейса"
            open={store.isShowAddTestCaseModal}
            onCancel={onCancel}
            footer={null}
        >
            <div style={{marginTop: "20px", display: "flex", justifyContent: "center"}}>
                <Form layout="vertical" size="middle" style={{minWidth: "100%"}}  onFinish={onOk} form={form}>
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
                        <Form.Item label={"Метод"} name="method" rules={[{required: true, message: "Не указан метод!"}]} initialValue={HTTP_METHOD_GET}>
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
                                form.setFieldValue("body", form.getFieldValue("body") !== "" && form.getFieldValue("body") !== undefined ? JSON.stringify(JSON.parse(form.getFieldValue("body")), null, 2) : "");
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
                    </Col>
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
                </Form>
            </div>
        </Modal>
    );
})