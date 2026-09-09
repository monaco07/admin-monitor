import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HostSnapshot } from "./snapshots/hostSnapshot.entity";
import { IsOptional } from "class-validator";

@Entity()
export class Host {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    displayName: string

    // *********************************
    // REFERENZEN
    // *********************************
    @OneToMany(() => HostSnapshot, (snapshot) => snapshot.host, {cascade: true})
    hostSnapshots: HostSnapshot[];

    @Column()
    @IsOptional()
    currentToken: string
}