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
		<TabBar {tabs} let:tab bind:active={selectedTab} >
			<Tab {tab} >
				<Label>{tab}</Label>
			</Tab>
		</TabBar>
	</Content>

	<Content>
		{#each radioOptions as option}
		<FormField>
			<Radio bind:group={selectedRadioOption} value={option} />
				<span slot="label">{option}</span>
		</FormField>
		{/each}
	</Content>

	<svelte:component this={components[`${selectedRadioOption} ${selectedTab}`]}></svelte:component>
</Card>

{/if}


<script>
	import Card, { Content, Actions } from '@smui/card';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import Button, { Label } from '@smui/button';
	import Tab from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Radio from '@smui/radio';
  	import FormField from '@smui/form-field';

	import AdminAddMenu from '../child/AdminAddMenu.svelte';
	import AdminEditMenu from '../child/AdminEditMenu.svelte';
	import AdminDeleteMenu from '../child/AdminDeleteMenu.svelte';
	import AdminAddArticle from '../child/AdminAddArticle.svelte';
	import AdminEditArticle from '../child/AdminEditArticle.svelte';
	import AdminDeleteArticle from '../child/AdminDeleteArticle.svelte';

	import { postAdmin } from '../../api/admin.js';
	import { getArticle } from '../../api/article.js';

	let mode = 'Auth';

	let password = '';

	const checkPassword = async () => {
		// 비번 검증 후 오케이면 모드 변경

		const response = await postAdmin({password});

		// const response = await getArticle();

		// console.log(response);
		// mode = 'Admin';
		// return;



		if (response?.success) {
			mode = 'Admin';
		} else {
			alert('비밀번호를 다시 입력해주세용~.');
			password = '';
		}
	};

	const components = {
		'Add Menu': AdminAddMenu,
		'Edit Menu': AdminEditMenu,
		'Delete Menu': AdminDeleteMenu,
		'Add Article': AdminAddArticle,
		'Edit Article': AdminEditArticle,
		'Delete Article': AdminDeleteArticle
	};

	const tabs = ['Menu', 'Article'];
	const radioOptions = ['Add', 'Edit', 'Delete'];
	
	let selectedTab = tabs[0];
	let selectedRadioOption = radioOptions[0];
</script>

<style>
	h3 {
		color: yellowgreen;
		margin-bottom: 0;
	}
</style>