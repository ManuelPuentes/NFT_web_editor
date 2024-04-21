<script>
  import Canvas from "./Canvas.svelte";
</script>

<div class="workspace">
  <Canvas />
</div>

<style>
  .workspace {
    width: 60%;
    height: 80%;
    background-color: var(--background_color);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border_color);
  }
</style>
