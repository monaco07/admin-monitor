import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Host } from '../../entity/host.entity';
import { Repository } from 'typeorm';
import { HostDTO } from './dto/host.dto';

@Injectable()
export class HostService {
    constructor(
        @InjectRepository(Host) private hostRepo: Repository<Host>
        
    ){}
    async createHost(hostname: string, description: string | undefined){
        const host: Host = this.hostRepo.create(
            {
                displayName: hostname,
                description: description
            }
        )
        return this.hostRepo.save(host)
    }
    async getHosts(){
        const hosts = await this.hostRepo.find()
        return this.toDTOs(hosts)
    }

    toDTO(host: Host): HostDTO{
        const dto: HostDTO = {
            id: host.id,
            hostname: host.displayName,
            description: host.description
        }
        return dto
    }
    toDTOs(hosts: Host[]): HostDTO[]{
        return hosts.map( h => this.toDTO(h))
    }
}
