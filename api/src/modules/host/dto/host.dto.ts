import { IsEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateHostDTO{
    @IsString()
    hostname: string

    @IsOptional()
    description?: string
}
export interface HostDTO{
    id: number,
    hostname: string,
    description?: string
}

export class UpdateAPITokenDTO{
    @IsNumber()
    id: number
}
export interface UpdatedAPITokenDTO{
    hostID: number,
    token: string
}