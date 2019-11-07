import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './comentario.entity';
import { ComentarioResolver } from './comentario.resolver';
import { ComentarioService } from './comentario.service';
import { AuthService } from '../auth/auth.service';
import { SessionManagerModule } from '../common/session/session-manager.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comentario]),     
    SessionManagerModule,
  ],
  providers: [Comentario, ComentarioService, ComentarioResolver, AuthService],
  exports: [ComentarioService]
})

export class ComentarioModule { }