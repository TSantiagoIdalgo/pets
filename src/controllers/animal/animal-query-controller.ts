import ErrorHandler from '#src/helpers/error-handler';
import AnimalQueryModel from '#src/models/animal/animal-query-model';
import { Filter } from '#src/types/animal/animal-query-model';
import { ErrorTypes } from '#src/types/errors.type';
import { Request, Response, NextFunction } from 'express';

export default class AnimalQueryController {
  private readonly animalQueryModel: AnimalQueryModel;

  constructor(animalQueryModel: AnimalQueryModel) {
    this.animalQueryModel = animalQueryModel;
  }

  public getAnimals = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, size, props } = req.query;
      if (typeof page !== 'string' || typeof size !== 'string') {
        throw new ErrorHandler(404, ErrorTypes.BAD_REQUEST);
      }
      const filter = {
        page: parseInt(page) || 1,
        size: parseInt(size) || 10,
        props: props || {},
      } as Filter;

      const result = await this.animalQueryModel.getAll(filter);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getAnimal = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await this.animalQueryModel.getById(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}