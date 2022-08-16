<h1>상세화면~~</h1>

{#if !!article.contents}
<ToastUIViewer initContents={article.contents}></ToastUIViewer>
{/if}

<script>

    import { getArticle } from '../../api/article.js';
    import { location } from 'svelte-spa-router';

    import ToastUIViewer from '../external-wrapper/ToastUIViewer.svelte';

    let article = {};

    const init = async () => {
        const _id = $location.split('/').pop();

        const response = await getArticle({ _id });

        if (response.success) {
            article = response.data[0];
            
            console.log(article);
        }
    };

    location.subscribe(() => {
        init();
	});
</script>