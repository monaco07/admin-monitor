import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class SessionToken {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    tokenHash: string;

    @ManyToOne(() => User, (user) => user.sessions, {
        onDelete: 'CASCADE',
    })
    user: User;

    @Column({default: false})
    isRevoked: boolean

    @Column()
    expiresAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}