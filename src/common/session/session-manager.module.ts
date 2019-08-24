import { Module } from '@nestjs/common';
import { Tedis } from 'tedis';
import { redisCon } from '../providers/redis.provider';
import { SessionManager } from './session.manager';

@Module({
  providers: [
    SessionManager,
    redisCon
  ],
  exports: [SessionManager]
})
export class SessionManagerModule { }
