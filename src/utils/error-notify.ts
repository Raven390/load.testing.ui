import {notification} from "antd";

export const errorNotify = (message?: string) => {
    notification.error({
        message: message ?? "Произошла непредвиденная ошибка",
        placement: "topRight",
        duration: 3,
    });
};