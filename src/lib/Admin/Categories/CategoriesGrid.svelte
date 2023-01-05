<script>
  import { createEventDispatcher } from "svelte";
  import { DELETE, PUT } from "$lib/Helpers/Requests";
  import CategoriesEdit from "./CategoriesEdit.svelte";
  import CategorySingle from "$lib/Admin/Categories/CategorySingle.svelte";

  const dispatch = createEventDispatcher();

  export let categories = [];
  let editData;
  let showForm = false;

  async function deleteCategory(id) {
    const url = `/api/categories/${id}`;
    const res = await DELETE(url);
  }

  const handleEditCategory = (event) => {
    editData = event.detail;
    showForm = true;
  };

  const handleSubmitEdit = (event) => {
    const category = event.detail;
    submitEdit(category);
  };

  const submitEdit = async (category) => {
    const url = `/api/categories/${category.category_id}`;
    const res = await PUT(url, category);

    updateEditedCategory(category);
    showForm = false;
  };

  const updateEditedCategory = (category) => {
    const id = category.category_id;
    const categoryIndex = categories.findIndex(
      (category) => category.category_id === id
    );

    categories[categoryIndex] = category;
  };

  const handleDeleteCategory = (event) => {
    const id = event.detail;

    deleteCategory(id);
    deleteFromGrid(id);
  };

  const deleteFromGrid = (id) => {
    dispatch("deleteFromGrid", id);
  };
</script>

<div class="categories__display">
  {#each categories as category (category.category_id)}
    <CategorySingle
      {...category}
      on:deleteCategory={handleDeleteCategory}
      on:editCategory={handleEditCategory}
    />
  {/each}
</div>

{#if showForm}
  <CategoriesEdit bind:showForm {editData} on:updateGrid={handleSubmitEdit} />
{/if}

<style lang="scss">
  .categories__display {
    width: 90%;
    height: 90vh;
    border-radius: 10px;
    padding-bottom: 5vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }
</style>
