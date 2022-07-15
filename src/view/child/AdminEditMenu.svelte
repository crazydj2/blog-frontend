<Content>
	<h3>메뉴 선택</h3>
	<AdminMenuSelectContainer on:change={chageParent}></AdminMenuSelectContainer>
</Content>

<Content>
	<h3>메뉴 정보 수정</h3>
	<Textfield bind:value={name} label="메뉴명" required>
		<HelperText slot="helper">메뉴명을 입력해주세용.</HelperText>
	</Textfield>
	<Button on:click={ () => initName } variant="raised"><Label>초기화</Label></Button>
</Content>

<Content>
	<Group variant="unelevated" style="display: flex; justify-content: stretch;">
		<Button color="secondary" on:click={ addMenu } variant="raised" style="flex-grow: 1;"><Label>메뉴 수정</Label></Button>
	</Group>
</Content>


<script>
	import Button, { Group, Label } from '@smui/button';
	import { Content } from '@smui/card';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	import AdminMenuSelectContainer from '../child/AdminMenuSelectContainer.svelte';

	import { patchMenu } from '../../api/menu.js';

	import menu from '../../store/menu.js';

	let parent = null;

	let name = '';

	const initName = () => {
		name = '';
	};

	const chageParent = e => {
		parent = e.detail.select;
	};

	const addMenu = async () => {
		if (!name) {
			alert('메뉴명 입력하숑~');
			return;
		}

		alert('로직 완성시키삼');

		return;
		
		const response = await patchMenu({name, parent});

		if (response?.success) {
			alert(`"${name}" 메뉴 수정에 성공하였습니다.`);
			
			menu.reset();
			name = '';
		} else {
			alert(`"${name}" 메뉴 수정에 실패하였습니다.`);
		}
	};
</script>

<style>
	h3 {
		color: yellowgreen;
		margin-bottom: 0;
	}
</style>