import mongoose from "mongoose"

interface IUser {
    _id: string
    name:string, 
    email: string,
    password: string,
    token: string
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: false }
});

const User = mongoose.model<IUser>('User', userSchema);

export {User, IUser};