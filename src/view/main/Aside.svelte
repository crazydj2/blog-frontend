<!-- Don't include fixed={false} if this is a page wide drawer.
	It adds a style for absolute positioning. -->
<Drawer variant={drawerVariant} fixed={false} bind:open={drawerOpen}>
	<Header>
		<Title>여기에는 과연 뭘 추가할 수 있을까???</Title>
		<Subtitle>여기에는 과연 뭘 추가할 수 있을까???</Subtitle>
	</Header>
	<Content>
		<List>
			<Item href="javascript:void(0)" on:click={() => setActive('keyboard_arrow_right')} activated={active === 'keyboard_arrow_right'} >
				<Graphic class="material-icons" aria-hidden="true">keyboard_arrow_right</Graphic>
				<Text>keyboard_arrow_right</Text>
			</Item>
			<Separator />
			<Item href="javascript:void(0)" on:click={() => setActive('keyboard_arrow_down')} activated={active === 'keyboard_arrow_down'} >
				<Graphic class="material-icons" aria-hidden="true">keyboard_arrow_down</Graphic>
				<Text>keyboard_arrow_down</Text>
			</Item>
			<Separator />
		</List>
	</Content>
</Drawer>

<!-- Don't include fixed={false} if this is a page wide drawer.
	It adds a style for absolute positioning. -->
<Scrim fixed={false} />

<svelte:window bind:innerWidth={innerWidth}/>

<script>
	import Drawer, { Content, Header, Title, Subtitle, Scrim } from '@smui/drawer';
	import List, { Item, Text, Graphic, Separator } from '@smui/list';
	import asideOpen from '../../store/aside.js';

	let innerWidth;

	let drawerVariant = 'static';
	let drawerOpen = false;

	let active = 'keyboard_arrow_right';

	const setActive = value => {
		active = value;
	};

	const setVisible = () => {
		if (innerWidth > 720) {
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