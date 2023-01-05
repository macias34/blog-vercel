<script>
  import { page } from "$app/stores";
</script>

<div class="error">
  <span class="code">
    {$page.status}
  </span>
  <span class="message">{$page.error?.message}</span>
</div>

<style lang="scss">
  .error {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #111;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    color: white;
    .code {
      font-size: 5rem;
      font-weight: 200;
      line-height: 1;
      margin-right: 3vh;
    }

    .message {
      font-size: 2.5rem;
      font-weight: 200;
    }
  }
</style>
