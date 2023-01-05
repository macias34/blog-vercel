<script>
  import CategoriesForm from "./CategoriesForm.svelte";

  let showForm = false;

  const toggleForm = () => {
    showForm = !showForm;
  };
</script>

<div class="categories__add" on:click={toggleForm}>
  <i class="fa-solid fa-circle-plus" />
</div>

{#if showForm}
  <CategoriesForm bind:showForm on:addToGrid />
{/if}

<style lang="scss">
  .categories__add {
    margin: 2vh 0;
    cursor: pointer;
    i {
      color: white;
      font-size: 4rem;
    }
  }
</style>
