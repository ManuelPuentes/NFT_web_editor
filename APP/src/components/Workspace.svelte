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
    background-color: #282a36;


    display: flex;
    justify-content: center;
    align-items: center;

    
    border-left: 1px solid lightslategray;
    border-right: 1px solid lightslategray;

  }
</style>
