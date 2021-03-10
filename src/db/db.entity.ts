import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  uid: string;

  @PrimaryColumn()
  account: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  avatarUrl?: string;
}
