## Sprint 1



### Goal

> To Learn

- Everyone must know the basics of:
  - Angular
  - JavaScript
  - HTML/CSS
  - MongoDB
  - Node/Express

>  Set up the MEAN Stack

- Angular (Frontend)
  - to export the Figma to HTML/CSS *(try)*
    - define the necessary components required
  - *If* we cannot export the Figma to HTML/CSS
    - start constructing the Frontend based on the Figma
- MongoDB (Backend)
  - Discuss the optimum schemas for our database
  - Build a boilerplate for our REST API using Node and Express

>  System Design

- CRC cards
  - Discuss what are the best design patterns to use for our project, and where
  - Refactor CRC cards when necessary 
- Software Architecture Diagram
  - http://www.draw.io 

> Complete User Stories assigned to Sprint 1



### User Stories to be Completed, and Task Break Down

> Key Terms to Note

​	database refers to `(MongoDB)`	

​	frontend refers to  `(Angular, HTML, CSS)`

​	backend  refers to `(Node, Express)`

​	REST API would be done using `(Node, Express, Mongoose)`

​	

`Refer to Jira Board for the User Story ID`

> BOUN-10: As a User, I want to create an account, so that I can access the platform.

`Story Points: 3`

- Frontend
  - Make a form so that the user can enter their credentials to signup
  - Make sure the user input is valid
    - email address is correctly formatted
    - password is strong enough
- Backend
  - Get the information from the frontend, and send it to the database
  - Have the user verify their email address
    - only add them as a valid user, once their email is verified
  - Add the new user to the database 
- Testing
  - Postman/Insomnia 
  - Manual Testing
  - Robot

> BOUN-14: As an Instructor, I want to create a course, so that users are able to enroll/view.

`Story Points: 5`

- Frontend
  - Make a form so that the instructor can enter course details
    - Ensure the instructor adds all the required information
  - Dynamically create a course page 
- Backend
  - Add-on to the REST API, so that a new course is made and added to the database
    - Give each course a `unique id`
    - Keep track of the owner of each course 
  - For the course page
    - (For now) The URL for the course page is the domain concatenated with the `unique id` of the course. 
- Testing
  - Manual Testing
  - Postman/Insomnia
  - Robot

> BOUN-3: As a Student, I want to be able to enroll in a course, so that I can access the course content and lessons.

`Story Points: 2`

- Frontend 
  - On the course page, allow students to join the course using a button
  - - (see `BOUND-14: Course Page`)
- Backend
  - Add-on to the REST API
  - Add the student to the course, and update accordingly on the database
    - This course is added in the list of courses for this student
    - This student is added in the list of students of this course
- Testing
  - Manual Testing
  - Postman/Insomnia
  - Robot

> BOUN-21: Boilerplate of Website

`Story Points: 5`

- Frontend
  - Setup frontend with Angular
    - https://angular.io/
  - Migrate Figma to Angular *(if possible)*
- Backend
  - Setup backend with MongoDB, Express, Node



> Team Capacity

`TOTAL STORY POINTS: 15`



### Details About Tasks Per Member

> All

- Learn all technologies that will be used in this project
  - mentioned in `Goal`
- Everyone is given the full-stack role, everyone will work on both front-end and back-end



> See Jira board for more detail about tasks assigned



### Blockers / Spikes 

> Learning Curve 

- We *don't* know our :sparkles: **TRUE** :sparkles: capacity
- Everyone has to get familiar with the technologies and libraries that we will have to do
  - Most of our group isn't familiar with web development and the limited amount of time

> Time

- Everyone's availability is different
  - hard to find time to collectively discuss important parts of our project



### **Participants **

**_ALL_** team members (`Navinn, Brian, Clara, Samyak, Divyam, Aryan, Winson`) were present for this meeting and have individually contributed to the above goals/plans sufficiently.