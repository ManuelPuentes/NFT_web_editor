const fs = require("fs");
const path = require("path");
require('dotenv').config()











fs.cpSync(
    process.env.ASSETS_FOLDER_PATH,
    path.join(process.env.WEB_APP_PATH, "static", "imgs", "assets"),
    {recursive: true}
)