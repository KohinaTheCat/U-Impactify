/**
 * Chat Frontend model
 *  - synchronous with `~/backend/models/chat.model.js`
 *
 * @property {String} _id mongoDB ObjectId
 */
export interface Chat {
  _id: String;
  members: string[];
  messages: [{
    from: string;
    body: string;
    time: Date;
  }]
}