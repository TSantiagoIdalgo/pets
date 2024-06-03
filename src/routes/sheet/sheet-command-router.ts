import { Router } from 'express';
import SheetCommandModel from '#src/models/applicationSheet/sheet-command-model';
import SheetCommandController from '#src/controllers/sheet/sheet-command-controller';

const sheetCommandRouter = Router();
const sheetCommandModel = new SheetCommandModel();
const sheetCommandController = new SheetCommandController(sheetCommandModel);

sheetCommandRouter.post('/', sheetCommandController.createSheet.bind(sheetCommandController));

sheetCommandRouter.put('/', sheetCommandController.updateSheet.bind(sheetCommandController));

sheetCommandRouter.delete('/', sheetCommandController.deleteSheet.bind(sheetCommandController));

export default sheetCommandRouter;