<script>
  import Folder from "./Folder.svelte";
  import File from "./File.svelte";
  import { Assets } from "../stores/assets";

  const folders = Object.keys($Assets);
</script>

<div class="side-bar">
  {#each folders as folder_name, folder_id}
    <Folder {folder_name}>
      {#each $Assets[folder_name] as file_data, file_id}
        <File {file_data} />
      {/each}
    </Folder>
  {/each}
</div>

<style>
  @media (max-width: 200px) {
    .side-bar {
      display: none;
    }
  }

  .side-bar {
    width: 20%;
    min-width: 0;
    padding: 10px 0px;
    overflow-y: auto;
    background-color: #282a36;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;

  }
</style>
