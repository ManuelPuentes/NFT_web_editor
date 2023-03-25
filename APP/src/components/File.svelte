<script>
  import { selected_item, selected_items } from "../stores/web_app_state";

  let active_item = false;

  export let file_data = {
    file_name: "file_name.svg",
    file_asset_path: "notfound.svg",
    directory_name: "directory_name",
  };

  $: active_item = $selected_items[`${file_data.directory_name}`] == file_data;

  const handleClick = (e) => {
    const current_item_selected =
      $selected_items[`${file_data.directory_name}`];

    if (current_item_selected != file_data) {
      const new_state = {
        ...$selected_items,
        [`${file_data.directory_name}`]: file_data,
      };

      selected_items.set(new_state);

    } else {
      const new_state = $selected_items;
      delete $selected_items[`${file_data.directory_name}`];
      selected_items.set(new_state);
    }

  };

  // const handleClick = (e) => {
  //   if ($selected_item != file_data) {
  //     selected_item.set(file_data);
  //   } else {
  //     selected_item.set({
  //       file_name: null,
  //       file_asset_path: null,
  //       directory_name: null,
  //     });
  //   }
  // };



</script>

<div class="file_name" on:click={handleClick} on:keyup={handleClick}>
  {#if active_item}
    <span class="fa-regular fa-eye" />
  {/if}

  &nbsp &nbsp {file_data.file_name}
</div>

<style>
  .file_name {
    width: 100%;
    /* height: 50px; */

    list-style: none;

    margin: 20px 0;

    padding: 5px;
    /* text-align: center; */

    /* color: black; */

    /* border: 1px solid black; */
    /* background-color: yellow; */

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .file_name:hover {
    background-color: #3f4e4f;
    /* background-color: #3F4E4F; */
  }
</style>
