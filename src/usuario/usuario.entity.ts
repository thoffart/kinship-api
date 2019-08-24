import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  BeforeInsert,
  Index,
} from 'typeorm';
import moment from 'moment';
import bcrypt from 'bcrypt';

export enum ModoPerfil {
  Desativado = 'Desativado',
  Privado = 'Privado',
  Interativo = 'Interativo'
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
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({
    default: 1000
  })
  raio: number;

  @Column({
    nullable: true
  })
  id_device: string;

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
    unique: true,
    nullable: true
  })
  id_facebook: string;
  
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
