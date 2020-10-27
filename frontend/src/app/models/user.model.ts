/**
 * User Frontend model
 *  - synchronous with `~/backend/models/user.model.js`
 */
export interface User {
  _id: string;
  password: string;
  email: string;
  type: string;
  classesEnrolled: object[];
  classesTeaching: object[];
  questionaire: string[][];
  socialInitiative: object;
}
