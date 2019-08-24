import { ConfigService } from './../common/config/config.service';
import { AuthService } from './../auth/auth.service';
import { HttpException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioInput, LoginFacebookInput } from './usuario.interface';
import { MailerService } from '@nest-modules/mailer';
import { formatToDatetime } from '../common/helper/date.helper';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
    @Inject(AuthService) private readonly authService: AuthService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) { }

  async me(): Promise<Usuario> {
    const usuario = await this.authService.getAuthUser();
    return await this.usuarioRepository.createQueryBuilder('usuarios')
      .getOne();
  }


  async create(createUsuarioInput: UsuarioInput): Promise<Usuario> {
    if (createUsuarioInput.email && await this.usuarioRepository.findOne({ where: { email: createUsuarioInput.email } })) {
      throw new RpcException({ code: 409, message: 'Email já cadastrado.' });
    }
    return await this.usuarioRepository.save(this.usuarioRepository.create(createUsuarioInput));
  }

  async update(updateUsuarioInput: UsuarioInput): Promise<void> {
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

    await this.registerFacebookLogin(loginFacebookInput);
    const usuario = await this.usuarioRepository.findOne({
      email: loginFacebookInput.email,
      id_facebook: loginFacebookInput.id_facebook
    });

    return await this.setTokenAndPermissionPage(usuario, loginFacebookInput.id_device);
  }

  private async setTokenAndPermissionPage(usuario: Usuario, id_device: string) {
    const show_permission_page = (id_device !== usuario.id_device) ? true : false;
    if (id_device) {
      await this.usuarioRepository.update(usuario.id, { "id_device": id_device });
      usuario.id_device = id_device;
    }

    const token = await this.authService.createToken(usuario);
    return { ...token, show_permission_page, usuario };
  }

  private async getFacebookLogin(loginFacebookInput: LoginFacebookInput): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ id_facebook: loginFacebookInput.id_facebook });

    if ((usuario && usuario.email !== loginFacebookInput.email)
      || (!usuario && await this.usuarioRepository.findOne({ where: { email: loginFacebookInput.email } }))) {
      throw new HttpException('Email já cadastrado', 409);
    }
    return usuario;
  }

  private async registerFacebookLogin(loginFacebookInput: LoginFacebookInput) {
    const usuario = await this.getFacebookLogin(loginFacebookInput);
    if (!usuario) {
      await this.usuarioRepository
        .createQueryBuilder()
        .insert()
        .values({
          nome: loginFacebookInput.nome,
          email: loginFacebookInput.email,
          foto_perfil: loginFacebookInput.foto_perfil,
          id_facebook: loginFacebookInput.id_facebook
        })
        .execute();
    }
  }

}