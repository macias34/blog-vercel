<script>
  export let posts = [];
</script>

<div class="category__posts">
  {#each posts as post}
    <a href="/{post.url}">
      <div class="category__post">{post.title}</div>
    </a>
  {/each}
</div>

<style lang="scss">
  a {
    text-decoration: none;
  }

  .category__posts {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: 1vh 0;
    .category__post {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #efeef0;
      margin: 1vh;
      padding: 0.5vh 1.5vh;
      border-radius: 30px;
      color: black;
      text-align: center;
      font-size: 1.2rem;
      cursor: pointer;
    }
  }
</style>
