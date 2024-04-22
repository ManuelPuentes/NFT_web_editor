<script>
  import Moveable from "svelte-moveable";

  import { selected_items, canvas_details, last_selected_item } from "../stores/web_app_state";

  export let src =
    "https://img.freepik.com/vector-gratis/linea-rizada-deja-garabatos_78370-2093.jpg?w=740&t=st=1713278805~exp=1713279405~hmac=b2dc6c847d50ec6cbe2e4ec4b6dbd806eb0e144f15fcaf8549f94d85a761619e";

  export let id = "id";

  const draggable = true;
  const throttleDrag = 1;
  const edgeDraggable = false;
  const startDragRotate = 0;
  const throttleDragRotate = 0;
  const scalable = true;
  const keepRatio = false;
  const throttleScale = 0;
  const snappable = true;
  const rotatable = true;
  let bounds = { left: 0, top: 0, right: 0, bottom: 0, position: "css" };
  let moveableRef = null;
  let targetRef = null;

  import { onMount } from "svelte";

  // if mouse is over the image, this variable will be true
  let is_mouse_over = false;

  let selected;
  last_selected_item.subscribe((v) => {
		selected = v;
	});

  const handleMouseOver = () => {
    is_mouse_over = true;
  };

  const handleMouseOut = () => {
    is_mouse_over = false;
  };

  const handleClick = () => {
    console.log("clicked", id);
      last_selected_item.set(id);
  };

  onMount(() => {
    const { left, top, right, bottom } = $canvas_details.canvas_bounding_rect;
    bounds = { left, top, right, bottom };
  });
</script>

<img
  {src}
  {id}
  bind:this={targetRef}
  alt=""
  style={$selected_items[id].styles}
  on:click={handleClick}
  on:keypress={handleClick}
  on:mouseover={handleMouseOver}
  on:focus={handleMouseOver}
  on:mouseout={handleMouseOut}
  on:blur={handleMouseOut}
/>
{#if is_mouse_over || selected === id} 
<Moveable
  bind:this={moveableRef}
  target={targetRef}
  {draggable}
  {rotatable}
  {throttleDrag}
  {edgeDraggable}
  {startDragRotate}
  {throttleDragRotate}
  {scalable}
  {keepRatio}
  {throttleScale}
  {snappable}
  {bounds}
  on:render={({ detail: e }) => {
    e.target.style.cssText += e.cssText;
    $selected_items[id].styles = e.cssText;
  }}
  on:drag={({ detail: e }) => {
    e.target.style.transform = e.transform;

    $selected_items[id].transform = e.transform;
  }}
  on:scale={({ detail: e }) => {
    e.target.style.transform = e.drag.transform;
    $selected_items[id].scale = e.drag.transform;
  }}
  on:rotate={({ detail: e }) => {
    e.target.style.transform = e.afterTransform;
    $selected_items[id].rotate = e.afterTransform;
  }}
  on:bound={({ detail: e }) => {}}
/>
{/if}

<style>
  img {
    position: absolute;
  }
</style>
