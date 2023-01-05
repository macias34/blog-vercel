<script>
  import { isFormEmpty } from "$lib/Helpers/formValidation";
  import { createEventDispatcher } from "svelte";
  import { POST } from "$lib/Helpers/Requests";
  import Input from "$lib/UI/Input.svelte";
  import Button from "$lib/UI/Button.svelte";
  import Popup from "$lib/UI/Popup.svelte";

  const dispatch = createEventDispatcher();

  export let showForm = false;
  let label = "";
  let color = "";
  let showPopup = false;

  const toggleForm = () => {
    showForm = !showForm;
  };

  const clearForm = () => {
    label = "";
    color = "";
  };

  const addToGrid = (id) => {
    const categoryData = {
      category_id: id,
      label,
      color,
    };
    dispatch("addToGrid", categoryData);
  };

  async function addCategory() {
    let id;
    const formFields = [label, color];

    if (isFormEmpty(formFields)) {
      showPopup = true;

      return;
    }
    const post = {
      label,
      color,
    };

    const url = "/api/categories";
    const res = await POST(url, post)
      .then((res) => res.json())
      .then((res) => {
        id = res.category_id;
      });

    addToGrid(id);
    clearForm();
    showForm = false;
  }
</script>

<Popup
  bind:showPopup
  title="Nie wypełniłeś wszystkich pól."
  message="Spróbuj ponownie ..."
/>

<div class="categories__form">
  <form on:submit|preventDefault={addCategory}>
    <h1>Dodaj kategorie</h1>

    <Input placeholder="Tytuł kategorii" bind:value={label} width={85} />
    <div class="form__color">
      <input class="color" type="color" bind:value={color} />
    </div>

    <Button type={"submit"}>Dodaj kategorie</Button>
  </form>
</div>

<div class="categories__form__backdrop" on:click={toggleForm} />

<style lang="scss">
  .categories__form__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
  .categories__form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;

    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 40vh;
      justify-content: space-evenly;
      align-items: center;
      background-color: #111;
      border-radius: 15px;

      .form__color {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        font-size: 1.2rem;
        .color {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 50px;
          height: 50px;
          background-color: transparent;
          border: none;
          cursor: pointer;

          &::-webkit-color-swatch {
            border-radius: 15px;
          }
        }
      }

      h1 {
        color: white;
      }

      .form__field {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
      }
    }
  }
</style>
