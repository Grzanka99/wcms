import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('MediaMetadata')
export class MediaMetadataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  album: string;

  @Column()
  title: string;

  @Column()
  duration: number;
}
