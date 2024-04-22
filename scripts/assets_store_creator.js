const fs = require("fs");
const path = require("path");
require('dotenv').config()

let TRAITS_DIRECTORY_TREE = new Object();


const directory_tree_mapping = (
    input_path = "",
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
        const assets_web_app_relative_path = path.join('imgs', 'assets', input_path.split("assets")[1]);
        const directory_name  = path.basename(path.dirname(input_path))

        return {
            file_name: `${file_name}`,
            file_asset_path: assets_web_app_relative_path,
            directory_name,
            styles: ''
        }

    }

}


const web_app_assets_path = path.join(process.env.ASSETS_FOLDER_PATH)

directory_tree_mapping(web_app_assets_path);

fs.writeFileSync(
    path.join(__dirname, 'data.json'),
    JSON.stringify(TRAITS_DIRECTORY_TREE),

    { recursive: true }
);











