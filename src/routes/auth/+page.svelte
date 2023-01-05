<script>
  import Input from "$lib/Auth/Input.svelte";
  import Button from "$lib/UI/Button.svelte";
  import { enhance } from "$app/forms";

  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<h1>Login</h1>
<form method="post" use:enhance on:submit|preventDefault>
  <Input name={"username"} />
  <Input name={"password"} />
  <Button type={"submit"}>Login</Button>
</form>

{#if form?.error}
  <h1 class="error">{form.error}</h1>
{/if}

<style lang="scss">
  form {
    margin: 3vh 0;
    padding: 5vh;
    border-radius: 30px;
    border: 2px solid white;
    display: flex;
    flex-direction: column;
  }

  .error {
    color: #cc0000;
  }
</style>
