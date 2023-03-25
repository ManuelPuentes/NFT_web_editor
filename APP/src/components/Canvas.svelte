<script>
  import { selected_items } from "../stores/web_app_state";

  import Image from "./Image.svelte";

  import { onMount } from "svelte";

  let rendered_imgs = [];

  onMount(() => {
    selected_items.subscribe((value) => {
      rendered_imgs = Object.keys(value);
    });
  });

  const rightClick = (e) => {
    console.log("click derecho en el componente canvas");
  };
</script>

<div class="canvas" on:contextmenu|preventDefault={rightClick}>
  {#each rendered_imgs as img_data, img_id}
    <Image src={$selected_items[img_data].file_asset_path} />
  {/each}
</div>

<style>
  .canvas {
    width: 80%;
    height: 80%;
    background-color: #dbdbdb;
  }
</style>
