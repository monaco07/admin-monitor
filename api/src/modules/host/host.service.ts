import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Host } from '../../entity/host.entity';
import { Repository } from 'typeorm';
import { HostDTO, UpdatedAPITokenDTO } from './dto/host.dto';
import { randomBytes, createHash } from 'node:crypto';
import { SessionToken } from '../../entity/auth/session.entity';
@Injectable()
export class HostService {
  constructor(@InjectRepository(Host) private hostRepo: Repository<Host>) {}
  async createHost(hostname: string, description: string | undefined) {
    const host: Host = this.hostRepo.create({
      displayName: hostname,
      description: description,
    });
    return this.hostRepo.save(host);
  }
  async getHosts() {
    const hosts = await this.hostRepo.find();
    return this.toDTOs(hosts);
  }

  async updateToken(hostID: number) {
    const token = randomBytes(32).toString('base64url');
    const tokenHash = createHash('sha256').update(token).digest('hex');

    const host = await this.hostRepo.findOneOrFail({
      where: {
        id: hostID,
      },
    });
    host.currentTokenHash = tokenHash;
    await this.hostRepo.save(host);

    const dto: UpdatedAPITokenDTO = {
      hostID: hostID,
      token: token,
    };
    return dto;
  }

  async revokeToken(hostID: number) {
    const host = await this.hostRepo.findOneOrFail({
      where: {
        id: hostID,
      },
    });
    host.currentTokenHash = ""
    await this.hostRepo.save(host);
  }

  toDTO(host: Host): HostDTO {
    const dto: HostDTO = {
      id: host.id,
      hostname: host.displayName,
      description: host.description,
    };
    return dto;
  }
  toDTOs(hosts: Host[]): HostDTO[] {
    return hosts.map((h) => this.toDTO(h));
  }
}
