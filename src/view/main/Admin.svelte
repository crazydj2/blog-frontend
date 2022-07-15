<h1>Admin 화면</h1>

{#if mode === 'Auth'}
<Card variant="outlined">
	<Content>
		<h3>비밀번호를 입력하세용~.</h3>
		<Textfield bind:value={password} label="비밀번호" required type="password">
			<HelperText slot="helper">비밀번호를 입력해주세용.</HelperText>
		</Textfield>
	</Content>
	<Actions>
		<Button on:click={ checkPassword } variant="raised"><Label>확인</Label></Button>
	</Actions>
</Card>
{:else}
<Card variant="outlined">
	<Content>
		<TabBar {tabs} let:tab bind:active={activeTab} >
			<Tab {tab} >
				<Label>{tab.name}</Label>
			</Tab>
		</TabBar>
	</Content>

	<svelte:component this={activeTab.component}></svelte:component>
	
</Card>

{/if}


<script>
	import Card, { Content, Actions } from '@smui/card';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import Button, { Label } from '@smui/button';
	import Tab from '@smui/tab';
	import TabBar from '@smui/tab-bar';

	import AdminAddMenu from '../child/AdminAddMenu.svelte';
	import AdminDeleteMenu from '../child/AdminDeleteMenu.svelte';
	import AdminAddArticle from '../child/AdminAddArticle.svelte';

	let mode = 'Auth';

	let password = '';

	const checkPassword = async () => {
		// 비번 검증 후 오케이면 모드 변경

		mode = 'Add Menu';
	};

	const tabs = [
		{name: 'Add Menu', component: AdminAddMenu},
		{name: 'Delete Menu', component: AdminDeleteMenu},
		{name: 'Add Article', component: AdminAddArticle}
	];
	
	let activeTab = tabs[0];
</script>

<style>
	h3 {
		color: yellowgreen;
		margin-bottom: 0;
	}
</style>