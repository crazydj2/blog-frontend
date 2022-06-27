<!-- Don't include fixed={false} if this is a page wide drawer.
	It adds a style for absolute positioning. -->
<Drawer variant={drawerVariant} fixed={false} bind:open={drawerOpen}>
	<Header>
		<Title>여기에는 과연 뭘 추가할 수 있을까???</Title>
		<Subtitle>여기에는 과연 뭘 추가할 수 있을까???</Subtitle>
		<Subtitle>여기에는 과연 뭘 추가할 수 있을까???</Subtitle>
	</Header>
	<Content>
		<List>
			{#each menus as menu}
			<MenuItem menu={menu} activeMenuId={active} on:toggle={toggleChildren}></MenuItem>
			{/each}
		</List>
	</Content>
</Drawer>

<!-- Don't include fixed={false} if this is a page wide drawer.
	It adds a style for absolute positioning. -->
<Scrim fixed={false} />

<svelte:window bind:innerWidth={innerWidth}/>

<script>
	import { location } from 'svelte-spa-router';
	import Drawer, { Content, Header, Title, Subtitle, Scrim } from '@smui/drawer';
	import List from '@smui/list';

	import MenuItem from './MenuItem.svelte';
	
	import asideOpen from '../../store/aside.js';
	import menu from '../../store/menu.js';

	let innerWidth;

	let drawerVariant = 'static';
	let drawerOpen = false;

	let menus = [];

	let active = '';


	const getMenusByUrl = () => {
		const names = $location.split('/');

		let result = [];
		let tempMenus = $menu;

		while (names.length > 0) {
			const name = names.shift();

			for (let i = 0; i < tempMenus.length; i++) {
				if (tempMenus[i].name === name) {
					result.push(tempMenus[i]);
					tempMenus = tempMenus[i].children;
					break;
				}
			}
		}

		return result;
	};

	const setFlatMenus = arrCurrent => {
		while (arrCurrent.length > 0) {
			const current = arrCurrent.shift();

			if (menus.filter(m => m._id === current._id).length === 0) {
				const parent = current.parent;

				menus = menus.flatMap(m => {
					if (m._id === parent._id) {
						m.open = true;
						return [m, ...m.children.map(c => {
							c.depth = parent.depth + 1;
							return c;
						})];
					}
					
					return m;
				});
			}
		}
	};
	
	const setMenus = (init = false) => {
		if ($location.includes('/admin/')) {
			active = '';
			return;
		}

		const arrCurrent = getMenusByUrl();
		const current = arrCurrent[arrCurrent.length - 1];

		if (!current) {
			return;
		}
		
		setFlatMenus(arrCurrent);

		if (active === current._id) {
			if (!current.open) {}
		}

		if (!init) {
			toggleChildren();
		}

		active = current._id;
	};

	const addChildrenOnMenus = current => {
		menus = menus.flatMap(m => {
			if (m._id === current._id) {
				return [m, ...m.children.map(c => {
					c.depth = current.depth + 1;
					c.open = false;
					return c;
				})];
			}
			
			return m;
		});
	};

	const removeChildrenOnMenus = current => {
		let targets = [...current.children];

		let tempMenus = [...menus];
		
		while (targets.length > 0) {
			const target = targets.shift();
			targets = [...targets, ...target.children];

			tempMenus = tempMenus.filter(m => m._id !== target._id);
		}

		menus = tempMenus;
	};

	const toggleChildren = () => {
		const arrCurrent = getMenusByUrl();
		const current = arrCurrent[arrCurrent.length - 1];

		current.open = !current.open;

		if (current.open) {
			addChildrenOnMenus(current);
		} else {
			removeChildrenOnMenus(current);
		}
	}

	menu.subscribe(value => {
		menus = value.map(v => {
			v.depth = 0;
			return v;
		});

		setMenus(true);
	});

	location.subscribe(() => {
		setMenus();
	});
	

	const setVisible = () => {
		if (innerWidth > 480) {
			drawerVariant = 'static';
			asideOpen.update(open => false);
		} else {
			drawerVariant = 'modal';
		}
	};

	asideOpen.subscribe(value => {
		drawerOpen = value;
	});
	
	$: setVisible(innerWidth);
</script>
