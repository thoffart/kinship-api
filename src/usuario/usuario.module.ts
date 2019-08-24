import { ConfigModule } from './../common/config/config.module';
import { AuthService } from './../auth/auth.service';
import { UsuarioResolver } from './usuario.resolver';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { SessionManagerModule } from '../common/session/session-manager.module';


@Module({
  controllers: [UsuarioController],
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    SessionManagerModule,
    ConfigModule,
  ],
  providers: [UsuarioService, UsuarioResolver, AuthService],
  exports: [UsuarioService]
})

export class UsuarioModule { }
