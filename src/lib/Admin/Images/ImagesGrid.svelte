<script>
  import ImageSingle from "./ImageSingle.svelte";
  export let imgs = [];

  const handleDeleteImg = (e) => {
    const id = e.detail;

    const filteredImgs = imgs.filter((img) => img.img_id != id);
    imgs = filteredImgs;
  };
</script>

<div class="imgs__display">
  {#each imgs as img (img.img_id)}
    <ImageSingle {...img} on:deleteImg={handleDeleteImg} />
  {/each}
</div>

<style lang="scss">
  .imgs__display {
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
