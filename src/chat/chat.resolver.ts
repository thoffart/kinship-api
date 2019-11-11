import { Usuario } from 'src/usuario/usuario.entity';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ChatService } from './chat.service';

@Resolver('Chat')
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
  ) { }

  @Query()
  async getChats(@Args('id_criador') id_criador: number) {
    const data = await this.chatService.getAll(id_criador);
    return { code: 200, data };
  }

  @Query()
  async getUniqueChat(@Args('id_post') id_post: number, @Args('id_criador') id_criador: number, @Args('id_receptor') id_receptor: number) {
    const chat = await this.chatService.getUniqueChat(id_post, id_criador, id_receptor);
    console.log(chat);
    return { code: 200, chat };
  }

  @Mutation()
  async createChat(@Args('id_post') id_post: number, @Args('id_criador') id_criador: number, @Args('id_receptor') id_receptor: number) {
    const chat = await this.chatService.create(id_post, id_criador, id_receptor);
    return { code: 200, message: 'Chat criado com sucesso', chat };
  }

}
