## "CRC Cards"

Class name: **User**

Parent class (if any): None

Subclasses (if any): ImpactLearner, ImpactConsultant, SocialInitiative, Administrator 

Responsibilities: 

- Create an account
- Communicate with other users
- Knows their login credentials

Collaborators: 

- Course



Class name: **ImpactLearner**

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



Class name: **ImpactConsultant**

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



Class name: **SocialInitiative**

Parent class (if any): User

Subclasses (if any): None

Responsibilities: 

- Create their own organization page
- Post new volunteer / job opportunities
- Request support from the Giving Garden

Collaborators: 

- ImpactConsultant

- ImpactLearner

  

Class name: **Administrator**

Parent class (if any): User

Subclasses (if any): None

Responsibilities: 

- Delete courses

Collaborators: 

- None



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