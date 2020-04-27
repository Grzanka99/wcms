import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('wcms__Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  access_level: number;
}
