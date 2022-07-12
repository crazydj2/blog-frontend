<div class="article-list-item-cell-container">
    <div class="article-list-item-cell-image-box">
        <img alt="..." src={image} on:error={() => {image = defaultImage}}/>
    </div>

    <div class="article-list-item-cell-text-box">
        <div>
            <h3 style="color: greenyellow;">{title}</h3>
            <p>{contents}{@html '...'}</p>
            <span>{created}</span>
        </div>
    </div>
</div>
    
<script>
    export let article;

    let defaultImage = 'https://static-cdn.jtvnw.net/jtv_user_pictures/dde955e8-5fae-44dc-98db-79b3b14afea2-profile_image-70x70.png';
    let image = defaultImage;
    let title = article?.title || 'Title...';
    let contents = 'Contents....';
    let created = '2022년 7월 7일';

    // article.contents 내에서 첫번째 이미지 src 추출해서 image 로 설정
    const reg = new RegExp(/(<img[^>]+src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/, 'i');
    image = reg.exec(article.contents)[2] || defaultImage;
    
    // <img>, <h1~5>, <div>, <blockquote>, <table>, <code> 은 그냥 빈스트링으로 replace
    // <br>, <li> 는 ' ' 로 replace
    // 나머지 태그들 - <~> 전부 빈스트링으로 replace
    contents = article.contents
        .replace(/(<img[^>]*>)|(<h1[^>]*>.*<\/h1>)|(<h2[^>]*>.*<\/h2>)|(<h3[^>]*>.*<\/h3>)|(<h4[^>]*>.*<\/h4>)|(<h5[^>]*>.*<\/h5>)|(<h6[^>]*>.*<\/h6>)|(<div[^>]*>(?!<div).+?<\/div>)|(<blockquote[^>]*>(?!<blockquote).+?<\/blockquote>)|(<table[^>]*>(?!<table).+?<\/table>)|(<code[^>]*>(?!<code).+?<\/code>)/gi, '')
        .replace(/(<br[^>]*>)|(<li[^>]*>)/gi, ' ')
        .replace(/<[^>]*>?/gi, '');
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
    }

    .article-list-item-cell-text-box span {
        font-size: 0.75rem;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.6);
    }
</style>
    