
<SearchArticleContianer let:articles={articles} bind:this={searchArticleContianer}>
	<SearchArticleTableResult articles={articles} isRadio={true} on:select={select} bind:this={searchArticleTableResult}></SearchArticleTableResult>
</SearchArticleContianer>

{#if !!selected}
<Content>
	<Separator />
</Content>

<Content>
	<h3 class="sub">제목 수정</h3>
	<Textfield bind:value={title} label="제목" required>
		<HelperText slot="helper">제목을 입력해주세용.</HelperText>
	</Textfield>

	<h3 style="margin-bo">본문 수정</h3>
	<ToastUIEditor bind:this={editor} initContents={initContents}></ToastUIEditor>
</Content>

<Content>
	<Group variant="unelevated" style="display: flex; justify-content: stretch;">
		<Button color="secondary" on:click={ editArticle } variant="raised" style="flex-grow: 1;"><Label>글 수정</Label></Button>
	</Group>
</Content>
{/if}


<script>
	import Button, { Group, Label } from '@smui/button';
	import { Content } from '@smui/card';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import { Separator } from '@smui/list';

	import SearchArticleContianer from './SearchArticleContianer.svelte';
	import SearchArticleTableResult from './SearchArticleTableResult.svelte';

	import ToastUIEditor from '../external-wrapper/ToastUIEditor.svelte';

	import { patchArticle } from '../../api/article.js';

	let selected = null;

	let title = '';
	let initContents = '';

	let editor;

	let searchArticleContianer;
	let searchArticleTableResult;

	console.log('AdminEditArticle', editor);


	const select = e => {
		selected = e.detail.selected;

		title = selected?.title;
		initContents = selected?.contents;

		editor?.setHTML(initContents);
	};

	const editArticle = async () => {
		if (!selected) {
			alert('수정할 글을 선택해 주세요...');
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

		const response = await patchArticle({
			query: {
				_id: selected._id
			},
			data: {
				title,
				contents
			}
		});

		if (response?.success) {
			alert(`"${title}" 수정에 성공하였습니다.`);

			editor.reset();

			title = '';
			initContents = '';

			searchArticleTableResult.reset();
			searchArticleContianer.reset();
		} else {
			alert(`"${title}" article 수정에 실패하였습니다.`);
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