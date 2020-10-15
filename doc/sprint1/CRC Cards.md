## CRC Cards



### Frontend

Home Page

```
Component name: Navbar

Parent class: None
Subclasses:  None

Responsibilities: 
- Allow the user navigate to the main areas of the website
- Display the logo

Collaborators: 
- All pages

Modules:
- Angular Router
```

```
Component name: LandingPage

Parent class: None
Subclasses:  None

Responsibilities: 
- Contains all infor

Collaborators: 
- All pages

Modules:
- Angular Router

```

Login

```
Navbar [refer to Home Page]
```

```
Component name: LoginCard

Parent class: None
Subclasses:  None

Responsibilities: 
- Contains form for the user to submit their login information
- Gives user the option to login with other methods

Collaborators: 
- N/A
```

Signup

```
Navbar [refer to Home Page]
```

```
Component name: SignupCard

Parent class: None
Subclasses:  None

Responsibilities: 
- Contains form for the user to submit their signup information
- Gives user the option to signup with other methods

Collaborators: 
- N/A

```

```
Component name: Question

Parent class: None
Subclasses:  None

Responsibilities: 
- Display a question to the user
- Give the user options to select as their answer

Collaborators: 
- N/A

```

Dashboard

```
Component name: Sidebar

Parent class: None
Subclasses:  None

Responsibilities: 
- Contains form for the user to submit their signup information
- Gives user the option to signup with other methods

Collaborators: 
- N/A

```

```
Component name: ClassesCard

Parent class: None
Subclasses:  None

Responsibilities: 
- Gives a user a shortcut to their class
- Gives a user a short description of their class

Collaborators: 
- N/A
```

```
Component name: LoggedInHeader

Parent class: None
Subclasses:  None

Responsibilities: 
- Allows search feature
- Gives shortcuts to 

Collaborators: 
- N/A

Service:
- User
```

Classes

```
LoggedInHeader [refer to Dashboard]
```

```
Component name: CoursePage

Parent class: None
Subclasses:  None

Responsibilities: 
- Page for a course

Collaborators: 
- N/A

Service:
- Course
```

Social Initiatives

```
Component name: SocialInitiatives

Parent class: None
Subclasses:  None

Responsibilities: 
- Page for a SocialInitiatives

Collaborators: 
- N/A

Service:
- SocialInitiaitve
```

Messaging

```
Component name: ChatHistory

Parent class: None
Subclasses:  None

Responsibilities: 
- Displaying the messages between two users

Collaborators: 
- N/A

Service:
- User
```

Profile

```
Component name: ProfilePage

Parent class: None
Subclasses:  None

Responsibilities: 
- Page for a Profile

Collaborators: 
- N/A

Service:
- User
```

Create New Course

```
Component name: NewCourse

Parent class: None
Subclasses:  None

Responsibilities: 
- Contains a form for the Instructor to submit a new course

Collaborators: 
- N/A

Service:
- Course
- Instructor
```

Social Initiative Job Board

```
Component name: JobCard

Parent class: None
Subclasses:  None

Responsibilities: 
- Hows description of a job

Collaborators: 
- N/A

Service:
- Course
- User
```



### Services 

REST API

```
Class name: User

Parent class (if any): None

Subclasses (if any): ImpactLearner, ImpactConsultant, SocialInitiative, Administrator 

Responsibilities: 

- Create an account
- Communicate with other users
- Knows their login credentials

Collaborators: 
- Course
```

```
Class name: ImpactLearner

Parent class (if any): User

Subclasses (if any): None

Responsibilities: 
- Enroll in a course
- Submit assessments 
- Leave a review for a course/instructor
- Request support from the Giving Garden
- Apply for a position at a Social Initiative 

Collaborators: 
- Course
- ImpactConsultant
- SocialInitiative
```

```
Class name: ImpactConsultant

Parent class (if any): User

Subclasses (if any): None

Responsibilities: 
- Create a course
- Create assessments 
- Getting involved with a Social Initiative 

Collaborators: 
- Course
- ImpactLearner
- SocialInitiative
```

```
Class name: SocialInitiative

Parent class (if any): User

Subclasses (if any): None

Responsibilities: 
- Create their own organization page
- Post new volunteer / job opportunities
- Request support from the Giving Garden

Collaborators: 
- ImpactConsultant
- ImpactLearner
```

```
Class name: Administrator

Parent class (if any): User

Subclasses (if any): None

Responsibilities: 
- Delete courses

Collaborators: 
- None
```

```
Class name: **Course**

Parent class (if any): None

Subclasses (if any): None

Responsibilities: 
- Store all course content
- Store all assessments 
- Store list of students
- Provide overview of course content

Collaborators: 
- User
```

