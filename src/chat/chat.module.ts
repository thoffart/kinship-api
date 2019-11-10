import { Chat } from 'src/chat/chat.entity';
import { ConfigModule } from './../common/config/config.module';
import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionManagerModule } from '../common/session/session-manager.module';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';


@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    SessionManagerModule,
    ConfigModule,
  ],
  providers: [ChatService, ChatResolver, AuthService],
  exports: [ChatService]
})

export class ChatModule { }
