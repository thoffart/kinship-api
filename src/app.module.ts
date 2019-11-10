import { MensagemModule } from './mensagem/mensagem.module';
import { DateScalar } from './common/scalar/date-scalar';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { UsuarioModule } from './usuario/usuario.module';
import { SessionManagerModule } from './../src/common/session/session-manager.module';
import { PostsModule } from './posts/posts.module';
import { LikeModule } from './like/like.module';
import { ComentarioModule } from './comentario/comentario.module';
import { ChatModule } from './chat/chat.module';
import { PubSub } from 'graphql-subscriptions';

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
    PostsModule,
    LikeModule,
    ComentarioModule,
    ChatModule,
    MensagemModule,
    SessionManagerModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: PubSub, useValue: new PubSub },
    AuthService,
    DateScalar,
  ]

})
export class AppModule { }
