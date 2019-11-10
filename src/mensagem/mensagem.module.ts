import { PubSub } from 'graphql-subscriptions';
import { Mensagem } from './mensagem.entity';
import { ConfigModule } from './../common/config/config.module';
import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionManagerModule } from '../common/session/session-manager.module';
import { MensagemService } from './mensagem.service';
import { MensagemResolver } from './mensagem.resolver';


@Module({
  imports: [
    TypeOrmModule.forFeature([Mensagem]),
    SessionManagerModule,
    ConfigModule,
  ],
  providers: [MensagemService, MensagemResolver, AuthService, PubSub],
  exports: [MensagemService]
})

export class MensagemModule { }
