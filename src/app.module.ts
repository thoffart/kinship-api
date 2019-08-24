import { DateScalar } from './common/scalar/date-scalar';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { UsuarioModule } from './usuario/usuario.module';
import { SessionManagerModule } from './../src/common/session/session-manager.module';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      path: "/api/graphql",
      playground: (process.env.ENVIRONMENT === 'dev') ? true : false,
      context: async ({ req, connection }) => {
        // subscriptions
        if (connection) {
          return { req: connection.context };
        }
        // queries and mutations
        return { req };
      },
      installSubscriptionHandlers: true,
    }),
    UsuarioModule,
    SessionManagerModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    AuthService,
    DateScalar,
  ]

})
export class AppModule { }
