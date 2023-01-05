<script>
  import { GET } from "$lib/Helpers/Requests";
  import { onMount } from "svelte";

  import PostForm from "./PostForm.svelte";

  let showForm = false;
  let categories = [];

  const toggleForm = () => {
    showForm = !showForm;
  };

  const getCategories = async () => {
    const url = `/api/categories/`;

    const res = await GET(url);

    const fetchedCategories = await res.json();

    if (res.ok) {
      categories = fetchedCategories;

      return {
        status: 200,
        props: {
          fetchedCategories,
        },
      };
    }

    return {
      status: res.status,
      error: new Error("Couldn't fetch the posts"),
    };
  };

  onMount(() => {
    getCategories();
  });
</script>

<div class="posts__add" on:click={toggleForm}>
  <i class="fa-solid fa-circle-plus" />
</div>

{#if showForm}
  <PostForm bind:showForm on:addToGrid {categories} />
{/if}

<style lang="scss">
  .posts__add {
    margin: 2vh 0;
    cursor: pointer;
    i {
      color: white;
      font-size: 4rem;
    }
  }
</style>
