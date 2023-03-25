<script>
  export let src = "image.svg";
  let img;
</script>

<img bind:this={img} {src} alt="" class="non_visible_img" />

<style>
  .non_visible_img {
    /* display: none; */
  }
</style>
