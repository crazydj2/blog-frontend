<h1>글 추가</h1>

<div class="card-container">
	<h3>부모 메뉴 선택</h3>
	<Card variant="outlined">
		<AdminMenuSelectContainer on:change={chageParent}></AdminMenuSelectContainer>
	</Card>
</div>

<div class="card-container">
	<h3>제목 & 본문 입력</h3>
	<Card variant="outlined">
		<Content>
			<Textfield bind:value={title} label="제목" required>
				<HelperText slot="helper">제목을 입력해주세용.</HelperText>
			</Textfield>

			<h4>본문</h4>
			<ToastUIEditor></ToastUIEditor>
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
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	import AdminMenuSelectContainer from '../child/AdminMenuSelectContainer.svelte';
	import ToastUIEditor, { getHTML } from '../external-wrapper/ToastUIEditor.svelte';

	let parent = null;

	let title = '';

	const chageParent = e => {
		parent = e.detail.parent;
	};

	const addArticle = () => {
		if (parent?.children?.length > 0) {
			alert('가장 깊은 자식 메뉴를 선택해 주세요...');
			return;
		}

		if (!title) {
			alert('제목을 입력해주세요...');
			return;
		}

		const content = getHTML();

		if (!content) {
			alert('본문을 입력해주세요...');
			return;
		}

		alert(`'잇힝~' ${parent} ${getHTML()}`);
	}
</script>

<style>
	.card-container {
		margin-bottom: 40px;
	}

	.card-container h4 {
		color: yellowgreen;
	}
</style>