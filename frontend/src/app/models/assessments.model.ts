/**
 * Assessments model
 *  - synchronous with `~/backend/models/user.model.js`
 */

// Is it okay to make this?
export interface Assessments {
  courseId: String;
  name: String;
  visibility: boolean;
  files: String[];
  studentSubmissions: String[][];
}
