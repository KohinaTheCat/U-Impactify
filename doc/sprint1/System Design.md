<div style="display: flex; justify-content: space-between; height: 100vh; margin-bottom: 20vh; align-items: center;">
<img width="400" src="../../frontend/src/assets/login-signup/login.png"></img>
<div><img  src="../../frontend/src/assets/word-logo.png"></img>
  <h3 style="text-align: center;">Software Design Documentation</h3>
  <div>
  <br>

  ### Team Boundless:

  - Navinn Ravindaran (`ravindar`)  
  - Clara Chick (`chickcla`)  
  - Winson Yuan (`yuanwins`)  
  - Brian Kim (`kimbri15`)  
  - Samyak Mehta (`mehtas28`)  
  - Divyam Patel (`pate1006`)  
  - Aryan Patel (`pate1065`)  

  </div>
</div>
</div>

<br>

<div style="display: flex; justify-content: space-between; height: 100vh">
  <div>

# Table of Contents

1. CRC Cards  
   - Frontend:  
     - Pages - `3`
     - Services - `4`
     - Guards 
     - Components - `5`
   - Backend:  
     - REST API Routes - `6`

2. Meeting the MVC Spec., *a note on Angular*

3. Software Architecture Design - `7`

</div>
<img width="400" height="325" src="../../frontend/src/assets/login-signup/signup.png"></img>
</div>

<div style="height: 25vh"></div>

# CRC Cards

## Frontend Pages   

<br>

Class: `LoginSignup`

| Responsibilities                                                      | Collaborators   |
| --------------------------------------------------------------------- | --------------- |
| - Contains form for the user to submit their login/signup information | - `UserService` |
| - Gives user the option to login/signup with other methods            |                 |

<br>

Class: `Questionaire`
| Responsibilities                                            | Collaborators   |
| ----------------------------------------------------------- | --------------- |
| - Display questions based on the type of user you signup as | - `UserService` |
| - Gather information based on questions submited            |                 |
|                                                             |                 |


<br>

Class: `Dashboard`

| Responsibilities                                   | Collaborators     |
| -------------------------------------------------- | ----------------- |
| - Display all pages                                | - `UserService`   |
| - Used to quickly navigate through different pages | - `CourseService` |
|                                                    | - `AuthGuard`     |

<br>


Class: `Course`

| Responsibilities                                                  | Collaborators     |
| ----------------------------------------------------------------- | ----------------- |
| - Display Course information                                      | - `UserService`   |
| - Allow possible interaction with course if `User` has permission | - `CourseService` |
|                                                                   |                   |

<br>


Class: `Messaging`

| Responsibilities                                      | Collaborators   |
| ----------------------------------------------------- | --------------- |
| - Enable Users to send private messages to each other | - `UserService` |


<br>


Class: `Feedback`

| Responsibilities                                     | Collaborators     |
| ---------------------------------------------------- | ----------------- |
| - Display feedback for courses from registered users | - `UserService`   |
|                                                      | - `CourseService` |


<div style="height: 15vh"></div>


Class: `GivingGarden`

| Responsibilities                                            | Collaborators   |
| ----------------------------------------------------------- | --------------- |
| - Donate money to a non-profit organization                 | - `UserService` |
| - Recieve Funding from individuals and larger organizations |                 |
| - Support Impact Learners in courses financially            |                 |


<br>

## Frontend Services
<br>


Class: `UserService`

| Responsibilities                | Collaborators     |
| ------------------------------- | ----------------- |
| - Create an account             | - `User` (Routes) |
| - Delete an account             |                   |
| - Get current user informations |                   |

<br>

Class: `CourseService`

| Responsibilities                     | Collaborators       |
| ------------------------------------ | ------------------- |
| - Create a course                    | - `Course` (Routes) |
| - Modify a course                    |                     |
| - Delete a course                    |                     |
| - Upload a file                      |                     |
| - Provide overview of course content |                     |

<br>

## Frontend Guards
<br>


Class: `AuthGuard`

