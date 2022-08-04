
<SearchArticleContianer let:articles={articles} bind:this={searchArticleContianer}>
	<SearchArticleTableResult articles={articles} on:select={select} bind:this={searchArticleTableResult}></SearchArticleTableResult>
</SearchArticleContianer>

<Content>
	<Group variant="unelevated" style="display: flex; justify-content: stretch;">
		<Button color="secondary" on:click={ deleteTargets } variant="raised" style="flex-grow: 1;"><Label>글 삭제</Label></Button>
	</Group>
</Content>

<script>
	import Button, { Group, Label } from '@smui/button';
	import { Content } from '@smui/card';

	import { deleteArticle } from '../../api/article.js';

	import SearchArticleContianer from './SearchArticleContianer.svelte';
	import SearchArticleTableResult from './SearchArticleTableResult.svelte';


	let searchArticleContianer;
	let searchArticleTableResult;

	let selected = [];

	const select = e => {
		selected = e.detail.selected;
	};

	const deleteTargets = async () => {
		if (selected.length === 0) {
			alert('삭제할 글 선택하숑~');
			return;
		}

		const response = await deleteArticle({ _id: selected.map(s => s._id) });

		if (response?.success) {
			alert(`글 삭제에 성공하였습니다.`);

			searchArticleTableResult.reset();
			searchArticleContianer.reset();
		} else {
			alert(`글 삭제에 실패하였습니다.`);
		}
	};


</script>
