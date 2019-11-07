import moment from 'moment';
import { Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryColumn, Column } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Posts } from 'src/posts/posts.entity';

@Entity('comentarios')
export class Comentario {
  @PrimaryColumn()
  id_usuario: number;

  @PrimaryColumn()
  id_post: number;

  @Column()
  texto: string;

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

  @ManyToOne(type => Usuario, usuario => usuario.comentario, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(type => Posts, post => post.comentarios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_post' })
  post: Posts;
}