
import { fetchWrap } from './api.js'

export const getArticle = async query => {
    return await fetchWrap({
        url: '/article',
        method: 'GET',
        query
    });
};

export const postArticle = async body => {
    return await fetchWrap({
        url: '/article',
        method: 'POST',
        body
    });
};

export const patchArticle = async body => {
    return await fetchWrap({
        url: '/article',
        method: 'PATCH',
        body
    });
};

export const deleteArticle = async body => {
    return await fetchWrap({
        url: '/article',
        method: 'DELETE',
        body
    });
}; 