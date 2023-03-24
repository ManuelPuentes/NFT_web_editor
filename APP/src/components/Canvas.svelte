<script>
  let node;

  const rightClick = (e) => {


    console.log("click derecho en el componente canvas");

  };
</script>

<div
  class="canvas"
  bind:this={node}
  on:contextmenu|preventDefault={rightClick}
/>

<style>
  .canvas {
    width: 80%;
    height: 80%;
    background-color: #dbdbdb;
  }
</style>
