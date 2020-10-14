## CRC Cards

Class name: **Users**

Parent class (if any): None

Subclasses (if any): Impact Learner, Impact Consultant, Social Initiative, Administrator 

Responsibilities: 

- Create an account
- Communicate with other users
- Able to access the Giving Garden
  - Donate to the Giving Garden

Collaborators: 

- None



Class name: **Impact Learner**

Parent class (if any): Users

Subclasses (if any): None

Responsibilities: 

- Enroll in a course
- Submit assessments 
- Leave a review for a course/instructor
- Request support from the Giving Garden
- Apply for a position at a Social Initiative 

Collaborators: 

- Course
- Profile
- Impact Consultant
- Social Initiative



Class name: **Impact Consultant**

Parent class (if any): Users

Subclasses (if any): None

Responsibilities: 

- Create a course
- Create assessments 
- Getting involved with a Social Initiative 

Collaborators: 

- Course
- Profile
- Impact Learner
- Social Initiative



Class name: **Social Initiative**

Parent class (if any): Users

Subclasses (if any): None

Responsibilities: 

- Create their own organization page
- Post new volunteer / job opportunities
- Request support from the Giving Garden

Collaborators: 

- Profile

- Impact Consultant

- Impact Learner

  

Class name: **Administrator**

Parent class (if any): Users

Subclasses (if any): None

Responsibilities: 

- Delete courses

Collaborators: 

- Course List



Class name: **Course**

Parent class (if any): None

Subclasses (if any): None

Responsibilities: 

- Store all course content
- Store all assessments 
- Store list of students
- Provide overview of course content

Collaborators: 

- Course List



Class name: **Course List**

Parent class (if any): None

Subclasses (if any): None

Responsibilities: 

- Store all the courses
- Allow users to view the courses that are available 

Collaborators: 

- Course



Class name: **Profile**

Parent class (if any): None

Subclasses (if any): None

Responsibilities: 

- Show user generated information (profile picture, skill summary, contact information, etc.)

Collaborators: 

- None



Class name: **Giving Garden**

Parent class (if any): None

Subclasses (if any): None

Responsibilities: 

- Allow users to ask for support for a course or service
- Allow users to support other users or social initiatives

Collaborators: 

- None







