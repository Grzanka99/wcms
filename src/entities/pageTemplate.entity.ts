import { StylesEntity } from './styles.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('PageTemplates')
export class PageTemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'json' })
  template: JSON;

  @OneToOne((type) => StylesEntity)
  @JoinColumn({
    name: 'style_id',
    referencedColumnName: 'id',
  })
  styles_id: StylesEntity;
}
