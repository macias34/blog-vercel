<script>
  import { onMount } from "svelte";

  export let categories = [];
  let visible = false;

  onMount(() => {
    if (categories.length > 0) visible = true;
  });
</script>

<div class="post__categories">
  {#if visible}
    {#each categories as category}
      <div class="post__category" style="border-color : {category.color}">
        {category.label}
      </div>
    {/each}
  {/if}
</div>

<style lang="scss">
  .post__categories {
    width: 100%;
    margin-bottom: 1vh;
    display: flex;
    flex-wrap: wrap;
    .post__category {
      height: 4vh;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 3px solid;
      background-color: #111;
      margin-right: 1vh;
      margin-bottom: 1vh;
      padding: 1vh 1.5vh;
      border-radius: 30px;
      color: white;
      font-size: 1.35rem;
      font-weight: 500;
      cursor: pointer;
    }
  }
</style>
