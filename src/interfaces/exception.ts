import { Message } from './basic';
export type Exception = Message;

export interface UndefinedException extends Exception {
  error: any;
}
