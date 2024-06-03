import { Router } from 'express';
import AdvertisementCommandController from '#src/controllers/advertisement/advertisement-command-controller';
import AdvertisementCommandModel from '#src/models/advertisement/advertisement-command-model';

const advertisementCommandRouter = Router();
const advertisementCommandModel =   new AdvertisementCommandModel();
const advertisementCommandController = new AdvertisementCommandController(advertisementCommandModel);

advertisementCommandRouter.post('/', advertisementCommandController
  .createAdvertisement.bind(advertisementCommandController));

advertisementCommandRouter.put('/', advertisementCommandController
  .updateAdvertisement.bind(advertisementCommandController));

advertisementCommandRouter.delete('/:id', advertisementCommandController
  .deleteAdvertisement.bind(advertisementCommandController));

export default advertisementCommandRouter;