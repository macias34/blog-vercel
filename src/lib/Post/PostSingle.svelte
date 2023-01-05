<script>
  import { generateExcerpt } from "$lib/Helpers/AdminTools.js";
  import { getCategoryById } from "$lib/Helpers/Requests";
  import { createEventDispatcher } from "svelte";
  import dayjs from "dayjs";
  import PostCategories from "./PostCategories.svelte";
  import { onMount } from "svelte";

  export let title = "";
  export let id = "";
  export let description = "";
  export let thumbnail = {};
  export let thumbnail_id = thumbnail.thumbnail_id;
  export let thumbnail_url = thumbnail.thumbnail_url;
  export let createdAt = "";
  export let categories = [];
  export let url = "";

  const getCategories = async () => {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const id = category.category_id;

      const fetchedCategory = await getCategoryById(id);
      categories[i] = fetchedCategory;
    }
  };

  const plainDescription = generateExcerpt(
    description.replace(/<\/?[^>]+(>|$)/g, "")
  );

  const formatDate = (date) => {
    return dayjs(date).format("MMMM DD, YYYY HH:mm");
  };

  const dispatch = createEventDispatcher();

  function deletePost() {
    dispatch("deletePost", post_id);
  }

  onMount(() => {
    getCategories();
  });
</script>

<div class="post">
  <a href="./{url}">
    <div
      class="post__thumbnail"
      style="background-image : url({thumbnail_url})"
    />
  </a>

  <PostCategories {categories} />

  <div class="post__content">
    <div class="post__title"><a href="./{url}">{title}</a></div>
    <div class="post__description">{plainDescription}</div>
  </div>
</div>

<style lang="scss">
  @import "../../scss/media_queries";
  .post {
    position: relative;
    width: 32%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 2vh 0;
    .post__thumbnail {
      height: 80vh;
      background-color: greenyellow;
      background-position: center;
      background-size: cover;
      border-radius: 30px;
      margin-bottom: 2vh;
      transition: 0.2s;
      &:hover {
        transform: translateY(-1%);
      }
    }

    .post__content {
      width: 90%;

      .post__title {
        font-size: 2.5rem;
        font-weight: 500;
        margin-bottom: 1vh;
        a {
          color: white;
        }
      }
      .post__description {
        font-size: 1.5rem;
        font-weight: 300;
        line-height: 2.5rem;
        text-align: left;
        color: white;
      }
    }
  }
</style>
