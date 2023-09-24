export const getItem = (name: string) => {
    const data = window.localStorage.getItem(name);
    return data ? JSON.parse(data) : undefined;
};

export const removeItem = (name: string) =>
    window.localStorage.removeItem(name);

export const setItem = (name: string, value: string) => {
    if (value) {
        window.localStorage.setItem(name, JSON.stringify(value));
    }
};

export const clearAll = () => window.localStorage.clear();

export const getSessionItem = (name: string) => {
    const data = window.sessionStorage.getItem(name);
    return data ? JSON.parse(data) : undefined;
};

export const removeSessionItem = (name: string) =>
    window.sessionStorage.removeItem(name);

export const setSessionItem = (name: string, value: object) => {
    value ?
        window.sessionStorage.setItem(name, JSON.stringify(value))
        : window.sessionStorage.removeItem(name);
    const storageEvent =
        new StorageEvent('storage', { storageArea: sessionStorage });
    window.dispatchEvent(storageEvent);
};

export const getCookie = (name:string) => {
    const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\\.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


export const setCookie = async (
    name: string,
    value: string,
    options:any = {}
)=> {
    options = {
        path: '/',
        ...options
    };
    if (options?.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    for (const optionKey in options) {
        updatedCookie += `; ${optionKey}`;
        const optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += `= ${optionValue as string}`;
        }
    }

    document.cookie = updatedCookie;
}

export const removeCookie = async (name: string)=> {
    await setCookie(name, '', {
        'max-age': -1
    })
}