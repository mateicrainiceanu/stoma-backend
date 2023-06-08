import jwt from "jsonwebtoken";

import md5 from "md5";

import { User } from "../models/user";

import { Request, Response, NextFunction } from "express";

import * as dotenv from 'dotenv';
dotenv.config()

const register = async (req: Request, res: Response, next: NextFunction) => {
    
    const { name, email, password } = req.body

    const existingUser = await User.findOne({email: email})    

    if (!existingUser) {
        const newUser = new User({
            name, email,
            password: md5(password)
        })

        const token = jwt.sign({
            id: newUser._id, email, name: newUser.name
        }, process.env.TOKEN_KEY as string)

        newUser.token = token;

        newUser.save()

        res.status(201).json(newUser)
    } else {
        res.status(203).json({err: "Email adress already in use"});
    }


}

export default register;