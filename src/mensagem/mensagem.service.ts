import { Mensagem } from './mensagem.entity';
import { AuthService } from './../auth/auth.service';
import { HttpException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PubSub } from 'graphql-subscriptions';
import { Pagination } from 'src/common/paginate/pagination';

@Injectable()
export class MensagemService {
  constructor(
    @InjectRepository(Mensagem) private readonly mensagemRepository: Repository<Mensagem>,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject('PubSub') private readonly pubSub: PubSub
  ) { }

  private async queryChat(id_chat: number, offset: number): Promise<any> {
    return await this.mensagemRepository.findAndCount(
      {
        where: { 'spot': { id: id_chat } },
        take: 10,
        skip: offset,
        relations: ['usuario', 'chat'],
        order: { created_at: "DESC" }
      }
    );
  }

  async getChat(id_chat: number): Promise<Pagination<Mensagem>> {
    const [list, total] = await this.queryChat(id_chat, 0);
    return await new Pagination<Mensagem>({ list, total });
  }

  async get(id: number): Promise<Mensagem> {
    return await this.mensagemRepository.findOne(id, {
      relations:
        ['usuario', 'chat']
    });
  }

  async getMoreChat(id_chat: number, offset: number): Promise<Pagination<Mensagem>> {
    const [list, total] = await this.queryChat(id_chat, offset);
    return await new Pagination<Mensagem>({ list, total });
  }

  async create(id_chat: number, texto: string): Promise<Mensagem> {
    const usuario = await this.authService.getAuthUser();
    const mensagem = await this.mensagemRepository.save(
      await this.mensagemRepository.create({ usuario, texto })
    );

    const mensagemQueryBuilder = await this.mensagemRepository.createQueryBuilder('mensagens');
    mensagemQueryBuilder
      .relation(Mensagem, 'chat').of(mensagem)
      .set(id_chat);

    const data = await this.get(mensagem.id);

    this.pubSub.publish('receiveMensagem', { receiveMensagem: data });

    return data;
  }

}