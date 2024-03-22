require('dotenv').config();
import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { Secret } from 'jsonwebtoken';
import ejs from 'ejs'
import path from "path";

//register user
interface IRegistrationBody {
    name: string,
    email: string,
    password: string,
    avatar?: string,
}

export const registrationUser = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    // const { name, email, password, avatar } = req.body as IRegistrationBody
    try {
        const { name, email, password } = req.body;

        const isEmailExist = await userModel.findOne({ email });
        if(isEmailExist) {
            return next(new ErrorHandler('Email already exits', 400))
        }

        const user:IRegistrationBody = {
            name,
            email,
            password
        }
        const actovationToken = createActivationToken(user);
        
        const activationCode = actovationToken.activationCode;

        const data = { user: { name: user.name }, activationCode }
        const html = await ejs.renderFile(path.join(__dirname, '../mails/activation-mail.ejs'), data)

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

interface IActivationToken {
    token: string,
    activationCode: string,
}

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign({
        user, activationCode
    }, process.env.ACTIVATION_SECRET as Secret, {
        expiresIn: '1d'
    })

    return { token, activationCode }
}