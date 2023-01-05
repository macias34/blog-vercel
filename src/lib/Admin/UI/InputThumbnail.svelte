<script>
  import { POST, FILEPOST } from "$lib/Helpers/Requests";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let thumbnail_id = "";
  export let thumbnail_url = "";
  export let file_name = "";

  const url = "/api/thumbnails";
  let thumbnailInput;

  const inputFile = async () => {
    const thumbnail = thumbnailInput.files[0];
    const formData = new FormData();
    formData.append("thumbnails", thumbnail);
    formData.append("fileName", thumbnail.name);
    await FILEPOST(url, formData)
      .then((res) => res.json())
      .then((res) => {
        thumbnail_id = res.thumbnail_id;
        thumbnail_url = res.thumbnail_url;
        file_name = res.file_name;
      });

    dispatch("inputThumbnail", { thumbnail_id, thumbnail_url, file_name });
  };
</script>

<form class="thumbnailInput" style="background-image: url({thumbnail_url});">
  <input
    type="file"
    accept=".jpg, .jpeg, .png"
    name="thumbnail"
    bind:this={thumbnailInput}
    on:change={inputFile}
  />
</form>

<style lang="scss">
  .thumbnailInput {
    height: 30vh;
    width: 30vh;
    position: relative;
    background-color: white;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    input {
      position: absolute;
      height: 100%;
      width: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }
</style>
