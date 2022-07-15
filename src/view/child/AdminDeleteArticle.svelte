
<Content>
	<h3 class="sub">글 검색 하는 거 (default 는 all)</h3>
</Content>

<Content>
	<h3 class="sub">글 리스트 (with checkbox)</h3>
</Content>

<Content>
	<Group variant="unelevated" style="display: flex; justify-content: stretch;">
		<Button color="secondary" on:click={ deleteTargets } variant="raised" style="flex-grow: 1;"><Label>글 삭제</Label></Button>
	</Group>
</Content>

<script>
	import Button, { Group, Label } from '@smui/button';
	import { Content } from '@smui/card';

	import { deleteArticle } from '../../api/article.js';

	const deleteTargets = async () => {
		if (!parent) {
			alert('메뉴를 선택해 주세요...');
			return;
		}

		alert('로직 완성하삼~');
		return;

		const response = await deleteArticle({
			title,
			contents,
			parent
		});

		if (response?.success) {
			alert(`"${title}" 생성에 성공하였습니다.`);
			
			title = '';

			editor.reset();
			adminMenuSelectContainer.reset();
		} else {
			alert(`"${title}" article 생성에 실패하였습니다.`);
		}
	}
</script>

<style>
	h3 {
		color: yellowgreen;
	}

	h3.sub {
		margin-bottom: 0;
	}
</style>