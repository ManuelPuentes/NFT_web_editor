<script>
  import { selected_element } from "../stores/web_app_state";
  $: element = $selected_element;
  $: console.log(element);

  let json = {
    glossary: {
      title: "example glossary",
      GlossDiv: {
        title: "S",
        GlossList: {
          GlossEntry: {
            ID: "SGML",
            SortAs: "SGML",
            GlossTerm: "Standard Generalized Markup Language",
            Acronym: "SGML",
            Abbrev: "ISO 8879:1986",
            GlossDef: {
              para: "A meta-markup language, used to create markup languages such as DocBook.",
              GlossSeeAlso: ["GML", "XML"],
            },
            GlossSee: "markup",
          },
        },
      },
    },
  };
</script>

<div class="details_bar">
  <div class="details_container">detailsssssssssssssssssssssssssssssssssssssss</div>
</div>

<style>
  .details_bar {
    width: 20%;
    min-width: 0;
    padding: 10px 0px;
    overflow-y: auto;
    background-color: #282a36;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  .details_bar .details_container {
    width: 100%;
    list-style: none;
    margin: 20px 0;
    padding: 5px;
  }

  .details_container:hover {
    background-color: red;
  }
</style>
