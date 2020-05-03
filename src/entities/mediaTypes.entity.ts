import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('MediaTypes')
export class MediaTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}
