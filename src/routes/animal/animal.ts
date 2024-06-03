import { Router } from 'express';
import AnimalQueryController from '#src/controllers/animal/animal-query-controller';
import AnimalCommandController from '#src/controllers/animal/animal-command-controller';
import AnimalQueryModel from '#src/models/animal/animal-query-model';
import AnimalCommandModel from '#src/models/animal/animal-command-model';

const animalRouter = Router();

const animalQueryModel = new AnimalQueryModel();
const animalCommandModel = new AnimalCommandModel();
const animalQueryController = new AnimalQueryController(animalQueryModel);
const animalCommandController = new AnimalCommandController(animalCommandModel);

animalRouter.get('/', animalQueryController.getAnimals);

animalRouter.get('/:id', animalQueryController.getAnimal);

animalRouter.post('/', animalCommandController.createAnimal);

animalRouter.delete('/:id', animalCommandController.deleteAnimal);

export default animalRouter;