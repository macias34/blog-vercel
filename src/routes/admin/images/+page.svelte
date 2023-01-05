<script context="module">
  import ImagesPanel from "$lib/Admin/Images/ImagesPanel.svelte";
</script>

<script>
  export let data = {};
  let imgs = data.imgs;
</script>

<svelte:head>
  <title>Images Panel</title>
</svelte:head>

<ImagesPanel bind:imgs />
