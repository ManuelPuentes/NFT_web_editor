<script lang="ts">
  import type { AssetDetails } from "../interfaces/AssetDetails";
  import { selected_items } from "../stores/web_app_state";

  let file = null;
  let active_item = false;

  export let folder_name = "folder";
  export let file_name = "folder";
  export let file_data: AssetDetails;

  $: active_item = $selected_items[folder_name] == file_data;

  const handleClick = (e: MouseEvent) => {
    const current_item_selected: any = $selected_items[folder_name];

    let new_state = {};

    delete $selected_items[folder_name];

    if (current_item_selected != file_data) {
      new_state = {
        ...$selected_items,
        [folder_name]: file_data,
      };
    } else {
      new_state = $selected_items;
    }

    selected_items.set(new_state);

    console.log($selected_items);
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="file_name" on:click={handleClick} bind:this={file}>
  {file_name}
  {#if active_item}
    <span class="fa-regular fa-eye" />
  {/if}
</div>

<style>
  .file_name {
    width: 100%;
    list-style: none;
    margin: 20px 0;
    padding: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .file_name:hover {
    background-color: var(--secondary_hover_color);
    /* background-color: #3F4E4F; */
  }
</style>
