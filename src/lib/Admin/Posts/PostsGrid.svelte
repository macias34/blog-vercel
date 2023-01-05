<script>
  import { createEventDispatcher } from "svelte";
  import PostSingle from "./PostSingle.svelte";
  import PostEdit from "./PostEdit.svelte";
  import { DELETE, POST, PUT } from "$lib/Helpers/Requests";

  const dispatch = createEventDispatcher();

  export let posts = [];

  let showEdit = false;
  let editData = {};

  const deleteFromGrid = (postId) => {
    const updatedPosts = posts.filter((post) => post.post_id !== postId);
    posts = updatedPosts;
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

  const handleSubmitEdit = (event) => {
    const post = event.detail;
    submitEdition(post);
  };

  const sendEdition = async (post) => {
    const apiPost = Object.assign({}, post);
    apiPost.categories = apiPost.categories.map((category) => {
      return { category_id: category.category_id };
    });
    apiPost.thumbnail_id = apiPost.thumbnail.thumbnail_id;

    const url = `/api/posts/${post.post_id}`;
    const res = await PUT(url, apiPost);
  };

  const submitEdition = async (post) => {
    updateEditedPost(post);
    sendEdition(post);
    showEdit = false;
  };

  const updateEditedPost = (post) => {
    const id = post.post_id;
    post.url = post.title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?!<>{}]/g, "");
    const postIndex = posts.findIndex((post) => post.post_id === id);
    posts[postIndex] = post;
  };

  const handleEditPost = (event) => {
    editData = event.detail;
    showEdit = true;
  };
</script>

<div class="posts__display">
  {#each posts as post (post.post_id)}
    <PostSingle
      {...post}
      on:deletePost={handleDeletePost}
      on:editPost={handleEditPost}
    />
  {/each}

  {#if showEdit}
    <PostEdit bind:showEdit {...editData} on:submitEdit={handleSubmitEdit} />
  {/if}
</div>

<style lang="scss">
  .posts__display {
    width: 90%;
    height: 90vh;
    border-radius: 10px;
    padding-bottom: 5vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }
</style>
