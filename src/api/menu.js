
import { fetchWrap } from './api.js'

export const getMenu = async query => {
    return await fetchWrap({
        url: '/menu',
        method: 'GET',
        query
    });
};

export const postMenu = async body => {
    return await fetchWrap({
        url: '/menu',
        method: 'POST',
        body
    });
};

export const patchMenu = async body => {
    return await fetchWrap({
        url: '/menu',
        method: 'PATCH',
        body
    });
};

export const deleteMenu = async body => {
    return await fetchWrap({
        url: '/menu',
        method: 'DELETE',
        body
    });
}; 