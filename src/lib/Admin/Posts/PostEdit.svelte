<script>
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import { GET } from "$lib/Helpers/Requests";
  import InputThumbnail from "./../UI/InputThumbnail.svelte";
  import Input from "$lib/UI/Input.svelte";
  import Button from "$lib/UI/Button.svelte";
  import Popup from "$lib/UI/Popup.svelte";
  import Editor from "$lib/Admin/UI/Editor.svelte";
  import { sanitizePostUrl } from "$lib/Server/sanitize";

  const dispatch = createEventDispatcher();

  export let showEdit = false;
  export let post = {};
  export let post_id = 0;
  export let description = "";
  export let title = "";
  export let url = "";
  export let thumbnail = {};
  export let thumbnail_id = thumbnail.thumbnail_id;
  export let categories = [];
  export let createdAt = "";
  export let showForm = false;

  let allCategories = [];
  let checkedArr = [];
  let showPopup = false;
  let thumbnail_url = thumbnail.thumbnail_url;
  let images = [];
  // $: console.table(categories);

  const hideForm = () => {
    showEdit = false;
  };

  const checkInputs = () => {
    allCategories.forEach((category) => {
      category.checked = false;
    });

    categories.forEach((category) => {
      const categoryIndex = allCategories.findIndex(
        (e) => e.category_id === category.category_id
      );
      allCategories[categoryIndex].checked = true;
    });
  };

  const getCategories = async () => {
    const url = `/api/categories/`;
    const res = await GET(url);

    const fetchedCategories = await res.json();

    if (res.ok) {
      allCategories = fetchedCategories;

      return {
        status: 200,
        props: {
          fetchedCategories,
        },
      };
    }

    return {
      status: res.status,
      error: new Error("Couldn't fetch the posts"),
    };
  };

  const submitEdit = () => {
    url = sanitizePostUrl(url);

    post = {
      post_id,
      title,
      description,
      thumbnail,
      createdAt,
      categories,
      url,
    };

    dispatch("submitEdit", post);
  };

  const handleEditorChange = (e) => {
    description = e.detail.text;
  };

  const handleInputThumbnail = (e) => {
    thumbnail.thumbnail_id = e.detail.thumbnail_id;
    thumbnail.thumbnail_url = e.detail.thumbnail_url;
    thumbnail.file_name = e.detail.file_name;
    thumbnail_id = e.detail.thumbnail_id;
  };

  onMount(async () => {
    await getCategories();
    checkInputs();
  });
</script>

<Popup
  bind:showPopup
  title="Nie wypełniłeś wszystkich pól."
  message="Spróbuj ponownie ..."
/>

{#if showEdit}
  <div class="post__form">
    <form on:submit|preventDefault={submitEdit}>
      <h1>
        {#if title.length > 0}
          {title}
        {:else}
          Aktualizuj post
        {/if}
      </h1>

      <div class="post__form_main">
        <div class="post__form_overall">
          <Input
            placeholder="Title"
            bind:value={title}
            align="center"
            margin={2}
          />

          <InputThumbnail
            on:inputThumbnail={handleInputThumbnail}
            bind:thumbnail_url
            bind:thumbnail_id
          />

          <div class="post__categories">
            {#each allCategories as category}
              <div class="post__category">
                <input
                  type="checkbox"
                  class="category"
                  name="category"
                  value={category}
                  bind:group={categories}
                  bind:checked={category.checked}
                />
                <label for="category">{category.label}</label>
              </div>
            {/each}
          </div>
        </div>
        <Editor
          on:text-change={handleEditorChange}
          bind:description
          bind:images
        />
      </div>

      <Button type={"submit"}>Aktualizuj post</Button>
    </form>
  </div>

  <div class="post__form__backdrop" on:click={hideForm} />
{/if}

<style lang="scss">
  .post__form__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #fff, $alpha: 0.5);
  }
  .post__form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    form {
      display: flex;
      flex-direction: column;
      height: 95vh;
      width: 95vw;
      align-items: center;
      justify-content: space-between;
      background-color: #111111;
      overflow-y: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
      }

      .post__form_main {
        height: 80%;
        display: flex;
        // align-items: ce;
        justify-content: space-between;
        padding: 0 5vh;
        margin-top: 5vh;
      }

      h1 {
        color: white;
        margin-top: 3vh;
      }

      .post__form_overall {
        height: 100%;
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
      }

      .post__categories {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }

        .post__category {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 2vh;
          border-radius: 30px;

          position: relative;
          transition: 0.2s;
          color: white;

          cursor: pointer;
          label {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            border: 2px solid white;
            border-radius: 30px;
            padding: 1vh 1.5vh;
            font-size: 1.2rem;
            transition: 0.2s;
            color: white;
          }

          input.category {
            height: 100%;
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            cursor: pointer;

            &:checked ~ label {
              background-color: white;
              color: black;
            }
          }
        }
      }

      .form__field {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
      }
    }
  }
</style>
