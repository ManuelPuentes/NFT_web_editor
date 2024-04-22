<script>
  import { selected_items, selected_element } from "../stores/web_app_state";

  let file = null;
  let active_item = false;

  export let file_data = {
    file_name: "file_name.svg",
    file_asset_path: "notfound.svg",
  };

  export let folder_name = "folder";

 

  $: active_item = $selected_items[`${folder_name}`] == file_data;

  const handleClick = (e) => {
    const current_item_selected = $selected_items[`${folder_name}`];

    if (current_item_selected != file_data) {
      const new_state = {
        ...$selected_items,
        [`${folder_name}`]: file_data,
      };

      selected_items.set(new_state);
      selected_element.set({
        element_ref: file,
        element_details: file_data,
      });
    } else {
      const new_state = $selected_items;
      delete $selected_items[`${folder_name}`];
      selected_items.set(new_state);

      selected_element.set({
        element_ref: null,
        element_details: null,
      });
    }
  };
</script>

<div
  class="file_name"
  on:click={handleClick}
  on:keyup={handleClick}
  bind:this={file}
>
  {#if active_item}
    <span class="fa-regular fa-eye" />
  {/if}

  {file_data.file_name}
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
