export interface User{
  "_id": string,
  "username": string,
  "email": string,
  "password": string,
  "type": string,
  "classesEnrolled": string[];
  "classesTeaching": string[];
  "questionaire": string[][];
}
