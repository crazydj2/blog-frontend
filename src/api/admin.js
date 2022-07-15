
import { fetchWrap } from './api.js'

export const postAdmin = async body => {
    return await fetchWrap({
        url: '/admin',
        method: 'POST',
        body
    });
};