<script>
  export let name = "";
  export let value = "";
  export let type = "text";

  name = name.toLowerCase();
  const placeholder = name.charAt(0).toUpperCase() + name.slice(1);
</script>

{#if type === "text"}
  <input type="text" {name} {placeholder} bind:value />
{:else if type === "password"}
  <input type="password" {name} {placeholder} bind:value />
{/if}

<style lang="scss">
  input {
    margin: 2vh 0;
    height: 5vh;
    width: 15vw;
    text-align: center;
  }
</style>
