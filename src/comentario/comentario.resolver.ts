import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { Response } from '../common/response.interface';

@Resolver('Comentario')
export class ComentarioResolver {
  constructor(
    @Inject('ComentarioService') private readonly comentarioService: ComentarioService
  ) { }

  @Query()
  async getPostComentarios(@Args('id_post') id_post: number): Promise<Response> {
    const data = await this.comentarioService.getPostComentarios(id_post);
    return { code: 200, data };
  }

  @Mutation()
  async createComentarioPost(@Args('id_post') id_post: number, @Args('texto') texto: string) {
    await this.comentarioService.createComentarioPost(id_post, texto);
    return { code: 200, message: 'Comentado com sucesso' };
  }

  @Mutation()
  async deleteComentarioPost(@Args('id_comentario') id_comentario: number) {
    await this.comentarioService.deleteComentarioPost(id_comentario);
    return { code: 200, message: 'Comentário apagado com sucesso' };
  }

}