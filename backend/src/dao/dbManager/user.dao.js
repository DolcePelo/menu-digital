import userModel from '../models/user.model.js';
import logger from '../../config/logger.js';

export default class User {
    constructor() {
        console.log("Working User with database MongoDB")
    }

    getUsers = async () => {
        try {
            const user = await userModel.find();
            return user;
        } catch (error) {
            logger("error al obtener los usuarios", error)
        }
    }

    getUserById = async (id) => {
        try {
            const user = await userModel.findById(id);
            return user;
        } catch (error) {
            logger("error al obtener el usuario por id", error);
        }
    }

    saveUser = async (user) => {
        try {
            let newUser = new userModel(user);
            let result = await newUser.save();
            return result;
        } catch (error) {
            logger("error al crear el usuario", error);
        }
    }

    deleteUser = async (id) => {
        try {
            let user = await userModel.findByIdAndDelete(id);
            return user;
        } catch (error) {
            logger("error al eliminar el usuario", error);
        }
    }

    updateUser = async (id, user) => {
        try {
            let userUpdated = await userModel.findByIdAndUpdate(id, user, { new: true });
            return userUpdated;
        } catch (error) {
            logger("error al actualizar el usuario", error);
        }
    }
}