<script>
</script>

<svelte:head>
  <script
    src="https://kit.fontawesome.com/fe735f6a5b.js"
    crossorigin="anonymous"
  ></script>
</svelte:head>

<div class="admin__wrapper">
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
  .admin__wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #111;
    color: white;
  }
</style>
