import { IsString } from "class-validator";
import { Request } from "express";
import { SessionToken } from "../../../entity/auth/session.entity";

export class LoginDTO{
    @IsString()
    username: string

    @IsString()
    password: string
}

export class UserDTO{
    username: string
    expiredAt: string
}

export interface ModifiedRequest extends Request{
    token: SessionToken
}