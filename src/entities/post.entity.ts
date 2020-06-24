import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';

@Entity('Posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @OneToOne((type) => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  authorid: UserEntity;

  /**
   * This Column will contain content of
   * page written in markdown format
   */
  @Column({ nullable: false })
  content: string;

  /**
   * link to sources separated by comma
   */
  @Column({ nullable: true })
  sources: string;

  /**
   * Tags separated by comma
   */
  @Column({ nullable: false })
  tags: string;

  @OneToMany(
    (type) => CommentEntity,
    (comment) => comment.id,
    { nullable: true },
  )
  comments: CommentEntity[];
}
