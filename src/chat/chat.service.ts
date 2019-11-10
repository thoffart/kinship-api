import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
  ) { }

  async get(id: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne(id);
    return chat;
  }

  async getAll(id_criador: number): Promise<any> {
    const [list, total] = await this.chatRepository.findAndCount(
      {
        where: { id_criador }
      }
    );

    return list;
  }

  async create(id_post: number, id_usuario_criador: number, id_usuario_receptor: number): Promise<any> {
    const chat = await this.chatRepository.save(this.chatRepository.create({ id_post, id_usuario_criador, id_usuario_receptor }));
    return await this.get(chat.id);
  }

}