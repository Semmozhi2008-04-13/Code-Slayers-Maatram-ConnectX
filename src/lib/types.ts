
import type { Timestamp } from 'firebase/firestore';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string;
  headline: string;
  location: string;
  industry: string;
  skills: string[];
  alumni: boolean;
  about: string;
  isMentor?: boolean;
  experience?: Experience[];
  certifications?: Certification[];
};

export type Experience = {
  title: string;
  company: string;
  companyLogoUrl: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
};

export type Certification = {
  name: string;
  issuingOrganization: string;
  credentialId: string;
}

export type Post = {
  id: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
    headline: string;
  };
  content: string;
  imageUrl?: string;
  likeCount: number;
  commentCount: number;
  createdAt: Timestamp;
};

export type Comment = {
  id: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  content: string;
  createdAt: Timestamp;
}

export type Job = {
  id: string;
  title: string;
  company: string;
  companyLogoUrl: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  postedAt: string;
};

export type Event = {
  id: string;
  title: string;
  bannerUrl: string;
  date: string;
  location: string;
  attendees: number;
};

export type Mentorship = {
    id: string;
    mentorId: string;
    menteeId: string;
    status: 'pending' | 'active' | 'completed' | 'declined';
    startDate: Timestamp;
    endDate?: Timestamp;
    mentor?: User; // Denormalized data for easier display
    mentee?: User; // Denormalized data for easier display
}
