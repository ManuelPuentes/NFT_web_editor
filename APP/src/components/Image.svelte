<script>
  import Moveable from "svelte-moveable";

  import { selected_items, canvas_details } from "../stores/web_app_state";

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
/>
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

<style>
  img {
    position: absolute;
  }
</style>
