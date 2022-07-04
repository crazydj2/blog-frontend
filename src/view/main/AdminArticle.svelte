<h1>글 추가</h1>

<div class="card-container">
	<h3>부모 메뉴 선택</h3>
	<Card variant="outlined">
		<AdminMenuSelectContainer on:change={chageParent}></AdminMenuSelectContainer>
	</Card>
</div>

<div class="card-container">
	<h3>글 내용 입력</h3>
	<Card variant="outlined">
		<Content>
			<h3>여기에 에디터 추가 (summernote? toast ui?)</h3>
		</Content>
	</Card>
</div>

<div class="card-container">
	<Button color="secondary" on:click={ addArticle } variant="raised"><Label>글 추가</Label></Button>
	<Button color="secondary" on:click={ () => push("/admin/menu") } variant="raised"><Label>메뉴 추가로 이동</Label></Button>
</div>

<script>
    import { push } from 'svelte-spa-router';
	import Button, { Label } from '@smui/button';
	import Card, { Content } from '@smui/card';

	import AdminMenuSelectContainer from '../child/AdminMenuSelectContainer.svelte';

	let parent = null;

	const chageParent = e => {
		parent = e.detail.parent;
	};

	const addArticle = () => {
		if (!parent) {
			alert('메뉴를 선택해 주세요...');
			return;
		}

		alert(`'잇힝~' ${parent}`);
	}
</script>

<style>
	.card-container {
		margin-bottom: 40px;
	}
</style>