import { WebSocket } from 'ws';
import { IChatMessage } from './chat.type';
export interface Observer {
    update(message: IChatMessage, client?: Map<string, WebSocket>): Promise<void>
}