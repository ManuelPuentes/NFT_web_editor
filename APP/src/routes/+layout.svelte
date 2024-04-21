<script>
  import Toolbar from "../components/Toolbar.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import Workspace from "../components/Workspace.svelte";
  import DetailsBar from "../components/DetailsBar.svelte";
</script>

<div class="app">
  <div class="container">
    <Sidebar />
    <Workspace />
  </div>
</div>

<svelte:body
  on:contextmenu|preventDefault={() => {}}
  on:resize|preventDefault={console.log("resize")}
/>

<style>
  .app {
    width: 100vw;
    height: 100vh;
    max-width: 1920px;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: var(--background_color);
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border_color);
  }
</style>
