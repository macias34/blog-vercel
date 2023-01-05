<script>
  import { DELETE } from "$lib/Helpers/Requests";
  import { createEventDispatcher } from "svelte";
  import PostSingle from "./PostSingle.svelte";
  const dispatch = createEventDispatcher();

  export let posts = [];

  const deleteFromGrid = (postId) => {
    dispatch("deleteFromGrid", postId);
  };

  const handleDeletePost = (event) => {
    const id = event.detail;
    deletePost(id);
  };

  async function deletePost(id) {
    const url = `/api/posts/${id}`;
    const res = await DELETE(url);

    deleteFromGrid(id);
  }
</script>

<div class="posts__caption">
  <div class="posts__caption_normal">Zobacz ostatnio</div>
  <div class="posts__caption_bold">Dodane posty</div>
</div>

<div class="posts">
  {#each posts as post (post.post_id)}
    <PostSingle {...post} on:deletePost={handleDeletePost} />
  {/each}
</div>

<style lang="scss">
  @import "../../scss/media_queries";

  .posts__caption {
    display: flex;
    flex-direction: column;
    padding: 3vh 0;
    color: white;
    div {
      font-size: 6rem;
    }

    .posts__caption_normal {
      font-weight: 200;
    }

    .posts__caption_bold {
      font-weight: 600;
    }
  }
  .posts {
    width: 100%;
    display: flex;
    flex-direction: column;

    @include landscape {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
</style>
