<script>
  import PostsGrid from "$lib/Admin/Posts/PostsGrid.svelte";
  import PostAdd from "./PostAdd.svelte";

  export let posts = [];
</script>

<div class="admin__posts">
  <PostAdd on:addToGrid />
  <PostsGrid bind:posts />
</div>

<style lang="scss">
  .admin__posts {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
</style>
