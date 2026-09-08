import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { DockerSnapshot } from "../../../entity/snapshots/dockerSnapshot.entity";

export class HostInfoDTO {
  @IsNumber()
  hostID: number

  @IsString()
  hostname: string;

  @IsString()
  operating_system: string;

  @IsString()
  kernel: string;

  @IsString()
  architecture: string;

  @IsArray()
  @IsOptional()
  dockerSnapshot: DockerSnapshot
}