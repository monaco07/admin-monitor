import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { HostSnapshot } from "./hostSnapshot.entity";

@Entity()
export class DockerSnapshot {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => HostSnapshot, (hostSnapshot) => hostSnapshot.dockerSnapshots,
        {
            onDelete: 'CASCADE',
        })
    hostSnapshot: HostSnapshot;

}