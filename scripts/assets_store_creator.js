const fs = require("fs");
const path = require("path");
require('dotenv').config()

let TRAITS_DIRECTORY_TREE = new Object();


const directory_tree_mapping = (
    input_path = "",
    traits_mapping
) => {
    if (fs.lstatSync(input_path).isDirectory()) {

        let traits_list = [];

        fs.readdirSync(input_path).map((inner_path) => {

            const result = directory_tree_mapping(
                path.join(input_path, inner_path),
            );

            if (result) {
                traits_list.push(result)
            }

            if (traits_list.length) {
                TRAITS_DIRECTORY_TREE[`${path.basename(input_path)}`] = traits_list;
            }

        });

    } else {
        
        const file_name = (path.basename(input_path)).replace('.svg', '');
        
        const assets_application_relative_path = ".\\imgs"+ input_path.split("assets")[1];

        let result = new Object();
        result[`${file_name}`] = assets_application_relative_path;
        return result;
    }

}



directory_tree_mapping(process.env.ASSETS_FOLDER_PATH);



fs.writeFileSync(
    path.join(__dirname, "..", "data.json"),
    JSON.stringify(TRAITS_DIRECTORY_TREE)
);











