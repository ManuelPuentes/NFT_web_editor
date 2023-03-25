<script>
  import Canvas from "./Canvas.svelte";
</script>

<div class="workspace">
  <Canvas />
</div>

<style>
  .workspace {
    width: 60%;
    height: 100%;
    /* padding: 10px; */
    background-color: var(--background_color);

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
