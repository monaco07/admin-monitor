import { IsEmpty, IsOptional, IsString } from "class-validator";

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