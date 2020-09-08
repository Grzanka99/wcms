import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: false })
  password: string;

  /**
   * higher = better (more permisions)
   */
  @Column({ nullable: false })
  access_level: number;
}
