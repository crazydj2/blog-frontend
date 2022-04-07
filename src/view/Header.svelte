

<TopAppBar variant="static">
	<Row>
		<Section>
			<IconButton class="material-icons blog-header-menu" on:click={ onClick }>menu</IconButton>
			<Title>DJ's Blog Header</Title>
		</Section>
		<Section align="end" toolbar>
			<IconButton href="https://github.com/crazydj2/blog-frontend" target="_blank"><Github /></IconButton>
		</Section>
	</Row>
</TopAppBar>
  
<script>
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import Github from "svelte-material-icons/Github.svelte";
	
	const onClick = () => {
		alert('click......');
	};
</script>

<style>
	:global(.blog-header-menu) {
		display: none;
	}

	@media (max-width: 480px) {
		:global(.blog-header-menu) {
			display: flex;
		}
	}
</style>