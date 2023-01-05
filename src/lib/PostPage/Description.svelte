<script>
  export let description = "";
</script>

<div class="ql-editor">
  {@html description}
</div>

<style lang="scss">
  .ql-editor {
    margin: 2vh 0;
    font-size: 15px;
    width: 60%;
  }
  @import "https://cdn.quilljs.com/1.3.6/quill.snow.css";
</style>
