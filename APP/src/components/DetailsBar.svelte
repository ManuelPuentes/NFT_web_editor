<script>
  import { selected_element } from "../stores/web_app_state";
  $: element = $selected_element;
  // $: console.log(element);

</script>

<div class="details_bar">
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
</div>

<style>
  .details_bar {
    width: 20%;
    min-width: 0;
    padding: 10px;
    overflow-y: auto;
    /* overflow-x: hidden; */
    background-color: var(--background_color);
    border-left: 1px solid var(--border_color);

    display: flex;
    flex-flow: row wrap;
    align-items: center;

  }

  .details_bar .details_container {
    width: 90%;
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
