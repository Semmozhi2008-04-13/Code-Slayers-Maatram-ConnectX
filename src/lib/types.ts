export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  headline: string;
  location: string;
  industry: string;
  skills: string[];
  isMentor: boolean;
  connections: number;
  about: string;
  experience: Experience[];
  profileUrl: string;
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
  author: Pick<User, 'id' | 'name' | 'avatarUrl' | 'headline' | 'profileUrl'>;
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
