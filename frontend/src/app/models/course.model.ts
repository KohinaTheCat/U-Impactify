export interface Course {
  _id: string;
  level: string;
  title: string;
  students: [string];
  teachers: [string];
  description: string;
}

