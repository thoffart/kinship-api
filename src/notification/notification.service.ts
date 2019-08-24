import https from 'https';
import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm/connection/Connection';
import { ConfigService } from '../common/config/config.service';
import { AuthService } from '../auth/auth.service';

export class NotificationService {

  constructor(
    @Inject('ConfigService') private readonly configService: ConfigService,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject('Connection') private readonly connection: Connection
  ) { }

  async setCredentials() {
    const app_id = this.configService.get('ONE_SIGNAL_APP_ID');
    const rest_key = this.configService.get('ONE_SIGNAL_REST_KEY');
    return { app_id, rest_key }
  }
}