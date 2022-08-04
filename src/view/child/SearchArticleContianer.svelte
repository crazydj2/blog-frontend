
<Content style="display: flex; align-items: center;">
	<Textfield bind:value={name} label="글 제목" required></Textfield>
	<Button style="margin-left: 30px;" on:click={ search } variant="raised"><Label>검색</Label></Button>
</Content>

<slot articles={articles}></slot>

<script>
	import Button, { Label } from '@smui/button';
	import { Content } from '@smui/card';
	import Textfield from '@smui/textfield';

	import { getArticle } from '../../api/article.js';


	let name = '';

	let articles = [];

	const search = async () => {
		const response = await getArticle({keyword: name});

		articles = response?.data || [];
	};

	export function reset() {
		search();
	}

</script>
