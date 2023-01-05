<script>
  import Header from "$lib/PostPage/Header.svelte";
  import Description from "$lib/PostPage/Description.svelte";
  export let data = {};
  let post = data.post;

  function readingTime() {
    const wpm = 225;
    const words = post.description.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);

    return time;
  }

  const time = readingTime();
</script>

<svelte:head>
  <title>
    {post.title}
  </title>
</svelte:head>

<div class="single__post_wrapper">
  <Header {...post} {time} />
  <Description description={post.description} />
</div>

<style lang="scss">
  .single__post_wrapper {
    width: 100%;
    // height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #111111;
    a {
      color: wheat;
    }
  }
</style>
