import {Col, List, Row} from "antd";
import React from "react";
import {useStores} from "../../stores/root-store/root-store-context";
import {observer} from "mobx-react-lite";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons"
import {DeleteTestCaseModal} from "./components/DeleteTestCaseModal";


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
            <div style={{height: "600px", marginTop: "20px"}}>
                <Row>
                    <Col span={24}>
                        <List
                            size="large"
                            header={<div>Тесты</div>}
                            footer={<div>Всего {store.testCases.length}</div>}
                            bordered
                            dataSource={store.testCases}
                            renderItem={(item) => (
                                <List.Item key={item.id}
                                           actions={[<a href={`/test/edit/${item.id}`}><EditOutlined style={{fontSize: "18px"}}/></a>,
                                               <a><DeleteOutlined style={{fontSize: "18px"}} onClick={() => {
                                                       store.setCurrentTestCaseId(item.id);
                                                       store.showDeleteTestCaseModal();
                                                    }
                                               }/></a>]}>
                                    <List.Item.Meta
                                        title={<a href={`/test/${item.id}`}>{item.name}</a>}
                                        description={item.testCaseRequest.url != null ? item.testCaseRequest.url : "No request"}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
                <DeleteTestCaseModal/>
            </div>
        </>
    );
});