import { Router } from 'express';
import UserAssociationsModel from '#src/models/user/user-associations-model';
import UserAssociationsController from '#src/controllers/user/user-associations-controller';

const userAssociationsRouter = Router();

const userAssociationsModel = new UserAssociationsModel();
const userAssociationsController = new UserAssociationsController(userAssociationsModel);

userAssociationsRouter.get('/chat', userAssociationsController.getUserChats.bind(userAssociationsController));

userAssociationsRouter.get('/sheet', userAssociationsController.getUserApplicationSheet.bind(userAssociationsController));

userAssociationsRouter.get('/advertisements', userAssociationsController.getUserAdvertisements.bind(userAssociationsController));

userAssociationsRouter.get('/animals', userAssociationsController.getUserAnimals.bind(userAssociationsController));

export default userAssociationsRouter;