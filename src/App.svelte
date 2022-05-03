<svelte:head>
	<!-- https://sveltematerialui.com/REPL.md -->

	<!-- Fonts -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />

	<!-- Material Typography -->
	<link rel="stylesheet" href="https://unpkg.com/@material/typography@13.0.0/dist/mdc.typography.css" />

	<!-- SMUI -->
	<link rel="stylesheet" href="https://unpkg.com/svelte-material-ui/bare.css" />

	<!-- SMUI Styles -->
	<link rel="stylesheet" href="/build/smui.css" media="(prefers-color-scheme: light)" />
	<link rel="stylesheet" href="/build/smui-dark.css" media="screen and (prefers-color-scheme: dark)" />
</svelte:head>

<script>
	import Header from './view/Header.svelte';
	import Main from './view/Main.svelte';
	import { onMount } from 'svelte';
	import { initStore } from './store/store.js';

	onMount(() => {
		initStore();
	});
</script>

<div class='dj-blog-app'>
	<Header></Header>

	<Main></Main>
</div>

<style>
	.dj-blog-app {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>