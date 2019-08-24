import { Get, Controller, Res, Param } from '@nestjs/common';
import { Storage } from './common/storage/storage';

@Controller()
export class AppController {

  constructor() { }

  @Get('public/:folder/:file')
  public(
    @Res() res: any,
    @Param('folder') folder: string,
    @Param('file') file: string
  ) {
    Storage.download(folder, file, res);
  }



  @Get('imagens/:file')
  imagens(@Res() res, @Param('file') file) {
    return res.sendFile(file, {
      root: 'public/imagens'
    });
  }

}