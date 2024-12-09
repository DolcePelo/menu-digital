import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

dotenv.config();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);