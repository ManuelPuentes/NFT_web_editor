import { diskStorage, StorageEngine } from 'multer';
import * as fs from 'fs';

export const storage: StorageEngine = diskStorage({
  destination: function (req, file, cb) {
    const path = `./collections/${req.query?.name}`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
