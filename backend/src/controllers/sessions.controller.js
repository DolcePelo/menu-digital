import UserModel from "../dao/models/user.model.js";
import { createHash, isValidPass } from "../utils.js";

const loginSession = async (req, res) => {
    const { email, password } = req.body;
    const result = await UserModel.findOne({ email });

    if (!result) {
        return res.status(404).json({ message: "User not found" });
    } else if (!isValidPass(password, result)) {
        return res.status(401).json({ message: "Invalid password" });
    } else {
        req.session.user = email;
        req.session.name = result.name;
        res.status(200).json({
            message: "User logged in successfully",
            response: "ok",
            result,
        });
    }
}

const registerSession = async (req, res) => {
    res.send({ response: "success", message: "User registered" });
}

const registerError = async (err, req, res, next) => {
    res.stauts(400).json({
        error: err.message,
    })
}

const forgotLogic = async (req, res) => {
    const { email, newPassword } = req.body;
    const result = await UserModel.find({ email: email });

    if(result.length === 0) {
        return res.status(401).json({
            error: "User not found"
        });
    } else {
        const respuesta = await UserModel.findOneAndUpdate(result[0]._id, {
            password: createHash(newPassword),
        });
        res.status(200).json({
            respuesta: "ok",
            datos: respuesta,
        });
    }
}

export {loginSession, registerSession, registerError, forgotLogic};