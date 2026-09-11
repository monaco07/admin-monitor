import { IsString } from "class-validator";
import { Request } from "express";
import { SessionToken } from "../../../entity/auth/session.entity";
import { Host } from "../../../entity/host.entity";

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

export interface CookieRequest extends Request{
    token: SessionToken
}
export interface ApiTokenRequest extends Request{
    hostEntity: Host
}