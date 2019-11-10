import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comentario } from './comentario.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ComentarioService {

  constructor(
    @InjectRepository(Comentario) private readonly comentarioRepository: Repository<Comentario>,
    @Inject(AuthService) private readonly authService: AuthService,
  ) { }

  async getPostComentarios(id_post: number): Promise<any> {
    return await this.comentarioRepository.find({ where: { id_post }, relations: ['usuario'] });
  }

  async createComentarioPost(id_post: number, texto: string): Promise<void> {
    const usuario = await this.authService.getAuthUser();
    await this.comentarioRepository.save(await this.comentarioRepository.create({ id_usuario: usuario.id, texto: texto, id_post }));
  }

  async deleteComentarioPost(id_comentario: number): Promise<void> {
    const usuario = await this.authService.getAuthUser();
    const comentario = await this.comentarioRepository.findOne(id_comentario);
    await this.comentarioRepository.delete(comentario);
  }

}