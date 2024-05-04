<script>
  // @ts-nocheck

  import Folder from "./Folder.svelte";
  import File from "./File.svelte";

  import { draw_order, assets_details } from "../stores/web_app_state";
  import SortableList from "svelte-sortable-list";

  let folders = $draw_order;

  const sortList = (e) => {
    folders = e.detail;
    $draw_order = e.detail;
  };
</script>

<div class="side-bar">
  <SortableList list={folders} key="" on:sort={sortList} let:item let:index>
    <Folder folder_name={item}>
      {#each Object.keys($assets_details[item]) as file}
        <File
          folder_name={item}
          file_name={file}
          file_data={$assets_details[item][file]}
        />
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
