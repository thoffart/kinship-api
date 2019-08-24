import { ConfigService } from './../config/config.service';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import { diskStorage } from 'multer';
import * as FileHelper from './../../common/helper/file.helper';

export class Storage {

  static get configService() {
    return new ConfigService();
  }

  static storage(): string {
    return (this.configService.get('STORAGE') !== undefined)
      ? this.configService.get('STORAGE')
      : "develop";
  }

  static setCredentials() {
    const bucket = this.configService.get('S3_BUCKET');
    const s3 = new aws.S3({
      accessKeyId: this.configService.get('S3_KEY'),
      secretAccessKey: this.configService.get('S3_SECRET'),
    })
    return { bucket, s3 }
  }

  static store(path: string) {
    return this.isUploadS3()
      ? this.uploadS3(path)
      : this.uploadLocal(path);
  }

  static download(path: string, file: string, res: any) {
    return this.isUploadS3()
      ? this.downloadS3(path, file, res)
      : this.downloadLocal(path, file, res);
  }

  static isUploadS3(): boolean {
    return (this.storage() !== 'local');
  }

  static getFilepath(file: any): string {
    return file.path || file.key;
  }

  static uploadS3(path: string) {
    const { bucket, s3 } = this.setCredentials();

    return multerS3({
      s3: s3,
      bucket: bucket,
      key: function (_req, file, cb) {
        cb(null, `public/${path}/${FileHelper.getRandomFileName(file.originalname)}`);
      },
    })
  }

  static uploadLocal(path: string) {
    return diskStorage({
      destination: `public/${path}`,
      filename: (_req, file, cb) => {
        return cb(null, `${FileHelper.getRandomFileName(file.originalname)}`)
      }
    })
  }

  static downloadS3(path: string, file: string, res: any) {
    const { bucket, s3 } = this.setCredentials();
    var options = {
      Bucket: bucket,
      Key: `public/${path}/${file}`,
    };

    s3.getObject(options, function (err, data) {
      if (err === null) {
        res.attachment(`${path}/${file}`);
        res.send(data.Body);
      } else {
        res.status(500).send(err);
      }
    });
  }

  static downloadLocal(path: string, file: string, res: any) {
    return res.sendFile(file, {
      root: `public/${path}`
    });
  }
}