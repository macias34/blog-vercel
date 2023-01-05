<script>
  import { isFormEmpty } from "$lib/Helpers/formValidation";
  import { createEventDispatcher } from "svelte";
  import Input from "$lib/UI/Input.svelte";
  import Button from "$lib/UI/Button.svelte";
  import Popup from "$lib/UI/Popup.svelte";

  import Editor from "$lib/Admin/UI/Editor.svelte";
  import { POST } from "$lib/Helpers/Requests";
  import InputThumbnail from "../UI/InputThumbnail.svelte";

  const dispatch = createEventDispatcher();

  export let categories = [];
  export let showForm = false;

  let title = "";
  let description = "";

  let thumbnail = {};
  let thumbnail_id = thumbnail.thumbnail_id;
  let thumbnail_url = thumbnail.thumbnail_url;
  let showPopup = false;
  let choosenCategories = [];

  const toggleForm = () => {
    showForm = !showForm;
  };

  const clearForm = () => {
    title = "";
    thumbnail_id = "";
  };

  // const storagePost = {
  //   title,
  //   description,d
  //   thumbnail_id,
  //   thumbnail_url,
  // };

  const addToGrid = (id, createdAt, categories) => {
    let url = title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?!<>{}]/g, "");

    const post = {
      post_id: id,
      title,
      description,
      thumbnail,
      createdAt,
      categories,
      url,
    };
    dispatch("addToGrid", post);
  };

  async function createPost() {
    let id;
    let createdAt;
    const adjustedCategories = choosenCategories.map((category) => {
      return { category_id: category.category_id };
    });

    const post = {
      title,
      description,
      thumbnail_id,
      categories: adjustedCategories,
    };

    const formFields = [title, description, thumbnail_id];

    if (isFormEmpty(formFields)) {
      showPopup = true;
      return;
    }

    const url = "/api/posts";
    const res = await POST(url, post)
      .then((res) => res.json())
      .then((res) => {
        id = res.post_id;
        createdAt = res.createdAt;
      });

    addToGrid(id, createdAt, adjustedCategories);
    clearForm();
    showForm = false;
  }

  const handleEditorChange = (e) => {
    description = e.detail.text;
  };

  const handleInputThumbnail = (e) => {
    thumbnail = e.detail;
  };
</script>

<Popup
  bind:showPopup
  title="Nie wypełniłeś wszystkich pól."
  message="Spróbuj ponownie ..."
/>

{#if showForm}
  <div class="post__form">
    <form on:submit|preventDefault={createPost}>
      <h1>
        {#if title.length > 0}
          {title}
        {:else}
          Dodaj post
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
            bind:thumbnail_id
            bind:thumbnail_url
          />

          <div class="post__categories">
            {#each categories as category}
              <div class="post__category">
                <input
                  type="checkbox"
                  class="category"
                  name="category"
                  value={category}
                  bind:group={choosenCategories}
                />
                <label for="category">{category.label}</label>
              </div>
            {/each}
          </div>
        </div>
        <Editor on:text-change={handleEditorChange} bind:description />
      </div>

      <Button type={"submit"}>Dodaj post</Button>
    </form>
  </div>

  <div class="post__form__backdrop" on:click={toggleForm} />
{/if}

<style lang="scss">
  .post__form__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.2);
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
      background-color: #111;
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
        .post__inputs {
          display: flex;
          width: 100%;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10vh;
        }
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
            color: white;
            transition: 0.2s;
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
              color: #111;
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
