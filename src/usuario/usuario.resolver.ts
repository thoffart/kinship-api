import { Usuario } from 'src/usuario/usuario.entity';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UsuarioService } from './usuario.service';
import {
  LoginFacebookInput,
} from './usuario.interface';

@Resolver('Usuario')
export class UsuarioResolver {
  constructor(
    private readonly usuarioService: UsuarioService,
  ) { }

  @Query()
  async me(): Promise<Usuario> {
    return await this.usuarioService.me();
  }

  @Mutation()
  async updateUsuario(@Args('updateUsuarioInput') updateUsuarioInput: LoginFacebookInput) {
    await this.usuarioService.update(updateUsuarioInput);
    return { code: 200, message: 'Usuário atualizado com sucesso' };
  }

  @Mutation()
  async deleteUsuario(@Args('id') id: number, ) {
    await this.usuarioService.delete(id);
    return { code: 200, message: 'Usuário deletado com sucesso' };
  }

  @Mutation()
  async loginFacebook(@Args('loginFacebookInput') loginFacebookInput: LoginFacebookInput) {
    return await this.usuarioService.loginFacebook(loginFacebookInput);
  }

}
