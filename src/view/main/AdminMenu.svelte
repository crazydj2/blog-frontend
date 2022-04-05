<script>
    import { push } from 'svelte-spa-router';
	import Button from '@smui/button';
</script>

<div>
	<h1>AdminMenu...... </h1>
	<Button on:click={ () => push("/admin/article")}>Move AdminArticle</Button>
	<Button on:click={ () => push("/")}>Move Root</Button>
</div>
