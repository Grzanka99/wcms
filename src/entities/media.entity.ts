import { MediaMetadataEntity } from './mediaMetadata.entity';
import { MediaTypeEntity } from './mediaType.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity('Media')
export class MediaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => MediaTypeEntity)
  @JoinColumn({
    name: 'type_id',
    referencedColumnName: 'id',
  })
  type: MediaTypeEntity;

  @OneToOne((type) => MediaMetadataEntity)
  @JoinColumn({
    name: 'matadata_id',
    referencedColumnName: 'id',
  })
  metadata: MediaMetadataEntity;

  @Column()
  src: string;

  @Column()
  srcmin: string;

  @Column()
  srcmid: string;

  @Column()
  srcfull: string;
}
