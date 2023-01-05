<script>
  import { getCategoryById } from "$lib/Helpers/Requests";
  import { onMount } from "svelte";
  import PostCategories from "$lib/Post/PostCategories.svelte";

  export let title = "";
  export let thumbnail = {};
  export let categories;
  export let time = 0;

  const thumbnail_url = thumbnail.thumbnail_url;

  const getCategories = async () => {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const id = category.category_id;

      const fetchedCategory = await getCategoryById(id);
      categories[i] = fetchedCategory;
    }
  };

  onMount(() => {
    getCategories();
  });
</script>

<div class="post__header">
  <div class="header__overall">
    <div
      class="post__thumbnail"
      style="background-image : url({thumbnail_url})"
    />
    <div class="post__text">{title}</div>
  </div>
</div>

<div class="post__readingTime">{time} minuty czytania</div>

<style lang="scss">
  .post__header {
    display: flex;
    justify-content: center;
    position: relative;

    .header__overall {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .post__text {
      position: absolute;
      right: 50%;
      top: 50%;
      transform: translate(50%, -50%);

      width: 100%;
      text-align: center;
      text-shadow: 1px 1px 2px black;
      color: white;
      font-size: 4.5rem;
      font-weight: 800;
    }

    .post__thumbnail {
      height: 105vh;
      width: 100vw;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      &:after {
        content: "\A";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.4);
      }
      img {
        height: 100%;
        width: 100%;
        border-radius: 30px;
      }
    }
  }
  .post__readingTime {
    font-size: 1.75rem;
    font-weight: 300;
    color: white;
    margin-top: 2vh;
  }
</style>
