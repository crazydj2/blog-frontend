<div bind:this={viewer} ></div>

<script>
	import { onMount } from 'svelte';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

	import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';

	export let initContents = '';

	let viewerInstance;
	
	let viewer;

	onMount(() => {
		viewerInstance = new Viewer({
			el: viewer,
			// height: '500px',
			initialValue:initContents,
			theme: 'dark',
		});

		viewerInstance.setMarkdown(initContents);
	});
</script>

