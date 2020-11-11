/**
 * Course Frontend model
 *  - synchronous with `~/backend/models/assessment.model.js`
 */
export interface Assessment {
    courseId: string,
    name: string,
    file: string,
    studentSubmissions: string[][],
  }
  