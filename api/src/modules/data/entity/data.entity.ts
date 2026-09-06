import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('hosts')
export class Host {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hostname: string;

  @Column()
  operatingSystem: string;

  @Column()
  kernel: string;

  @Column()
  architecture: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}