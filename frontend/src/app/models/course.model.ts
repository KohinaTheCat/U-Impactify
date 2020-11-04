/**
 * Course Frontend model
 *  - synchronous with `~/backend/models/course.model.js`
 *
 * @property {String} _id mongoDB ObjectId
 */
export interface Course {
  _id: string;
  name: string;
  students: string[];
  teachers: string[];
  description: string;
  tags: string;
  level: string;
  img: string;
  files: string[];
  reviews: string[];
}
