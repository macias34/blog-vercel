<script>
  import { generateExcerpt } from "$lib/Helpers/AdminTools.js";
  import { getCategoryById } from "$lib/Helpers/Requests";
  import PostCategories from "$lib/Post/PostCategories.svelte";
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import dayjs from "dayjs";

  export let post_id = "";
  export let thumbnail = {};
  export let thumbnail_id = thumbnail.thumbnail_id;
  export let thumbnail_url = thumbnail.thumbnail_url;
  export let title = "";
  export let description = "";
  export let createdAt = "";
  export let url = "";
  export let categories = [];

  const plainDescription = generateExcerpt(
    description.replace(/<\/?[^>]+(>|$)/g, "")
  );
  const date = dayjs(createdAt).format("MMMM DD");
  const dispatch = createEventDispatcher();

  const getCategories = async () => {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const id = category.category_id;

      const fetchedCategory = await getCategoryById(id);
      categories[i] = fetchedCategory;
    }
  };

  function deletePost() {
    dispatch("deletePost", post_id);
  }
  function editPost() {
    const post = {
      post_id,
      title,
      createdAt,
      description,
      thumbnail,
      categories,
    };

    dispatch("editPost", post);
  }

  onMount(() => {
    getCategories();
  });
</script>

<div class="posts__post" on:click>
  <!-- <div class="post__thumbnail" style="background-image : url({thumbnail_url})" /> -->
  <div class="post__title"><a href="/{url}">{title}</a></div>

  <PostCategories bind:categories />

  <div class="post__footer">
    <div class="post__date"><i class="fa-regular fa-calendar" /> {date}</div>
    <div class="post__tools">
      <div class="post__edit" on:click={editPost}>
        <i class="fa-solid fa-pen-to-square" />
      </div>
      <div class="post__delete" on:click={deletePost}>
        <i class="fa-solid fa-trash-can" />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "https://cdn.quilljs.com/1.3.6/quill.snow.css";
  .posts__post {
    height: 40vh;
    width: 32%;
    background-color: #111111;
    padding: 3vh;
    margin: 1.5vh 0;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    color: white;
    .post__title {
      width: 100%;
      font-size: 2rem;
      font-weight: 800;

      a {
        color: inherit;
        text-decoration: none;
      }
    }

    .post__description {
      font-size: 1.3rem;
      color: gray;
    }

    .post__footer {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .post__date {
        font-size: 1.5rem;

        i {
          margin-right: 0.5vh;
        }
      }

      .post__tools {
        display: flex;
        div {
          height: 3.5vh;
          width: 3.5vh;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 1.3rem;
          cursor: pointer;
          &.post__edit {
            background-color: royalblue;
            margin-right: 1vh;
          }
          &.post__delete {
            background-color: red;
          }
        }
      }
    }
  }
</style>
