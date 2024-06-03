import express from 'express';
import WebSocket from 'ws';
import cors from 'cors';
import morgan from 'morgan';
import ErrorService from './helpers/error-service';
import TokenVerify from './helpers/token';
import fileUpload from 'express-fileupload';
import { createServer } from 'http';
import { limiter } from './helpers/request-limiter';

import animalRouter from './routes/animal/animal';
import ChatWsController from './controllers/chat/chat-ws-controller';
import ChatWsModel from './models/chat/chat-ws-model';
import userQueryRouter from './routes/user/user-query-router';
import userCommandRouter from './routes/user/user-command-router';
import userAssociationsRouter from './routes/user/user-associations-router';
import sheetCommandRouter from './routes/sheet/sheet-command-router';
import sheetQueryRouter from './routes/sheet/sheet-query-router';
import advertisementCommandRouter from './routes/advertisement/advertisement-command-router';
import advertisementQueryRouter from './routes/advertisement/advertisement-query-router';

const app = express();
const errorService = new ErrorService();

app.use(cors());
app.use(morgan('dev'));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(TokenVerify);
app.use(fileUpload({ useTempFiles: true }));

app.use('/user', userQueryRouter, userCommandRouter, userAssociationsRouter);
app.use('/sheet', sheetQueryRouter, sheetCommandRouter);
app.use('/advertisement', advertisementQueryRouter, advertisementCommandRouter);
app.use('/animal', animalRouter);

export const server = createServer(app);
export const ws = new WebSocket.Server({ server });

app.use(errorService.ErrorSave);

const chatWsModel = new ChatWsModel();
const chatWsController = new ChatWsController(chatWsModel);

ws.on('connection', (socket) => { chatWsController.WebSocketConnection(socket); });