| Responsibilities                                                | Collaborators   |
| --------------------------------------------------------------- | --------------- |
| - Check if User is logged in, if so, allow them to use the site | - `UserService` |


<div style="height: 30vh"></div>

## Frontend Components
<br>

Class: `DashboardCoursesComponent` (only for impact learner and impact consultant)

| Responsibilities                                   | Collaborators |
| -------------------------------------------------- | ------------- |
| - Display the courses the user is taking/teaching  | - `User`      |
| - Redirects you to create a course for easy access |               |

<br>

Class: `CreateCourseComponent` (only for impact consultant)

| Responsibilities                                            | Collaborators     |
| ----------------------------------------------------------- | ----------------- |
| - Contains a form for the Instructor to create a new course | - `UserService`   |
|                                                             | - `CourseService` |


<br>

Class: `FrontPageHeaderComponent`

| Responsibilities                          | Collaborators   |
| ----------------------------------------- | --------------- |
| - Display Sign-in and login-in buttons    | - `UserService` |
| - Easy accessible application infromation |                 |


<br>

Class: `FooterComponent`

| Responsibilities                      | Collaborators |
| ------------------------------------- | ------------- |
| - Display contact information         |               |
| - Links to social media accounts      |               |
| - Provide links to legal informations |               |


<br>

Class: `GlobalSearchComponent`

| Responsibilities       | Collaborators     |
| ---------------------- | ----------------- |
| - Search for Userss    | - `UserService`   |
| - Search for Courses   | - `CourseService` |
| - Search for Documents |                   |

<div style="height: 30vh"></div>

## Backend REST API Routes

<br>

Route: `/user`

| Responsibilities                                        | Collaborators   |
| ------------------------------------------------------- | --------------- |
| - Standard CRUD Operations on the User model            | - `UserService` |
| - Return formatted JSON data as called by `UserService` |                 |

<br>

Route: `/course`

| Responsibilities                                                                  | Collaborators     |
| --------------------------------------------------------------------------------- | ----------------- |
| - Standard CRUD Operations on the Course model                                    | - `CourseService` |
| - Upload and Receive documents and/or media files from client to database and v.v |                   |
| - Return formatted JSON data as called by `CourseService`                         |                   |


<br>

## Meeting the MVC Spec.
> A note on Angular.

Information used in this note was primarly source from:  
 [`https://stackoverflow.com/questions/35762515/is-angular2-mvc`](https://stackoverflow.com/questions/35762515/is-angular2-mvc)

### Introduction

For the duration of this project, this team will be using Angular 10 as the front-end framework of choice. Before Angular 10 there was AngularJS, which was, and still is, a MVW (Model, View, Whatever) framework. For our purposes, we can classify it as a pure MVC framework because you can clearly defined View, (`HTML`), Model and Controller (`JavaScript/TypeScript`) files. Angular 10 (or any version after 1.0), is a complete architectural overhaul, with a switch to a more *component-driven architecture*, a CLI, and more. 

### What does this have to do with MVC?

The argument is quite simple, *show Angular 10 follows an MVC based architecture*. Now for the proof, we must consider two different Software Architectures, one for the program as a whole, and one **_specifically_** for each Angular component. For the former, refer to the below images. 

In short, we treat models as `mongooseSchemas` (models) in the database files and front-end models that are a copy of the backend model, views as the `html` presented to the user, and controllers as front-end services + backend routes.

Each Angular component gets its own directory with 2 important files (we can disregard the styles and the unit testing files for our purposes), an `html`, and a `ts` file. The `html` file is trivially the view, and with the `ts` file, if its a simple component, we can think of it as **_both_** a controller and model. As input/output logic is handled through functions declared in this file, and model states can also be managed as well, albeit it may not be as organized as it would be using Angular Services. Hence achieving our desired MVC architechture.

<div style="height: 20vh"></div>

## Software Architecture Design

![](./Software%20Architecture%20Design%20One.png)

![](./Software%20Architecture%20Design%20Two.png)