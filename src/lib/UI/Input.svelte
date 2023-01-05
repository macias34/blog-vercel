<script>
  import { onMount } from "svelte";

  export let type = "text";
  export let placeholder = "";
  export let value = "";
  export let align = "left";
  export let margin = 0;
  export let width = 100;
  export let rows = "2";
</script>

{#if type === "text"}
  <input
    {placeholder}
    bind:value
    style="text-align : {align}; margin-bottom : {margin}vh; width: {width}%;"
  />
{:else}
  <textarea {rows} {placeholder} bind:value />
{/if}

<style lang="scss">
  input {
    all: unset;
    height: 4vh;
    border-bottom: 2px solid white;
    transition: 0.3s;
    font-size: 1.2rem;
    color: white;

    &:focus {
      border-bottom: 2px solid wheat;
    }
  }

  textarea {
    border: none;
    outline: none;
    width: 80%;
    transition: 0.3s;
    border-bottom: 2px solid white;
    font-size: 1.2rem;

    &:focus {
      border-bottom: 2px solid wheat;
    }
  }
</style>
