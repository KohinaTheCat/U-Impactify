/**
 * Chat Frontend model
 *  - synchronous with `~/backend/models/chat.model.js`
 *
 * @property {string} _id mongoDB ObjectId
 */
export interface Chat {
  _id: string;
  members: string[];
  messages: object[];
}