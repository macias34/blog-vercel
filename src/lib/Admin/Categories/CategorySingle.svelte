<script>
  import { getPostById } from "$lib/Helpers/Requests";
  import { createEventDispatcher } from "svelte";
  import CategoryPosts from "./CategoryPosts.svelte";
  import { onMount } from "svelte";

  const dispatch = createEventDispatcher();

  export let label = "";
  export let category_id = 0;
  export let createdAt = "";
  export let color = "";
  export let posts = [];

  function deleteCategory() {
    dispatch("deleteCategory", category_id);
  }

  function editCategory() {
    const category = {
      category_id,
      label,
      color,
      posts,
    };

    dispatch("editCategory", category);
  }

  const getPosts = async () => {
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const id = post.post_id;

      const fetchedPost = await getPostById(id);
      posts[i] = fetchedPost;
    }
  };

  onMount(() => {
    getPosts();
  });
</script>

<div class="categories__category" style="border : 3px solid {color};">
  <!-- <div class="post__thumbnail" style="background-image : url({thumbnail_url})" /> -->
  <div class="category__title">{label}</div>

  <CategoryPosts {posts} />
  <div class="category__footer">
    <div class="category__tools">
      <div class="category__edit" on:click={editCategory}>
        <i class="fa-solid fa-pen-to-square" />
      </div>
      <div class="category__delete" on:click={deleteCategory}>
        <i class="fa-solid fa-trash-can" />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .categories__category {
    width: 32%;
    background-color: #111111;
    padding: 2vh;
    margin: 1.5vh 0;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: white;

    .category__thumbnail {
      height: 80%;
      width: 25%;

      background-position: center;
      background-size: cover;
      border-radius: 15px;
    }

    .category__title {
      width: 100%;
      font-size: 2rem;
      font-weight: 800;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .category__footer {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .category__date {
        font-size: 1.5rem;

        i {
          margin-right: 0.5vh;
        }
      }

      .category__tools {
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
          &.category__edit {
            background-color: royalblue;
            margin-right: 1vh;
          }
          &.category__delete {
            background-color: red;
          }
        }
      }
    }
  }
</style>
