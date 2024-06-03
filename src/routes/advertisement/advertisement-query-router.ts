import { Router } from 'express';
import AdvertisementQueryController from '#src/controllers/advertisement/advertisement-query-controller';
import AdvertisementQueryModel from '#src/models/advertisement/advertisement-query-model';

const advertisementQueryRouter = Router();
const advertisementQueryModel = new AdvertisementQueryModel();
const advertisementQueryController = new AdvertisementQueryController(advertisementQueryModel);

advertisementQueryRouter.get('/', advertisementQueryController.getAllAdvertisement.bind(advertisementQueryController));

advertisementQueryRouter.get('/:id', advertisementQueryController.getAdvertisementById.bind(advertisementQueryController));

export default advertisementQueryRouter;