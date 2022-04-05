<script>
    import { push } from 'svelte-spa-router';
	import Button from '@smui/button';
</script>

<div>
	<h1>AdminArticle...... </h1>
	<Button on:click={ () => push("/admin/menu")}>Move AdminMenu</Button>
	<Button on:click={ () => push("/")}>Move Root</Button>
</div>
