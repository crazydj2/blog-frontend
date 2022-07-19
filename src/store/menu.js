import { writable } from 'svelte/store';
import { getMenu } from '../api/menu.js';

const { subscribe, set } = writable([]);

const getMenuTree = data => {
    const result = [];

    data.map(target => {
        // 부모 걸기
        if (target.parent) {
            target.parent = data.filter(t => t._id === target.parent)[0];
        } else {
            result.push(target);
        }

        // 자식들 걸기
        if (target.children?.length > 0) {
            target.children = data.filter(t => target.children.includes(t._id));
        }
    });

    return result;
};

const reset = async () => {
    const response = await getMenu();
    if (response && response.data) {
        set(getMenuTree(response.data));
    }
};

export default menu = { subscribe, reset };