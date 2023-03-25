<script>
  export let file_data = {
    file_name: "file_name.svg",
    file_asset_path: "notfound.svg"
  };

</script>


<div class="file_name">
  &nbsp &nbsp {file_data.file_name}
</div>


<style>
  .file_name {
    width: 100%;
    /* height: 50px; */

    list-style: none;

    margin: 20px 0;

    padding: 5px;
    /* text-align: center; */

    /* color: black; */

    /* border: 1px solid black; */
    /* background-color: yellow; */

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }


  .file_name:hover{

    background-color: #3F4E4F;
    /* background-color: #3F4E4F; */

  }
</style>
