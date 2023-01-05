<script>
  import CategoriesGrid from "$lib/Admin/Categories/CategoriesGrid.svelte";
  import CategoriesAdd from "./CategoriesAdd.svelte";

  export let categories = [];

  const handleDeleteFromGrid = (event) => {
    const category_id = event.detail;

    const updatedCategories = categories.filter((category) => {
      return category_id != category.category_id;
    });

    categories = updatedCategories;
  };
</script>

<div class="admin__categories">
  <CategoriesAdd on:addToGrid />
  <CategoriesGrid bind:categories on:deleteFromGrid={handleDeleteFromGrid} />
</div>

<style lang="scss">
  .admin__categories {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
</style>
