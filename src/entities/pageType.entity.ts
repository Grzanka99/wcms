import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum availablePageTypes {
  jsonTemplate = 'template',
  rawHTML = 'html',
}

@Entity('PageTypes')
export class PageTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: availablePageTypes })
  name: string;
}
