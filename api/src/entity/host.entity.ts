import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HostSnapshot } from "./snapshots/hostSnapshot.entity";

@Entity()
export class Host {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    displayName: string

    @Column({nullable: true})
    description: string
    // *********************************
    // REFERENZEN
    // *********************************
    @OneToMany(() => HostSnapshot, (snapshot) => snapshot.host, {cascade: true})
    hostSnapshots: HostSnapshot[];

    @Column({nullable: true})
    currentToken: string
}