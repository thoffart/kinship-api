import { AuthService } from './../auth/auth.service';
import { HttpException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { LoginFacebookInput } from './usuario.interface';
import { formatToDatetime } from '../common/helper/date.helper';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
    @Inject(AuthService) private readonly authService: AuthService,
  ) { }

  async me(): Promise<Usuario> {
    const usuario = await this.authService.getAuthUser();
    return await this.usuarioRepository.createQueryBuilder('usuarios')
      .where("usuarios.id = :id", { id: usuario.id })
      .getOne();
  }

  async update(updateUsuarioInput: LoginFacebookInput): Promise<void> {
    const usuario = await this.authService.getAuthUser();
    if (updateUsuarioInput.email && updateUsuarioInput.email !== usuario.email) {
      if (await this.usuarioRepository.findOne({ where: { email: updateUsuarioInput.email } })) {
        throw new HttpException('Email já cadastrado', 409);
      }
    }
    updateUsuarioInput.data_nascimento = await formatToDatetime(updateUsuarioInput.data_nascimento);
    await this.usuarioRepository.save(await this.usuarioRepository.preload({ ...updateUsuarioInput, id: usuario.id }));
  }

  async delete(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }

  async loginFacebook(loginFacebookInput: LoginFacebookInput) {
    const show_introduction_page = await this.registerFacebookLogin(loginFacebookInput);
    const usuario = await this.usuarioRepository.findOne({
      email: loginFacebookInput.email,
      id_facebook: loginFacebookInput.id_facebook
    });
    const token = await this.authService.createToken(usuario);
    return { ...token, show_introduction_page, usuario };
  }

  private async getFacebookLogin(loginFacebookInput: LoginFacebookInput): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ id_facebook: loginFacebookInput.id_facebook });
    return usuario;
  }

  private async registerFacebookLogin(loginFacebookInput: LoginFacebookInput): Promise<boolean> {
    const usuario = await this.getFacebookLogin(loginFacebookInput);
    if (!usuario) {
      await this.usuarioRepository
        .createQueryBuilder()
        .insert()
        .values({
          nome: loginFacebookInput.nome,
          email: loginFacebookInput.email,
          foto_perfil: loginFacebookInput.foto_perfil,
          id_facebook: loginFacebookInput.id_facebook,
          genero: loginFacebookInput.genero,
          data_nascimento: loginFacebookInput.data_nascimento
        })
        .execute();
      return true;
    }
    return false;
  }

}