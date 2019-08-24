import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { Controller, Post, UseInterceptors, UploadedFile, Inject, BadRequestException, UploadedFiles } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Response } from 'src/common/response.interface';
import { Storage } from '../common/storage/storage';
import * as FileHelper from './../common/helper/file.helper';

@Controller('usuarios')
export class UsuarioController {

  constructor(
    @Inject(UsuarioService) private readonly usuarioService: UsuarioService,
  ) { }

  @Post('foto')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: '0', maxCount: 1 },
      { name: '1', maxCount: 1 },
      { name: '2', maxCount: 1 },
      { name: '3', maxCount: 1 },
      { name: '4', maxCount: 1 }],
      {
        storage: Storage.store('usuario')
      }
    )
  )
  async foto(@UploadedFiles() files: any): Promise<Response> {
    await this.createFotosUsuario(files);
    return { code: 200, message: 'Imagem adicionada com sucesso' };
  }

  @Post('foto_perfil')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: Storage.store('usuario')
    })
  )
  async foto_perfil(@UploadedFile() file: any): Promise<Response> {
    return { code: 200, message: 'Imagem de perfil adicionada com sucesso' };
  }

  async createFotosUsuario(files: any): Promise<void> {
    for (var i = 0; i <= 4; i++) {
      const file = files[i];
      if (file) {
        if (!FileHelper.isValidImageFileExtension(Storage.getFilepath(file[0]))) {
          throw new BadRequestException('Tipo de arquivo não suportado');
        }
      }
    }

  }

}