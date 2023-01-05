<script>
  import { createEventDispatcher } from "svelte";
  import { DELETE } from "$lib/Helpers/Requests";
  const dispatch = createEventDispatcher();

  export let img_id = 0;
  export let file_name = "img";
  export let url =
    "https://cdn.iconscout.com/icon/free/png-256/gallery-187-902099.png";
  export let height = 0;
  export let width = 0;

  const apiUrl = `/api/images/${file_name}`;

  const deleteImg = async () => {
    await DELETE(apiUrl);
    dispatch("deleteImg", img_id);
  };

  const editImg = () => {
    const img = {
      img_id,
      file_name,
      url,
    };
    dispatch("editImg", img);
  };
</script>

<div class="img__single">
  <div class="img__thumbnail" style="background-image: url('{url}');">
    <div class="img__delete" on:click={deleteImg}>
      <i class="fa-solid fa-trash-can" />
    </div>
  </div>
  <!-- <div class="img__name">{file_name}</div> -->
</div>

<style lang="scss">
  .img__single {
    height: 40vh;
    width: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .img__thumbnail {
      height: 75%;
      width: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: white;
      position: relative;
      border: 3px solid white;
      border-radius: 10px;
    }

    .img__name {
      width: 100%;
      font-size: 1.2rem;
      font-weight: 700;
      text-align: center;
    }

    .img__delete,
    .img__edit {
      height: 4vh;
      width: 4vh;
      border-radius: 50%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      position: absolute;
      cursor: pointer;
    }

    .img__delete {
      background-color: red;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }

    .img__edit {
      background-color: royalblue;
      top: 15%;
      right: 0;
      transform: translate(50%, -50%);
    }
  }
</style>
