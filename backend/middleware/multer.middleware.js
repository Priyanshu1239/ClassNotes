import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the upload directory exists
const uploadPath = './public';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath); // Save in 'public' folder
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        const uniqueName = `${baseName}-${Date.now()}${ext}`;
        cb(null, uniqueName); // Avoid filename collisions
    }
});

export const upload = multer({ storage });
