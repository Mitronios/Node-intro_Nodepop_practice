import multer from 'multer';
import path from 'node:path';

// Multer - formdata
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    const route = path.join(import.meta.dirname, '..', 'uploads', 'products');
    cb(null, route);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

export default upload;
