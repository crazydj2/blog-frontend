
<Content>
	<h3 class="sub">기사 검색 & 선택</h3>
</Content>

<Content>
	<h3 class="sub">제목 수정</h3>
	<Textfield bind:value={title} label="제목" required>
		<HelperText slot="helper">제목을 입력해주세용.</HelperText>
	</Textfield>

	<h3 style="margin-bo">본문 수정</h3>
	<ToastUIEditor bind:this={editor}></ToastUIEditor>
</Content>

<Content>
	<Group variant="unelevated" style="display: flex; justify-content: stretch;">
		<Button color="secondary" on:click={ addArticle } variant="raised" style="flex-grow: 1;"><Label>글 수정</Label></Button>
	</Group>
</Content>

<script>
	import Button, { Group, Label } from '@smui/button';
	import { Content } from '@smui/card';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	import ToastUIEditor from '../external-wrapper/ToastUIEditor.svelte';

	import { postArticle } from '../../api/article.js';

	let title = '';

	let editor;
	let adminMenuSelectContainer;

	const addArticle = async () => {
		alert('로직 완성하삼~');
		return;

		if (!parent) {
			alert('메뉴를 선택해 주세요...');
			return;
		}

		if (!title) {
			alert('제목을 입력해주세요...');
			return;
		}

		const contents = editor.getHTML();

		if (!contents) {
			alert('본문을 입력해주세요...');
			return;
		}

		const response = await postArticle({
			title,
			contents,
			parent
		});

		if (response?.success) {
			alert(`"${title}" 생성에 성공하였습니다.`);
			
			title = '';

			editor.reset();
			adminMenuSelectContainer.reset();
		} else {
			alert(`"${title}" article 생성에 실패하였습니다.`);
		}
	}
</script>

<style>
	h3 {
		color: yellowgreen;
	}

	h3.sub {
		margin-bottom: 0;
	}
</style>