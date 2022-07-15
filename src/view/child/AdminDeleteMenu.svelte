<Content>
	<h3>삭제할 메뉴 선택</h3>
	<AdminMenuSelectContainer on:change={chageTarget}></AdminMenuSelectContainer>
</Content>

<Content>
	<Group variant="unelevated" style="display: flex; justify-content: stretch;">
		<Button color="secondary" on:click={ deleteTarget } variant="raised" style="flex-grow: 1;"><Label>메뉴 삭제</Label></Button>
	</Group>
</Content>


<script>
	import Button, { Group, Label } from '@smui/button';
	import { Content } from '@smui/card';

	import AdminMenuSelectContainer from '../child/AdminMenuSelectContainer.svelte';

	import { deleteMenu } from '../../api/menu.js';

	import menu from '../../store/menu.js';

	let target = null;

	const chageTarget = e => {
		target = e.detail.select;
	};

	const deleteTarget = async () => {
		if (!target) {
			alert('메뉴 선택하숑~');
			return;
		}
		
		// const response = await deleteMenu({name, parent});

		// if (response?.success) {
		// 	alert(`${target.name} 메뉴 삭제에 성공하였습니다.`);
			
		// 	menu.reset();
		// 	name = '';
		// } else {
		// 	alert(`${name} 메뉴 삭제에 실패하였습니다.`);
		// }
	};
</script>

<style>
	h3 {
		color: yellowgreen;
		margin-bottom: 0;
	}
</style>