import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { LikeResolver } from './like.resolver';
import { LikeService } from './like.service';
import { AuthService } from './../auth/auth.service';
import { SessionManagerModule } from '../common/session/session-manager.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),     
    SessionManagerModule,
  ],
  providers: [Like, LikeService, LikeResolver, AuthService],
  exports: [LikeService]
})

export class LikeModule { }