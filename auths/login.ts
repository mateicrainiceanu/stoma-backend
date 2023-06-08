import jwt from "jsonwebtoken";

import md5 from "md5";

import { User, IUser } from "../models/user";
import { Request, Response, NextFunction } from "express";

import * as dotenv from 'dotenv';
dotenv.config()


const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
        if (existingUser.password === md5(password)){
            const token = jwt.sign({
                id: existingUser._id, email, name: existingUser.name
            }, process.env.TOKEN_KEY as string)

            res.status(200).json({token, name: existingUser.name, email: existingUser.email})
        } else {
            res.status(203).json({err: "Wrong password"})
        }
    } else {        
        res.status(203).json({err: "There is no user with this email adress!"})
    }

}

export default login;