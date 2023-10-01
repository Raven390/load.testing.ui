import {Col, List, Row} from "antd";
import React from "react";
import {useStores} from "../../stores/root-store/root-store-context";
import {observer} from "mobx-react-lite";
import {CaretRightOutlined, DeleteOutlined, EditOutlined, PlusOutlined, StopFilled} from "@ant-design/icons"
import {DeleteTestCaseModal} from "./components/DeleteTestCaseModal";
import {useNavigate} from "react-router-dom";
import {ROUTE} from "../../common/routes";
import {AddTestCaseModal} from "./components/AddTestCaseModal";
import {RunTestCaseModal} from "./components/RunTestCaseModal";


export const TestScreen = observer(() => {
    const {testCaseStore: store,} = useStores();

    React.useEffect(() => {
        store.load();
    }, []);

    let navigate = useNavigate();

    return (
        <>
            <div style={{height: "600px", marginTop: "20px"}}>
                <Row>
                    <Col span={24}>
                        <List
                            size="large"
                            header={
                                <div style={{display: "flex", alignItems: "center"}}>
                                    Тесты
                                    <div style={{marginLeft: "auto"}}>
                                        <a><PlusOutlined style={{fontSize: "18px"}} onClick={() => {
                                            store.showAddTestCaseModal();
                                        }
                                        }/></a>
                                    </div>
                                </div>
                            }
                            footer={<div>Всего {store.testCases.length}</div>}
                            bordered
                            dataSource={store.testCases}
                            renderItem={(item) => (
                                <List.Item key={item.id}
                                           actions={[
                                               <a>
                                                   <CaretRightOutlined style={{fontSize: "18px", color: "green"}} onClick={() => {
                                                       store.setCurrentTestCaseId(item.id);
                                                       store.showRunTestCaseModal();
                                                   }
                                                   }/>
                                               </a>,
                                               <a>
                                                   <StopFilled style={{fontSize: "18px", color: "red",}}/>
                                               </a>,
                                               <a>
                                                   <EditOutlined style={{fontSize: "18px"}} onClick={() => {
                                                       store.setCurrentTestCaseId(item.id);
                                                       navigate(ROUTE.editTestCase);
                                                   }
                                                   }/>
                                               </a>,
                                               <a>
                                                   <DeleteOutlined style={{fontSize: "18px"}} onClick={() => {
                                                       store.setCurrentTestCaseId(item.id);
                                                       store.showDeleteTestCaseModal();
                                                   }
                                                   }
                                                   />
                                               </a>
                                           ]}>
                                    <List.Item.Meta
                                        title={<a onClick={() => {
                                            store.setCurrentTestCaseId(item.id);
                                            let get = store.getMetricsData();
                                            get.then(() => navigate(ROUTE.viewTestCase));
                                        }}>{item.name}</a>}
                                        description={item.testCaseRequest.url != null ? item.testCaseRequest.url : "No request"}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
                <DeleteTestCaseModal/>
                <AddTestCaseModal/>
                <RunTestCaseModal/>
            </div>
        </>
    );
});