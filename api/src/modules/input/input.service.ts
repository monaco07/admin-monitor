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

    async sendSnapshot(dto: HostInfoDTO) {
        const host = await this.hostRepo.findOneByOrFail({
            id: 1
        });

        const hostInfo = this.hostSnapshotRepo.create({
            architecture: dto.architecture,
            dockerSnapshots: [],
            host,
            hostname: dto.hostname,
            kernel: dto.kernel,
            operatingSystem: dto.operating_system
        });

        return this.hostSnapshotRepo.save(hostInfo);

    }
}
