
export type User = {
  id: string;
  name: string;
  email: string;
  password?: string; // Should always be handled securely, never sent to client
  avatarUrl: string;
  headline: string;
  location: string;
  industry: string;
  skills: string[];
  isMentor: boolean;
  connections: number;
  about: string;
  experience: Experience[];
  role: 'Alumni' | 'Student';
  college?: string;
  school?: string;
  graduationYear?: string;
  department?: string;
  dateOfBirth?: string;
};

export type Experience = {
  title: string;
  company: string;
  companyLogoUrl: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
};

export type Post = {
  id: string;
  author: Pick<User, 'id' | 'name' | 'avatarUrl' | 'headline'>;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  createdAt: string;
};

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
