import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

dotenv.config();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

//-----------------------------------------------//

import { hashSync, genSaltSync, compareSync } from "bcrypt";

//registro
export const createHash = (password) => {
    return hashSync(password, genSaltSync(10));
};

//login

/**
 * 
 * @param {*} password contraseña proporsionada por usuario sin hashear
 * @param {*} user usuario existente en BD 
 * @returns booleano
 */
export const isValidPass = (password, user) => {
    return compareSync(password, user.password);
};

//---------------------------------------------//