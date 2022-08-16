<div class="article-list-item-cell-container">
    <div class="article-list-item-cell-image-box">
        <img alt="..." src={image} on:error={() => {image = defaultImage}} on:click={moveDetail} />
    </div>

    <div class="article-list-item-cell-text-box">
        <div>
            <h3 style="color: greenyellow;" on:click={moveDetail}>{article.title}</h3>
            <p on:click={moveDetail}>{contents}{@html '...'}</p>
            <span>{created}</span>
        </div>
    </div>
</div>
    
<script>
    import { location, push } from 'svelte-spa-router';

    import { makeSummeryFromMarkdown, getArticleCreated } from '../../utils/common.js'

    export let article;

    let defaultImage = 'https://static-cdn.jtvnw.net/jtv_user_pictures/dde955e8-5fae-44dc-98db-79b3b14afea2-profile_image-70x70.png';
    let image = defaultImage;
    let contents = 'Contents....';
    let created = '';

    const moveDetail = () => {
        push(`${decodeURIComponent($location)}/${article._id}`);
    };

    $: {
        const result = makeSummeryFromMarkdown(article.contents);

        image = result.image || defaultImage;
        contents = result.summery || 'Contents....';
        created = getArticleCreated(article.created) || '';
    };
</script>
    
<style>
    .article-list-item-cell-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: var(--mdc-theme-surface, #212125);
        color: var(--mdc-theme-on-surface, #fff);
    }

    .article-list-item-cell-image-box {
        width: 100%; 
        padding-top: 100%; 
        position: relative;
    }

    .article-list-item-cell-image-box img{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        cursor: pointer;
    }

    .article-list-item-cell-text-box {
        width: 100%;
    }

    .article-list-item-cell-text-box > div{
        padding: 1rem;
        display: flex;
        flex: 1 1 0%;
        flex-direction: column;
    }

    .article-list-item-cell-text-box h3 {
        color: greenyellow;
        margin-top: 0;
        cursor: pointer;
    }

    .article-list-item-cell-text-box p {
        margin: 0px 0px 1.5rem;
        word-break: break-word;
        overflow-wrap: break-word;
        font-size: 0.875rem;
        line-height: 1.5;
        height: 3.9375rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    .article-list-item-cell-text-box span {
        font-size: 0.75rem;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.6);
    }
</style>
    