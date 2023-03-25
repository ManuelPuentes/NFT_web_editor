<script>
  import Toolbar from "../components/Toolbar.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import Workspace from "../components/Workspace.svelte";
  import DetailsBar from "../components/DetailsBar.svelte";
</script>

<div class="app">
  <!-- <Toolbar /> -->
  <div class="container">
    <Sidebar />
    <Workspace />

    <DetailsBar/>
  </div>

</div>

<svelte:body 
  on:contextmenu|preventDefault={()=>{}} 
  on:resize|preventDefault={(console.log("resize"))}
  
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
    /* height: 85%; */
    /* flex-grow: 5; */
    width: 100%;
    height: 100%;
    display: flex;
    background-color: white;
  }
</style>
