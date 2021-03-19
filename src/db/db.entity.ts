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

@Entity('message')
export class MessageEntity {
  @PrimaryColumn()
  msgId: string;

  @Column()
  cid: string;

  @Column()
  fromId: string;

  @Column()
  toId: string;

  @Column()
  sender: string;

  @Column()
  avatarUrl: string;

  @Column()
  msgType: EMsgType;

  @Column()
  content: string;

  @Column()
  timestamp: number;
}
