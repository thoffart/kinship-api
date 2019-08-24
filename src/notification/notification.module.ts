import { AuthService } from './../auth/auth.service';
import { ConfigService } from './../common/config/config.service';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SessionManagerModule } from '../common/session/session-manager.module';

@Module({
  imports: [SessionManagerModule],
  providers: [
    NotificationService,
    ConfigService,
    AuthService
  ],
  exports: [NotificationService]
})
export class NotificationModule { }
