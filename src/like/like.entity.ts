import moment from 'moment';
import { Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Posts } from 'src/posts/posts.entity';

@Entity('likes')
export class Like {
  @PrimaryColumn()
  id_usuario: number;

  @PrimaryColumn()
  id_post: number;

  @CreateDateColumn({
    transformer: {
      from: (date: Date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      },
      to: () => {
        return new Date();
      },
    },
  })
  created_at: string;

  @UpdateDateColumn({
    transformer: {
      from: (date: Date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      },
      to: () => {
        return new Date();
      },
    },
  })
  updated_at: string;

  @ManyToOne(type => Usuario, usuario => usuario.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(type => Posts, post => post.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_post' })
  post: Posts;
}