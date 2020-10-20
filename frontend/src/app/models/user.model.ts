export interface User{
  "_id": string,
  "username": string,
  "email": string,
  "password": string,
  "type": string,
  "classesEnrolled": object[];
  "classesTeaching": object[];
  "questionaire": string[][];
}
