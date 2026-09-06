import { IsString } from "class-validator";

export class HostInfoDTO {
  @IsString()
  hostname: string;

  @IsString()
  operatingSystem: string;

  @IsString()
  kernel: string;

  @IsString()
  architecture: string;
}