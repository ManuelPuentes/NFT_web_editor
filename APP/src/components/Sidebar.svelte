<script>
  import Folder from "./Folder.svelte";
  import File from "./File.svelte";
</script>

<div class="side-bar">
  <Folder />
  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>
  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>

  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>
  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>
  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>
  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>
  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>
  <Folder>
    <File />
    <File />
    <File />
    <File />
  </Folder>
</div>

<style>
  @media (max-width: 200px) {
    .side-bar {
      display: none;
    }
  }

  .side-bar {
    width: 20%;
    min-width: 0;
    padding: 10px 0px;
    overflow-y: auto;
    background-color: #282a36;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;

  }
</style>
