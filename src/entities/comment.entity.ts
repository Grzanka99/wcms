import {
  Entity,
  OneToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PostEntity } from './post.entity';

@Entity('Comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  author: string;

  @OneToOne((type) => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  authorid: UserEntity;

  /**
   * Plane text contains comment
   */
  @Column({ nullable: false })
  content: string;

  @ManyToOne(
    (type) => PostEntity,
    (post) => post.comments,
    { nullable: true },
  )
  commentTo: PostEntity;

  @ManyToOne(
    (type) => CommentEntity,
    (reply) => reply.replies,
    { nullable: true },
  )
  replyTo: CommentEntity;

  @OneToMany(
    (type) => CommentEntity,
    (reply) => reply.id,
    { nullable: true },
  )
  replies: CommentEntity[];
}
