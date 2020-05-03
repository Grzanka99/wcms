import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Styles')
export class StylesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  src: string;

  @Column()
  srcmin: string;

  @Column()
  srcmap: string;
}
