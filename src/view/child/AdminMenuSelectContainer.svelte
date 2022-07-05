<Content>
	<div class="card-content-container">
		{#each parents as parent, i}
		<div>
			<MenuSelect menus={parent.list} depth={i} on:change={changeParent} initTime={parents.initTime}></MenuSelect>
		</div>
		{/each}
	</div>
	<pre><h2>선택된 부모 메뉴 : { selectedParents() }</h2></pre>
</Content>
<Actions>
	<Button on:click={ init } variant="raised"><Label>초기화</Label></Button>
</Actions>

<script>
	import { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { createEventDispatcher } from 'svelte';

	import MenuSelect from '../child/MenuSelect.svelte';

	import menu from '../../store/menu.js';

	const dispatch = createEventDispatcher();

	let parents = [];

	$: selectedParents = () => {
		let str = '';
		parents.map(parent => {
			if (!parent.select || !parent.select.name) {
				return;
			}

			if (str) {
				str += ' > ';
			}

			str += parent.select.name;
		});

		if (!str) {
			str = '없음';
		}

		return str;
	};

	$: {
		let parent = null;

		for (let i = parents.length - 1; i >= 0; i--) {
			if (parents[i].select !== '선택 안함' && !!parents[i].select?._id) {
				parent = parents[i].select._id;
				break;
			}
		}

		dispatch('change', { parent });
	}

	const changeParent = (event) => {
		const { value, depth } = event.detail;

		if (!value) {
			return;
		}

		const initTime = parents.initTime;

		parents = parents.slice(0, depth + 1);
		parents.initTime = initTime;
		parents[depth].select = value;

		if (value.children && value.children.length > 0) {
			parents.push({list: [...value.children], select: null});
		}
	};

	const init = () => {
		parents = [{list: $menu, select: null}];
		parents.initTime = (new Date()).getTime();
	};

	menu.subscribe(value => {
		init();
	});

	export function reset() {
		init();
	}
</script>

<style>
	.card-content-container {
		display: flex;
    	flex-wrap: wrap;
	}

	.card-content-container > div {
		flex-basis: 0px;
		min-width: 245px;
		margin-right: 12px;
	}

	pre h2 {
		color: orange;
	}
</style>