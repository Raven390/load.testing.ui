import {observer} from "mobx-react-lite";
import {Modal} from "antd";
import {useStores} from "../../../stores/root-store/root-store-context";
import {useEffect} from "react";


export const DeleteTestCaseModal = observer(() => {
    const {testCaseStore: store} = useStores();

    useEffect(() => {
        if (store.currentTestCaseId) {
        }
    }, [store.currentTestCaseId]);

    const onCancel = () => {
        store.hideDeleteTestCaseModal();
    };

    const onClick = () => {
        if (store.currentTestCaseId) {
            void store.deleteTestCase();
            void store.load();
        }
        store.hideDeleteTestCaseModal();
    };

    return (
        <Modal
            title="Удаление тест кейса"
            open={store.isShowDeleteTestCaseModal}
            cancelText="Отмена"
            okText="Удалить"
            okButtonProps={{ style: { backgroundColor: 'red' } }}
            onCancel={onCancel}
            onOk={onClick}
        >
            <p>Вы уверены что вы хотите удалить этот тест кейс?</p>

        </Modal>
    );
})