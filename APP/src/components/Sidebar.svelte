<script>
  import Folder from "./Folder.svelte";
  import File from "./File.svelte";
  import { Assets } from "../stores/assets";
  import { onMount } from "svelte";

  import { draw_order } from "../stores/web_app_state";
  import SortableList from "svelte-sortable-list";

  let folders = Object.keys($Assets);
  const sortList = (ev) => {
    folders = ev.detail;
    $draw_order = ev.detail;
  };
</script>

<div class="side-bar">
  <SortableList list={folders} on:sort={sortList} let:item let:index>
    <Folder folder_name={item}>
      {#each $Assets[item] as file_data, file_id}
        <File {file_data} folder_name={item} />
      {/each}
    </Folder>
  </SortableList>
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
    height: 80%;
    background-color: var(--background_color);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border: 1px solid var(--border_color);
  }
</style>
