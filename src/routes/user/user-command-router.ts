import { Router } from 'express';
import UserCommandModel from '#src/models/user/user-command-model';
import UserCommandController from '#src/controllers/user/user-command-controller';
import UserQueryModel from '#src/models/user/user-query-model';

const userCommandRouter = Router();
const userQueryModel = new UserQueryModel();
const userCommandModel = new UserCommandModel(userQueryModel);
const userCommandController = new UserCommandController(userCommandModel);

userCommandRouter.post('/', userCommandController.createUser.bind(userCommandController));

userCommandRouter.put('/', userCommandController.updateUser.bind(userCommandController));

userCommandRouter.delete('/', userCommandController.deleteUser.bind(userCommandController));

export default userCommandRouter;