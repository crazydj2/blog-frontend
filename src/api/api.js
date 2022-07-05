
const address = 'http://132.226.16.67:8080';

const getQueryString = query => {
    let str = '';

    try {
        for (let key in query) {
            if (str.length > 0) {
                str += '&';
            }

            str += (key + '=' + query[key]);
        }
    } catch (e) {
        console.error(e);
        str = '';
    }

    return str;
};

export const fetchWrap = async (options) => {
    const { url, method, query, body, headers } = options;

    try {
        return (await fetch(`${address + url}?${getQueryString(query)}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        })).json();
    } catch (e) {
        console.error(e);
    }
};