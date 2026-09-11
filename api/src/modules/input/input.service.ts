import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HostSnapshot } from '../../entity/snapshots/hostSnapshot.entity';
import { HostInfoDTO } from './dto/Input.dto';
import { Repository } from 'typeorm';
import { Host } from '../../entity/host.entity';

@Injectable()
export class InputService {
    constructor(
        @InjectRepository(HostSnapshot) private hostSnapshotRepo: Repository<HostSnapshot>,
        @InjectRepository(Host) private hostRepo: Repository<Host>
    ) {

    }

    async sendSnapshot(dto: HostInfoDTO, hostEntity: Host) {

        const hostInfo = this.hostSnapshotRepo.create({
            architecture: dto.architecture,
            dockerSnapshots: [],
            host: hostEntity,
            hostname: dto.hostname,
            kernel: dto.kernel,
            operatingSystem: dto.operating_system
        });

        await this.hostSnapshotRepo.save(hostInfo);
        return {
            "success": true
        }

    }
}
