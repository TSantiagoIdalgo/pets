import UserQueryController from '#src/controllers/user/user-query-controller';
import UserQueryModel from '#src/models/user/user-query-model';
import { Router } from 'express';

const userRouter = Router();
const userQueryModel = new UserQueryModel();
const userQueryController = new UserQueryController(userQueryModel);

userRouter.get('/', userQueryController.getAllUsers.bind(userQueryController));

userRouter.get('/:id', userQueryController.getUserById.bind(userQueryController));

userRouter.post('/login', userQueryController.getUserLogin.bind(userQueryController));

userRouter.post('/login/network', userQueryController.getUserNetworkLogin.bind(userQueryController));

export default userRouter;