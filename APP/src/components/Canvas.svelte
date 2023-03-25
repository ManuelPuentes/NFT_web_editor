<script>
  import {
    selected_items,
    canvas_details,
    selected_element,
  } from "../stores/web_app_state";

  import Image from "./Image.svelte";

  import { onMount } from "svelte";

  let rendered_imgs = [];

  let canvas = null;

  onMount(() => {
    let canvas_store_state = $canvas_details;
    canvas_store_state["canvas_bounding_rect"] = canvas.getBoundingClientRect();
    canvas_details.set(canvas_store_state);

    selected_items.subscribe((value) => {
      rendered_imgs = Object.keys(value);
    });
  });

  const rightClick = (e) => {
    console.log("click derecho en el componente canvas");
  };

  const handleClick = (e) => {
    selected_element.set({
      element_ref: canvas,
      element_details: $canvas_details,
    });
  };
</script>

<div
  class="canvas"
  on:keyup={handleClick}
  on:contextmenu|preventDefault={rightClick}
  on:click|preventDefault={handleClick}
  bind:this={canvas}
  style:background-color={$canvas_details.canvas_def_color}
>
  {#each rendered_imgs as img_data, img_id}
    <Image src={$selected_items[img_data].file_asset_path} />
  {/each}
</div>

<style>
  .canvas {
    width: 80%;
    height: 80%;
    overflow: hidden;

  }
</style>
