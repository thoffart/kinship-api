import { Geography } from 'geojson';
import { ModoPerfil } from './usuario.entity';

export interface UsuarioInput {
  id?: number;
  nome: string;
  email: string;
  password: string;
  foto_perfil?: string;
  data_nascimento?: string;
}

export interface LoginFacebookInput {
  id_facebook: string;
  id_device: string;
  nome?: string;
  email?: string;
  foto_perfil?: string;
}