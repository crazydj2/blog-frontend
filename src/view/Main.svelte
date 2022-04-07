<div class="blog-drawer-container">
	<Aside bind:open={open}></Aside>
	
	<AppContent class="app-content">
	  <main class="main-content">
		<Router {routes} />
	  </main>
	</AppContent>
  </div>
  
  <script>
	import Router from 'svelte-spa-router';
    import routes from '../routes/routes';

	import { AppContent } from '@smui/drawer';

	import Aside from './main/Aside.svelte';
  
	let open = false;
	let active = 'Inbox';
  </script>
  
  <style>
	/* These classes are only needed because the
	  drawer is in a container on the page. */
	.blog-drawer-container {
	  position: relative;
	  display: flex;
	  height: 100%;
	  overflow: hidden;
	  z-index: 0;
	}
  
	:global(.app-content) {
	  flex: auto;
	  overflow: auto;
	  position: relative;
	  flex-grow: 1;
	}
  
	.main-content {
	  overflow: auto;
	  padding: 16px;
	  height: 100%;
	  box-sizing: border-box;
	}
  </style>
  