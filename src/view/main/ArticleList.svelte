<LayoutGrid>
    <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}>
        <div><h1>menu > menu > menu > ......~</h1></div>
    </Cell>
    {#each Array(39) as _unused, i}
    <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 4 }}>
        <ArticleListItem i={i}></ArticleListItem>
    </Cell>
    {/each}
</LayoutGrid>

<script>
    import LayoutGrid, { Cell } from '@smui/layout-grid';

    import ArticleListItem from '../child/ArticleListItem.svelte';
</script>