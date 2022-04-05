<script>
	import Router from 'svelte-spa-router';
    import routes from '../routes/routes';

	import Aside from './Aside.svelte';
</script>

<div>
	<Aside></Aside>

	<main>
		<Router {routes} />
	</main>
</div>
