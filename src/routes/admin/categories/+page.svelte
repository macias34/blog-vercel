<script>
  import CategoriesPanel from "$lib/Admin/Categories/CategoriesPanel.svelte";

  export let data = {};
  let categories = data.categories;

  const handleAddToGrid = (event) => {
    const categoryData = event.detail;
    categories = [...categories, categoryData];
  };
</script>

<svelte:head>
  <title>Categories panel</title>
</svelte:head>

<CategoriesPanel bind:categories on:addToGrid={handleAddToGrid} />
