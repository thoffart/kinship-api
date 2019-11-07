import { Posts } from './../posts/posts.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import moment from 'moment';
import { Like } from 'src/like/like.entity';


export enum ModoPerfil {
  Publico = 'Publico',
  Privado = 'Privado',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true
  })
  foto_perfil: string;

  @Column({
    nullable: true
  })
  remember_token: string;

  @Column({
    nullable: true
  })
  data_nascimento: Date;

  @Column({
    nullable: true
  })
  genero: string;


  @Column({
    unique: true,
    nullable: true
  })
  id_facebook: string;

  @Column({
    type: 'enum',
    enum: ModoPerfil,
    nullable: true,
    default: ModoPerfil.Privado
  })
  modo_perfil: string;

  @OneToMany(type => Posts, post => post.usuario)
  postsOwner: Posts[];

  @OneToMany(type => Like, like => like.usuario)
  likes: Like[];
  
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
