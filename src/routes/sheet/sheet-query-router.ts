import { Router } from 'express';
import SheetQueryController from '#src/controllers/sheet/sheet-query-controller';
import SheetQueryModel from '#src/models/applicationSheet/sheet-query-model';

const sheetQueryRouter = Router();
const sheetQueryModel = new SheetQueryModel();
const sheetQueryController = new SheetQueryController(sheetQueryModel);

sheetQueryRouter.get('/', sheetQueryController.getApplications.bind(sheetQueryController));

sheetQueryRouter.get('/:id', sheetQueryController.getApplication.bind(sheetQueryController));

sheetQueryRouter.get('/user/:id', sheetQueryController.getAppliedUsers.bind(sheetQueryController));

export default sheetQueryRouter;