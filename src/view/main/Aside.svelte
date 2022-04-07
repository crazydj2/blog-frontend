<!-- Don't include fixed={false} if this is a page wide drawer.
	It adds a style for absolute positioning. -->
<Drawer variant="static" fixed={false} bind:open>
	<Header>
		<Title>Super Mail</Title>
		<Subtitle>It's the best fake mail app drawer.</Subtitle>
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

<script>
	import Drawer, { Content, Header, Title, Subtitle, Scrim } from '@smui/drawer';
	import List, { Item, Text, Graphic, Separator } from '@smui/list';

	export let open;

	
	let active = 'keyboard_arrow_right';

	const setActive = value => {
		active = value;
		open = false;
	};
</script>