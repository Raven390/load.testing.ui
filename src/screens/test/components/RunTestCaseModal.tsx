import {observer} from "mobx-react-lite";
import {Button, Form, Input, InputNumber, Modal, Switch} from "antd";
import {useStores} from "../../../stores/root-store/root-store-context";
import React, {useEffect, useState} from "react";
import {useForm} from "antd/es/form/Form";
import {CaretRightOutlined} from '@ant-design/icons';
import {types} from "mobx-state-tree";
import {string} from "mobx-state-tree/dist/types/primitives";
import {IRunTestCaseRequestModel} from "../../../models/api/RunTestCaseRequestModel";


export const RunTestCaseModal = observer(() => {
    const {testCaseStore: store} = useStores();
    const [form] = useForm();

    const [metricsEnabled, setMetricsEnabled] = useState(false);



    const onSwitchChanged = (state) => {
        setMetricsEnabled(state);
    }
    const handleApply = () => {
        // Преобразование выбранной продолжительности в формат PTxM

    };

    useEffect(() => {
        if (store.currentTestCaseId) {
        }
    }, [store.currentTestCaseId]);

    const onCancel = () => {
        store.hideRunTestCaseModal();
        form.resetFields();
    };

    const onFinish = async (values) => {

        // Create updated test case object
        const runTestCaseRequest: IRunTestCaseRequestModel = {
            duration: `PT${values.duration}M`,
            parallelRequests: values.parallelRequests,
            jmxHost: values.jmxHost,
            jmxPort: values.jmxPort
        };


        console.log(runTestCaseRequest);

        // Save the updated test case and navigate
        await store.startTestCase(runTestCaseRequest);
        store.hideRunTestCaseModal();
    };


    return (
        <Modal
            title="Запуск нагрузочного тестирования"
            open={store.isShowRunTestCaseModal}
            cancelText="Отмена"
            okText="Запустить"
            onCancel={onCancel}
            footer={false}
        >
            <div>
                <Form layout="vertical" size="middle" style={{minWidth: "100%"}}  onFinish={onFinish} form={form}>
                    <Form.Item name="duration" label="Продолжительность (мин)">
                        <InputNumber
                            min={0}
                            step={1}
                        />
                    </Form.Item>
                    <Form.Item name="parallelRequests" label="Количество потоков">
                        <InputNumber
                            min={0}
                            step={10}
                        />
                    </Form.Item>
                    <Form.Item label="Сбор метрик">
                        <Switch defaultChecked={false} onChange={onSwitchChanged}/>
                    </Form.Item>
                    <Form.Item name="jmxHost" label="Целевой JXM хост">
                        <Input disabled={!metricsEnabled}/>
                    </Form.Item>
                    <Form.Item name="jmxPort" label="Целевой JMX порт">
                        <Input disabled={!metricsEnabled}/>
                    </Form.Item>
                    <Button
                        type={"primary"}
                        shape="default"
                        size="middle"
                        style={{marginLeft: "auto"}}
                        htmlType="submit"
                    >
                        Запустить
                    </Button>
                </Form>
            </div>

        </Modal>
    );
})