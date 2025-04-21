import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//carpeta donde se va a guardar las imagenes
const uploadDir = path.join(__dirname, "../../uploads");

//verificamos si existe la carpeta, si no existe la creamos
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

//configuracion de multer
const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

export default upload;