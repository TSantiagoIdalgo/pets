import ErrorHandler from '#src/helpers/error-handler';
import AnimalCommandModel from '#src/models/animal/animal-command-model';
import { ErrorTypes } from '#src/types/errors.type';
import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { unlinkSync, existsSync } from 'fs';
import { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET_KEY } from '../../config/config';
import { UploadedFile } from 'express-fileupload';
import { IAnimal } from '#src/types/animal.type';

export default class AnimalCommandController {
  private readonly animalCommandModel: AnimalCommandModel;
  constructor (animalCommandModel: AnimalCommandModel) {
    this.animalCommandModel = animalCommandModel;
  }

  public createAnimal = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files) throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      if (!Array.isArray(req.files.images)) {
        throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      }
      if (Array.isArray(req.files.video)) {
        throw new ErrorHandler(400, ErrorTypes.BAD_REQUEST);
      }
      const { video, images } = req.files;
      const newProduct = {
        ...req.body,
        video: await this.uploadFile(video),
        images: await Promise.all(images.map(image => this.uploadFile(image))),
      } as IAnimal;


      const animal = await this.animalCommandModel.createAnimal(newProduct);
      res.status(201).json(animal);
    } catch (error) {
      if (req.files) {
        const { images, video } = req.files;
        if (!Array.isArray(video) && existsSync(video.tempFilePath)) {
          unlinkSync(video.tempFilePath);
        }
        if (Array.isArray(images)) {
          images.map(image => {
            if (existsSync(image.tempFilePath)) unlinkSync(image.tempFilePath);
          });
        }
      }
      next(error);
    }
  };

  private async uploadFile (file: UploadedFile) {
    const { tempFilePath } = file;
    try {
      this.checkExtension(file);
      cloudinary.config({
        cloud_name: CLOUD_NAME,
        api_key: CLOUD_KEY,
        api_secret: CLOUD_SECRET_KEY
      });

      const result = await cloudinary.uploader.upload(tempFilePath, {
        folder: 'uploads',
        resource_type: 'auto'
      });
      if (existsSync(tempFilePath)) unlinkSync(tempFilePath);

      return result.secure_url;
    } catch (error) {
      if (existsSync(tempFilePath)) unlinkSync(tempFilePath);
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error(ErrorTypes.INTERNAL_ERROR);
    }
  }

  private checkExtension (file: UploadedFile) {
    const { name } = file;
    const extension = name.split('.').pop();
    if (!extension) throw new Error(ErrorTypes.INVALID_INPUT);
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'webp', 'webm', 'mp4'];
    if (!allowedExtensions.includes(extension)) throw new Error(ErrorTypes.INVALID_INPUT);
  }

  public deleteAnimal = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.animalCommandModel.deleteAnimal(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}