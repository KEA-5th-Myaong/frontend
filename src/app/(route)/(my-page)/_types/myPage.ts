import jobData from '../_components/jobTest.json';

export type JobCategory = keyof typeof jobData;

export interface ProfileFormProps {
  userName: string;
  userEmail: string;
}
