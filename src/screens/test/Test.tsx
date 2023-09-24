import {Col, List, Row} from "antd";
import React from "react";
import {useStores} from "../../stores/root-store/root-store-context";
import {observer} from "mobx-react-lite";


export const TestScreen = observer(() => {
    const {testCaseStore: store,} = useStores();

    React.useEffect(() => {
        void store.load();
        return () => {
            store.reset();
        };


    }, []);

    return (
        <>
            <div style={{height: "600px"}}>
                <Row>
                    <Col span={8}>
                        <List
                            size="large"
                            header={<div>Header</div>}
                            footer={<div>Footer</div>}
                            bordered
                            dataSource={store.testCases}
                            renderItem={(item) => (
                                <List.Item
                                    key={item.id}
                                >
                                    {"TestCase: " + item.name}
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
});