import { Posts } from './../posts/posts.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import moment from 'moment';
import { Like } from 'src/like/like.entity';
import { Comentario } from 'src/comentario/comentario.entity';
import { Chat } from 'src/chat/chat.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Entity('mensagens')
export class Mensagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  @ManyToOne(type => Usuario, usuario => usuario.mensagens, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(type => Chat, chat => chat.mensagens, {
    onDelete: 'CASCADE',
    nullable: true
  })
  @JoinColumn({ name: 'id_chat' })
  chat: Chat;
  
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
