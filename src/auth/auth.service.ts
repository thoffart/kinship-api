import { Injectable, Inject } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-core';
import { SessionManager } from './../common/session/session.manager';
import { Usuario } from './../usuario/usuario.entity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

  private readonly _whitelist = [
    'login',
    'loginFacebook',
    'loginGoogle',
    'register',
    'recuperarSenha',
    'alterarSenha',
    'receiveMensagem',
    'receiveThread',
    'playAudio',
    'changeColor',
    'conectado',
    '/api/public',
    '/api/public/:folder/:file',
    '/api/public/:file',
    '/api/imagens/:file'
  ]

  constructor(@Inject('SessionManager') private readonly session: SessionManager) {
  }

  async createToken(usuario: Usuario) {
    const secretOrKey = 'secret';
    const expiresIn = '2 days';
    const token = jwt.sign({ usuario }, secretOrKey, { expiresIn });
    this.setAuthUser(usuario);
    return { expiresIn, token };
  }

  async validateUser(token: string, operationName: string) {
    if (this._whitelist.some(item => item === operationName)) {
      return true;
    }

    if (!token) {
      throw new AuthenticationError('Unauthenticated');
    }
    if (token.slice(0, 6) === 'Bearer') {
      token = token.slice(7);
    } else {
      throw new AuthenticationError('Invalid token');
    }

    try {
      const decodedToken = <{ usuario: Usuario }>jwt.verify(token, 'secret');
      this.setUserSession(decodedToken.usuario.id);
      return decodedToken ? true : false;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AuthenticationError('The authorization code is incorrect');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new AuthenticationError('The authorization code has expired');
      }
    }
  }

  async setUserSession(id_usuario: number): Promise<void> {
    const session_name: string = `usuario_${id_usuario}`;
    this.session.setSession = session_name;
  }

  async setAuthUser(usuario: Usuario): Promise<void> {
    this.setUserSession(usuario.id);
    await this.session.set('user', JSON.stringify(usuario));
  }

  async getAuthUser(): Promise<Usuario> {
    return JSON.parse(await this.session.get('user'));
  }

}