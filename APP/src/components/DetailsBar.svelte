<script>
  import { selected_element } from "../stores/web_app_state";
  $: element = $selected_element;
  // $: console.log(element);

</script>

<div class="details_bar">
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
</div>

<style>
  .details_bar {
    width: 20%;
    min-width: 0;
    padding: 10px;
    overflow-y: auto;
    background-color: var(--background_color);
    border-left: 1px solid var(--border_color);

  }

  .details_bar .details_container {
    width: 100%;
    list-style: none;
    margin: 5px;
    padding: 15px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }

  .details_container:hover {
    background-color: var(--primary_hover_color);
  }
</style>
