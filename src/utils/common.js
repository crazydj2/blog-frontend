
import MarkdownIt from 'markdown-it';

// article contents (html) 에서 image 및 summery 추출
const makeSummeryFromHtml = contents => {
    let image = '';
    let summery = '';

    try {
        // article.contents 내에서 첫번째 이미지 src 추출해서 image 로 설정
        const reg = new RegExp(/(<img[^>]+src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/, 'i');
        const regResult = reg.exec(contents);
        if (regResult?.length > 1) {
            image = regResult[2];
        }
        
        // <img>, <h1~5>, <div>, <blockquote>, <table>, <code> 은 그냥 빈스트링으로 replace
        // <br>, <li> 는 ' ' 로 replace
        // 나머지 태그들 - <~> 전부 빈스트링으로 replace
        summery = contents
            .replace(/(<img[^>]*>)|(<h1[^>]*>.*<\/h1>)|(<h2[^>]*>.*<\/h2>)|(<h3[^>]*>.*<\/h3>)|(<h4[^>]*>.*<\/h4>)|(<h5[^>]*>.*<\/h5>)|(<h6[^>]*>.*<\/h6>)|(<div[^>]*>(?!<div).+?<\/div>)|(<blockquote[^>]*>(?!<blockquote).+?<\/blockquote>)|(<table[^>]*>(?!<table).+?<\/table>)|(<code[^>]*>(?!<code).+?<\/code>)/gi, '')
            .replace(/(<br[^>]*>)|(<li[^>]*>)/gi, ' ')
            .replace(/<[^>]*>?/gi, '')
            .replace(/\n/gi, ' ')
            .slice(0, 200);
    } catch (e) {
        console.error(e);
    }

    return { image, summery };
};

// article contents (markdown) 에서 image 및 summery 추출
const mdi = new MarkdownIt();
const makeSummeryFromMarkdown = contents => {
    let image = '';
    let summery = '';

    try {
        const arrContents = mdi
            .parse(contents)
            .filter(content => content.type === 'inline')
            .flatMap(content => content?.children.filter(c => c.type === 'text' || c.type === 'image'));
        
        arrContents.map(content => {
            if (content.type === 'text' && summery.length < 200) {
                summery += (content.content + ' ');
            } else if (content.type === 'image' && !image) {
                image = content.attrs[0][1];
            }
        });
    } catch (e) {
        console.error(e);

        const result = makeSummeryFromHtml(mdi.render(contents));
        image = result.image;
        summery = result.summery;
    }

    return { image, summery };
};

const getArticleCreated = created => {
    try {
        const date = new Date(created);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
    } catch (e) {
        console.error(e);
        return '';
    }
};

export { makeSummeryFromHtml, makeSummeryFromMarkdown, getArticleCreated };