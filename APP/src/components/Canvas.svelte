<script>
  import {
    draw_order,
    selected_items,
    canvas_details,
  } from "../stores/web_app_state";

  import { onMount } from "svelte";
  import Image from "./Image.svelte";

  const handleClick = (e) => {};

  onMount(() => {
    let canvas_store_state = $canvas_details;
    canvas_store_state["canvas_bounding_rect"] = canvas.getBoundingClientRect();
    canvas_details.set(canvas_store_state);
  });

  let canvas = null;
</script>

<div
  class="canvas"
  id="canvas"
  bind:this={canvas}
  on:click|preventDefault={handleClick}
  on:keyup={handleClick}
>
  {#each $draw_order as element, img_id}
    {#if $selected_items[element] != undefined}
      <Image id={element} src={$selected_items[element].file_asset_path} />
    {/if}
  {/each}
</div>

<style>
  .canvas {
    width: 80%;
    height: 80%;
    background-color: #dbdbdb;
  }
</style>
