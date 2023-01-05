<script>
  import { onDestroy, onMount } from "svelte";

  import Button from "./Button.svelte";
  export let title = "Alert title";
  export let message = "Something went wrong..";

  export let showPopup = false;
  const hidePopup = () => (showPopup = false);
</script>

{#if showPopup}
  <div class="popup">
    <div class="popup__title">{title}</div>
    <div class="popup__message">{message}</div>
    <Button mode="big" on:click={hidePopup}>Okej</Button>
  </div>
  <div class="popup__backdrop" on:click={hidePopup} />
{/if}

<style lang="scss">
  .popup {
    width: 50%;
    height: 40%;
    background-color: #111;
    border-radius: 10px;
    border: 2px solid white;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;

    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    .popup__title {
      font-size: 3rem;
      text-align: center;
    }

    .popup__message {
      text-align: center;
      font-size: 2rem;
      font-weight: 300;
    }
  }

  .popup__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 60;
  }
</style>
