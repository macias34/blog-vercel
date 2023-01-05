<script>
  import PostsPanel from "$lib/Admin/Posts/PostsPanel.svelte";
  export let data = {};

  let posts = data.posts;

  const handleAddToGrid = (event) => {
    const postData = event.detail;

    posts = [...posts, postData];
  };
</script>

<svelte:head>
  <title>Posts panel</title>
</svelte:head>

<PostsPanel bind:posts on:addToGrid={handleAddToGrid} />
