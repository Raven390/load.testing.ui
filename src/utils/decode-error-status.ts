export type ErrorStatusType = 400 | 401 | 403 | 404 | 500

export const decodeErrorStatus = (errorStatus: ErrorStatusType): string => {
    switch (errorStatus) {
        case 400:
            return 'Некорректный запрос.';
        case 401:
            return 'Ошибка авторизации.';
        case 403:
            return 'Доступ запрещен.';
        case 404:
            return 'Запись не найдена.';
        case 500:
            return 'Внутренняя ошибка работы сервиса.';
    }
};