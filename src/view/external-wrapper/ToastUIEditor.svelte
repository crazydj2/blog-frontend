<div bind:this={editor} ></div>

<script context="module">
	let editorInstance;

	export function getHTML() {
		editorInstance.setMarkdown(editorInstance.getMarkdown().trim());
		return editorInstance.getHTML();
	}
</script>

<script>
	import { onMount } from 'svelte';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

	import Editor from '@toast-ui/editor';
	
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
</script>

<style>
	:global(.toastui-editor-toolbar) {
		overflow-x: scroll;
	}
</style>

