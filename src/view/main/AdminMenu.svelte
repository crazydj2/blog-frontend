<h1>메뉴 추가</h1>

<div class="card-container">
	<h3>부모 메뉴 선택</h3>
	<Card variant="outlined">
		<AdminMenuSelectContainer on:change={chageParent}></AdminMenuSelectContainer>
	</Card>
</div>

<div class="card-container">
	<h3>메뉴 정보 입력</h3>
	<Card variant="outlined">
		<Content>
			<Textfield bind:value={name} label="메뉴명" required>
				<HelperText slot="helper">메뉴명을 입력해주세용.</HelperText>
			</Textfield>
		</Content>
		<Actions>
			<Button on:click={ () => initName } variant="raised"><Label>초기화</Label></Button>
		</Actions>
	</Card>
</div>

<div class="card-container">
	<Button color="secondary" on:click={ addMenu } variant="raised"><Label>메뉴 추가</Label></Button>
	<Button color="secondary" on:click={ () => push("/admin/article") } variant="raised"><Label>글 추가로 이동</Label></Button>
</div>



<script>
    import { push } from 'svelte-spa-router';
	import Button, { Label } from '@smui/button';
	import Card, { Content, Actions } from '@smui/card';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	import AdminMenuSelectContainer from '../child/AdminMenuSelectContainer.svelte';

	import { postMenu } from '../../api/menu.js';

	import menu from '../../store/menu.js';

	let parent = null;

	let name = '';

	const initName = () => {
		name = '';
	};

	const chageParent = e => {
		parent = e.detail.parent;
	};

	const addMenu = async () => {
		if (!name) {
			alert('메뉴명 입력하숑~');
			return;
		}
		
		const response = await postMenu({name, parent});

		if (response?.success) {
			alert(`${name} 메뉴 생성에 성공하였습니다.`);
			
			menu.reset();
			name = '';
		} else {
			alert(`${name} 메뉴 생성에 실패하였습니다.`);
		}
	};
</script>

<style>
	.card-container {
		margin-bottom: 40px;
	}
</style>