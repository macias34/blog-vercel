<script>
  import ImagesGrid from "./ImagesGrid.svelte";
  export let imgs = [];
</script>

<div class="admin__imgs">
  <ImagesGrid bind:imgs />
</div>

<style lang="scss">
  .admin__imgs {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
</style>
