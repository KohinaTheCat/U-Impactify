/**
 * Assessments model
 *  - synchronous with `~/backend/models/user.model.js`
 */

export interface Assessments {
  courseId: String;
  name: String;
  visibility: boolean;
  files: String[];
  studentSubmissions: object[];
}
