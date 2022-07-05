<div bind:this={editor} ></div>

<script>
	import { onMount } from 'svelte';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

	import Editor from '@toast-ui/editor';

	let editorInstance;
	
	let editor;

	onMount(() => {
		editorInstance = new Editor({
			el: editor,
			height: '500px',
			initialEditType: 'markdown',
			previewStyle: 'vertical',
			theme: 'dark',
			hideModeSwitch: true
		});
	});

	export function getHTML() {
		editorInstance.setMarkdown(editorInstance.getMarkdown().trim());
		return editorInstance.getHTML();
	}

	export function reset() {
		editorInstance.reset();
	}
</script>

<style>
	:global(.toastui-editor-toolbar) {
		overflow-x: scroll;
	}
</style>

