import mongoose from "mongoose";

const userCollection = "users";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
});

const User = mongoose.model(userCollection, UserSchema);

export default User;