/**
 * Course Frontend model
 *  - synchronous with `~/backend/models/assessment.model.js`
 */
export interface Assessment {
    _id: string;
    name: string,
    files: string[],
    visibility: boolean,
    studentSubmissions: object[],
  }