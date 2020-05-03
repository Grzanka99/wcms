import { PageTemplateEntity } from './pageTemplate.entity';
import { PageTypeEntity } from './pageType.entity';
import { RouteEntity } from './route.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity('Pages')
export class PageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => RouteEntity)
  @JoinColumn({
    name: 'route_id',
    referencedColumnName: 'id',
  })
  route: RouteEntity;

  @OneToOne((type) => PageTypeEntity)
  @JoinColumn({
    name: 'type_id',
    referencedColumnName: 'id',
  })
  type: PageEntity;

  @OneToOne((type) => PageTemplateEntity)
  @JoinColumn({
    name: 'template_id',
    referencedColumnName: 'id',
  })
  template_id: PageTemplateEntity;

  /**
   * Page name define, almost like route
   * containes only last "slug" /<name>
   * before this, could be rest of the adress
   * like: https://foo.com/bar/<name>
   */
  @Column()
  name: string;

  @Column()
  title: string;

  @Column({ type: 'json' })
  metadata: JSON;

  /**
   * Page content/data, this contain data
   * Will be used to generated template if template-type
   * Otherwise, if html, it should look like:
   * {
   *    content: "<html code>"
   * }
   */
  @Column({ type: 'json' })
  data: JSON;

  @Column()
  lang: string;
}
