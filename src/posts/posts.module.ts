import { Posts } from './posts.entity';
import { ConfigModule } from '../common/config/config.module';
import { AuthService } from '../auth/auth.service';
import { PostsResolver } from './posts.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { SessionManagerModule } from '../common/session/session-manager.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Posts]),
    SessionManagerModule,
    ConfigModule,
  ],
  providers: [PostsService, PostsResolver, AuthService],
  exports: [PostsService]
})

export class PostsModule { }
