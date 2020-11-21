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
  reviews: object[];
  surveyRequest: boolean;
  assessments: string[];
  lectures: [{ id: string; title: string, date: Date }];
  instructorReview: [{ _id: string; surveyAnswers: string[] }];
}
