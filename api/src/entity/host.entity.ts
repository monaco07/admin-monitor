import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiToken } from "./apiToken.entity";
import { HostSnapshot } from "./snapshots/hostSnapshot.entity";

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



    // *********************************
    // TOKEN
    // *********************************
    @OneToMany(() => ApiToken,
        (apiToken) => apiToken.host,
         { cascade: true }
    )
    apiToken: ApiToken[];
}