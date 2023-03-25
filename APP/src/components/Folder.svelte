<script>
  import { linear } from "svelte/easing";
  import { slide } from "svelte/transition";

  export let folder_name = "folder_name";

  let flag = false;

  const handleClick = () => {
    flag = !flag;
  };

  let animation_options = { duration: 200, easing: linear };

  $: folder_expanded = flag;
</script>

<div class="folder">
  <div class="folder_name" on:click={handleClick} on:keyup={handleClick}>
    {#if folder_expanded}
      <span class="fa fa-chevron-down" />
      &nbsp
      <i class="fa-regular fa-folder-open" />
    {:else}
      <span class="fa-solid fa-chevron-right" />
      &nbsp
      <i class="fa-solid fa-folder" />
    {/if}
    &nbsp {folder_name}
  </div>

  {#if folder_expanded}
    <div class="folder_content" transition:slide={animation_options}>
      <slot>
        <div class="empty_folder_msg">&nbsp &nbsp empty folder</div>
      </slot>
    </div>
  {/if}
</div>

<style>
  .folder {
    width: 90%;
    min-width: 0;
    margin: 5px;
    padding: 15px;
    background-color: var(--background_color);

    /* display: flex;
    flex-flow: column wrap; */
  }

  .folder:hover {
    background-color: var(--primary_hover_color);
  }

  .folder_name {
    width: 100%;
    min-width: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .folder_content {
    width: 100%;

    margin: 0 auto;

    padding: 5px;
    /* background-color: green; */
  }

  .empty_folder_msg {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
