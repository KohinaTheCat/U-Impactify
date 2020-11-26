/**
 * Opportunity Frontend model
 *  - synchronous with `~/backend/models/opportunity.model.js`
 * 
 * @param {string} _id mongodb ObjectId  
 */
export interface Opportunity {
    _id?: string;
    recruiter: string;
    name: string;
    description: string;
    type: string;
    location: string;
    datePosted: Date;
    dateNeeded: Date;
    salary: number;
    numberOfHires: number;
    responsibilites: string[];
    requirements: string[];
    applicants: string[];
  }