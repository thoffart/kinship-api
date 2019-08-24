import { thumbnail } from "easyimage";
import ffmpeg from 'fluent-ffmpeg';
import { Storage } from "../storage/storage";
import slugify from '@sindresorhus/slugify';

/**
 * @Method: Returns the Extension from the filename.
 * @Param {string}
 * @Return {string}
 */
export function getFileExtension(filename: string): string {
  return filename.substring(filename.lastIndexOf('.'), filename.length);
}

/**
 * @Method: Returns the Name from the filename.
 * @Param {string}
 * @Return {string}
 */
export function getFileName(filename: string): string {
  return filename.substring(-filename.lastIndexOf('.'), filename.lastIndexOf('.'));
}

/**
 * @Method: Returns the Thumbnail created for the image.
 * @Param {string}
 * @Return {Promise<string>}
 */
export async function createImageThumbnail(file: string): Promise<string> {
  const thumb = `${getFileName(file)}_thumb${getFileExtension(file)}`;
  try {
    await thumbnail({
      src: file,
      dst: thumb,
      width: 50,
      height: 50,
      gravity: 'center'
    });
  } catch (e) {
    console.log("Error: ", e);
  }
  return thumb;
}

/**
 * @Method: Returns the Thumbnail created for the video.
 * @Param {string}
 * @Return {string}
 */
export function createVideoThumbnail(file: string): string {
  const thumb = `${getFileName(file)}_thumb.png`;
  const { bucket, s3 } = Storage.setCredentials();

  const filename = Storage.isUploadS3()
    ? s3.getSignedUrl('getObject', { Bucket: bucket, Key: `${file}`, Expires: 1000 })
    : file;

  ffmpeg(filename).screenshots({
    timestamps: [0.0],
    filename: thumb,
    size: '50x50'
  }).autoPad(true, 'black');

  return thumb;
}

/**
 * @Method: Return a random filename 
 * @Param {string}
 * @Return {boolean}
 */
export function getRandomFileName(filename: string): string {
  const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
  const slugifyName = slugify(getFileName(filename));
  const extension = getFileExtension(filename);
  return `${randomName}_${slugifyName}${extension}`;
}

/**
 * @Method: Check image file extension permission.
 * @Param {string}
 * @Return {boolean}
 */
export function isValidImageFileExtension(filename: string): boolean {
  const whitelist = ['.jpg', '.jpeg', '.png', '.gif'];
  const fileExtension = this.getFileExtension(filename).toLowerCase();
  return whitelist.includes(fileExtension);
}

/**
 * @Method: Check image document extension permission.
 * @Param {string}
 * @Return {boolean}
 */
export function isValidDocumentFileExtension(filename: string): boolean {
  const whitelist = ['.doc', '.pdf', '.xls', '.xlsx', '.csv', '.zip'];
  const fileExtension = this.getFileExtension(filename).toLowerCase();

  return whitelist.includes(fileExtension);
}

/**
 * @Method: Check image document extension permission.
 * @Param {string}
 * @Return {boolean}
 */
export function isValidMediaFileExtension(filename: string): boolean {
  const whitelist = ['.mp4', '.webm', '.aac', '.3gp', '.m4a'];
  const fileExtension = this.getFileExtension(filename).toLowerCase();
  return whitelist.includes(fileExtension);
}