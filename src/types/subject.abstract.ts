import { Observer } from './observer.interface';
import { RawData, WebSocket } from 'ws';

export default abstract class Subject {
  private observers: Observer[];
  protected clients: Map<string, WebSocket>;

  constructor () {
    this.observers = [];
    this.clients = new Map();
  }

  public attach(observer: Observer): void {
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  public notify(message: RawData): void {
    try {
      const messageParse = JSON.parse(message.toString());
      if (!messageParse.message.user_id) throw new Error('INVALID_INPUT');
      this.observers.forEach(observer => observer.update(messageParse, this.clients));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else console.error(error);
    }
  }
}