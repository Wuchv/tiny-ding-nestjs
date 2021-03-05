import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  uid: number;

  @PrimaryColumn()
  phone_number: number;

  @Column()
  password: string;
}
