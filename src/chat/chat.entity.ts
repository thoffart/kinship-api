import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import moment from 'moment';
import { Posts } from 'src/posts/posts.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { Mensagem } from 'src/mensagem/mensagem.entity';


@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_post: number;

  @Column()
  id_usuario_criador: number;

  @Column()
  id_usuario_receptor: number;

  @ManyToOne(type => Posts, post => post.chat, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'id_post' })
  post: Posts;

  @ManyToOne(type => Usuario, usuario => usuario.chatCriador, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'id_usuario_criador' })
  criador: Usuario;

  @ManyToOne(type => Usuario, usuario => usuario.chatReceptor, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'id_usuario_receptor' })
  receptor: Usuario;

  @OneToMany(type => Mensagem, mensagem => mensagem)
  mensagens: Mensagem;

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
}
