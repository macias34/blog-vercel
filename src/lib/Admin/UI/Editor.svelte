<script>
  import { onMount } from "svelte";

  export let description = "";

  let editor;

  onMount(async () => {
    const { Quill, options } = await import("./Quill");

    let quill = new Quill(editor, options);

    quill.clipboard.dangerouslyPasteHTML(0, description);

    quill.on("text-change", () => {
      description = quill.root.innerHTML;
    });
  });
</script>

<div class="quill">
  <div bind:this={editor} />
</div>

<style lang="scss">
  @import "./styles/quill.snow.css";
  .quill {
    width: 75%;
    height: 85%;
    color: white;
  }
</style>
