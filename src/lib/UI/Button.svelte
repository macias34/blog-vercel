<script>
  export let type = "button";
  export let mode = "normal";
</script>

<button {type} on:click class:big={mode === "big"}> <slot /> </button>

<style lang="scss">
  @import "../../scss/variables";

  button {
    padding: 1vh 2vh;
    margin: 2vh;
    border: 2px solid white;
    border-radius: 30px;
    background-color: #111;
    color: white;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: white;
      border: 2px solid #111;
      color: #111;
    }

    &.big {
      font-size: 2rem;
      padding: 1vh 3vh;
    }
  }
</style>
