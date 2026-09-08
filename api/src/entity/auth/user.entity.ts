import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SessionToken } from "./session.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column()
    passwordHash: string

    @OneToMany(() => SessionToken,
        (sessionToken) => sessionToken.user,
        { cascade: true }
    )
    sessions: SessionToken[];

}