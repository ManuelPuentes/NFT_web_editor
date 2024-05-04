<script lang="ts">
  import { onMount } from "svelte";
  import Moveable from "svelte-moveable";
  import {
    workspace_details,
    last_selected_item,
    assets_details,
  } from "../stores/web_app_state";

  import ImageContextMenu from "./ImageContextMenu.svelte";

  import type { MoveableBounds } from "../interfaces/BoundingRect";

  export let data = {
    file_name: "name",
    file_asset_path: "path",
    directory_name: "directory",
    styles: "",
    transform: "",
    scale: "",
    rotate: "",
  };

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
  let bounds: MoveableBounds = { left: 0, top: 0, right: 0, bottom: 0 };
  let moveableRef = null;
  let targetRef = null;

  let id = "id";
  let pos: {
    x: number;
    y: number;
  };
  let selected = "";
  let context_menu = false;
  let is_mouse_over = false;

  $: selected = $last_selected_item.id;
  $: context_menu = $last_selected_item.context_menu;

  const handleMouseOver = () => {
    is_mouse_over = true;
  };

  const handleMouseOut = () => {
    is_mouse_over = false;
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    $last_selected_item = { id, context_menu: false };
  };

  const rightClickContextMenu = (e: MouseEvent) => {
    $last_selected_item = { id, context_menu: true };
    pos = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  onMount(() => {
    const { left, top, right, bottom } =
      $workspace_details.workspace_bounding_rect;
    bounds = { left, top, right, bottom };

    id = `${data.directory_name}_${data.file_name}`;

    last_selected_item.set({ id, context_menu: false });
  });
</script>

<div class="img_container" {id}>
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img
    alt={id}
    bind:this={targetRef}
    src={data.file_asset_path}
    style={$assets_details[data.directory_name][data.file_name].styles}
    on:click|preventDefault={handleClick}
    on:contextmenu|preventDefault={rightClickContextMenu}
    on:mouseover={handleMouseOver}
    on:focus={handleMouseOver}
    on:mouseout={handleMouseOut}
    on:blur={handleMouseOut}
  />

  {#if is_mouse_over || selected === id}
    <Moveable
      bind:this={moveableRef}
      target={targetRef}
      origin={false}
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
        $assets_details[data.directory_name][data.file_name].styles = e.cssText;
      }}
      on:drag={({ detail: e }) => {
        e.target.style.transform = e.transform;
        $assets_details[data.directory_name][data.file_name].transform =
          e.transform;

        context_menu = false;
      }}
      on:scale={({ detail: e }) => {
        e.target.style.transform = e.drag.transform;
        $assets_details[data.directory_name][data.file_name].scale =
          e.drag.transform;

        context_menu = false;
      }}
      on:rotate={({ detail: e }) => {
        e.target.style.transform = e.afterTransform;
        $assets_details[data.directory_name][data.file_name].rotate =
          e.afterTransform;

        context_menu = false;
      }}
      on:bound={({ detail: e }) => {}}
    />
  {/if}

  {#if context_menu}
    <ImageContextMenu
      {pos}
      directory={data.directory_name}
      file={data.file_name}
    />
  {/if}
</div>

<style>
  img {
    position: absolute;
    align-items: center;
  }
</style>
