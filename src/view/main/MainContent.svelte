<svelte:component this={componentMap[current]}/>

<script>
	import { location } from 'svelte-spa-router';

	import MainPreview from '../child/MainPreview.svelte';
	import ArticleList from '../child/ArticleList.svelte';
	import ArticleDetail from '../child/ArticleDetail.svelte';

	import menu from '../../store/menu.js';


	const componentMap = {
		'default': null,
		'MainPreview': MainPreview,
		'ArticleList': ArticleList,
		'ArticleDetail': ArticleDetail
	};

	let current = 'default';

	const setComponent = () => {
		if ($location === '/') {
			current = 'MainPreview';
			return;
		}

		const arr = $location.split('/');

		const last = arr.pop();
		const reg = /[0-9A-Fa-f]{24}/g;

		// menu 는 name, article 은 _id 로 uri 구성
		// 24 자리면서 16진수인 경우 mogoDB 의 ObjectId - article 로 판단
		// mogoDB 의 ObjectId 는 12 byte 의 16진수 - 24자리의 string 으로 넘어옴
		if (reg.test(last)) {
			// article
			current = 'ArticleDetail';
		} else {
			// menu
			current = 'ArticleList';
		}
	};

	location.subscribe(() => {
		console.log('location.subscribe', $location);

		setComponent();
	});	

	menu.subscribe(value => {
		console.log('menu.subscribe', $menu);

		setComponent();
	});
</script>
