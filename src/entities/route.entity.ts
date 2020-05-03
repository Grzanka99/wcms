import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Routes')
export class RouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  baseurl: string;

  @Column()
  address: string;

  @Column()
  index: boolean;

  @Column({ type: 'float' })
  priority: number;
}
