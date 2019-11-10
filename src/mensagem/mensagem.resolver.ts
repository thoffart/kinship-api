import { Usuario } from 'src/usuario/usuario.entity';
import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql';
import { MensagemService } from './mensagem.service';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { asyncFilter } from 'src/common/async.filter';

@Resolver('Usuario')
export class MensagemResolver {
  constructor(
    private readonly mensagemService: MensagemService,
    @Inject('PubSub') private readonly pubSub: PubSub
  ) { }

  @Query()
  async getChat(@Args('id_chat') id_chat: number): Promise<any> {
    const data = await this.mensagemService.getChat(id_chat);
    return { code: 200, data };
  }

  @Query()
  async getMoreChat(@Args('id_chat') id_chat: number, @Args('offset') offset: number): Promise<any> {
    const data = await this.mensagemService.getMoreChat(id_chat, offset);
    return { code: 200, data };
  }

  @Mutation()
  async createMensagem(@Args('id_chat') id_chat: number, @Args('texto') texto: string): Promise<any> {
    const data = await this.mensagemService.create(id_chat, texto);
    return { code: 200, message: 'Mensagem criada com sucesso', data };
  }

  @Subscription('receiveMensagem')
  receiveMensagem(@Args('id_chat') id_chat: number) {
    return asyncFilter(
      this.pubSub.asyncIterator('receiveMensagem'),
      (payload: any) => {
        console.log(payload);
        return payload.receiveMensagem.chat.id === id_chat;
      }
    );
  }

}
