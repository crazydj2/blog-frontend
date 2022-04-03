<script>
    import { push } from 'svelte-spa-router';
	import Button from '@smui/button';

	console.log('TestView');
</script>

<main>
	<h1>I'm TestView......</h1>
	<Button on:click={ () => push("/test2")}>Move TestView2222222</Button>
</main>
