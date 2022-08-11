<LayoutGrid>
    <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}>
        <div><h1>menu > menu > menu > ......~</h1></div>
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

    import { onMount } from 'svelte';
    import { getArticle } from '../../api/article.js';

    let articles = [];

	onMount(() => {
		getArticle().then(response => {
            console.log(response);

            if (response.success) {
                articles = response.data;
            }
        });
	});
</script>