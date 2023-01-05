<script>
  import Header from "$lib/UI/Header.svelte";
</script>

<svelte:head>
  <script
    src="https://kit.fontawesome.com/fe735f6a5b.js"
    crossorigin="anonymous"
  ></script>
</svelte:head>

<div class="blog__wrapper">
  <slot />
</div>

<style global lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;700;800&display=swap");
  @import url("https://rsms.me/inter/inter.css");
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  }
  html {
    font-size: 10px;
  }

  .blog__wrapper {
    width: 100%;
    overflow: hidden;
    a {
      color: wheat;
      text-decoration: none;
    }
  }
</style>
