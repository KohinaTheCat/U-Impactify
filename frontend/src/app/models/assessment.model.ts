/**
 * Course Frontend model
 *  - synchronous with `~/backend/models/assessment.model.js`
 *  @property {String} _id mongoDB ObjectId
 */

export interface Assessment {
  _id: string;
  name: string;
  files: Object[];
  visibility: boolean;
  studentSubmissions: Object[];
}
