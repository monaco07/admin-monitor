import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Host } from "../host.entity";
import { DockerSnapshot } from "./dockerSnapshot.entity";

@Entity()
export class HostSnapshot {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Host, (host) => host.hostSnapshots,
        { onDelete: 'CASCADE' }
    )
    host: Host;

    @OneToMany(() => DockerSnapshot, (dockerSnapshot) => dockerSnapshot.hostSnapshot, { cascade: true })
    dockerSnapshots: DockerSnapshot[];

    @Column()
    hostname: string;

    @Column()
    operatingSystem: string;

    @Column()
    kernel: string;

    @Column()
    architecture: string;
}