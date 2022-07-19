
<SearchArticleContianer let:articles={articles}>
	<SearchArticleTableResult articles={articles} on:select={select}></SearchArticleTableResult>
</SearchArticleContianer>

<Content>
	<Group variant="unelevated" style="display: flex; justify-content: stretch;">
		<Button color="secondary" on:click={ deleteTargets } variant="raised" style="flex-grow: 1;"><Label>글 삭제</Label></Button>
	</Group>
</Content>

<script>
	import Button, { Group, Label } from '@smui/button';
	import { Content } from '@smui/card';

	import { getArticle, deleteArticle } from '../../api/article.js';

	import SearchArticleContianer from './SearchArticleContianer.svelte';
	import SearchArticleTableResult from './SearchArticleTableResult.svelte';


	let name = '';

	let selected = [];

	const search = async () => {
		const response = await getArticle({keyword: name});

		articles = response?.data || [];
	};

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
			alert(`"${name}" 메뉴 생성에 성공하였습니다.`);
			
			search();
		} else {
			alert(`글 삭제에 실패하였습니다.`);
		}
	};


</script>
