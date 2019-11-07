import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class LikeService {

  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
    @Inject(AuthService) private readonly authService: AuthService,
  ) { }

  async getCountPostLikes(id_post: number): Promise<Number> {
    return await this.likeRepository.count({ where: { id_post } });
  }

  async likePost(id_post: number): Promise<void> {
    const usuario = await this.authService.getAuthUser();
    await this.likeRepository.save(await this.likeRepository.create({ id_usuario: usuario.id, id_post }));
  }

  async dislikePost(id_post: number): Promise<void> {
    const usuario = await this.authService.getAuthUser();
    await this.likeRepository.delete(this.likeRepository.create({ id_usuario: usuario.id, id_post }));
  }

}