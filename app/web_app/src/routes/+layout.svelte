<script>
  import Sidebar from "../components/Sidebar.svelte";
  import Workspace from "../components/Workspace.svelte";
</script>

<div class="app">
  <div class="container">
    <Sidebar />
    <Workspace />
  </div>
</div>

<style>
  .app {
    width: 1920px;
    height: 1080px;
    max-width: 1920px;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
  }

  .container {
    width: 1920px;
    height: 1080px;

    display: flex;
    background-color: var(--background_color);
    align-items: center;
    justify-content: center;

    overflow: scroll;
    border: 1px solid var(--border_color);
  }
</style>
