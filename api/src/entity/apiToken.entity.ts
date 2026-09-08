import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Host } from "./host.entity";

@Entity()
export class ApiToken {

    @PrimaryColumn()
    ApiToken: string

    @Column()
    isReverted: boolean

    @ManyToOne(() => Host, (host) => host.apiToken, {
        onDelete: 'CASCADE',
    })
    host: Host;

}