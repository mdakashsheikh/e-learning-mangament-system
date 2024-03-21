import { Request, Response, NextFunction } from "express";
import userModel, { IUser} from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

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
            
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})