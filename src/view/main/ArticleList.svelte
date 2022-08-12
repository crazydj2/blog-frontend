<LayoutGrid>
    <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}>
        <div><h1>{getAllMenuName(articles)}</h1></div>
    </Cell>
    {#each articles as article, i}
    <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 4 }}>
        <ArticleListItem article={article}></ArticleListItem>
    </Cell>
    {/each}
</LayoutGrid>

<script>
    import LayoutGrid, { Cell } from '@smui/layout-grid';

    import ArticleListItem from '../child/ArticleListItem.svelte';

    import { getArticle } from '../../api/article.js';
    import { location } from 'svelte-spa-router';
    import menu from '../../store/menu.js';

    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    let articles = [];

	const getMenusByUrl = () => {
		const names = decodeURIComponent($location).split('/');

		let result = [];
		let tempMenus = $menu;

		while (names.length > 0) {
			const name = names.shift();

			for (let i = 0; i < tempMenus.length; i++) {
				if (tempMenus[i].name === name) {
					result.push(tempMenus[i]);
					tempMenus = tempMenus[i].children;
					break;
				}
			}
		}

		return result;
	};

    const init = async () => {
        let parentMenu = getMenusByUrl().pop();

        if (!parentMenu) {
            return;
        }

        const response = await getArticle({ parent: parentMenu?._id });

        if (response.success) {
            articles = response.data;

            dispatch('routeEvent', { name: 'moveTopMain' });
        }
    };

    menu.subscribe(() => {
		init();
	});

    location.subscribe(() => {
        init();
	});

    const getAllMenuName = () => {
        // articles;
        
        return getMenusByUrl().reduce((acc, cur) => {
            if (acc !== '') {
                acc += ' > '
            }

            return acc + cur.name;
        }, '');
    };
</script>