import type { User, Post, Job, Event } from './types';

const getPlaceholderImageUrl = (id: string) => `https://picsum.photos/seed/${id}/600/400`;

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Priya Patel',
    avatarUrl: getPlaceholderImageUrl('avatar1'),
    headline: 'Software Engineer at TechCorp',
    location: 'San Francisco, CA',
    industry: 'Technology',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    isMentor: true,
    connections: 500,
    about: 'Passionate software engineer with 5 years of experience in building scalable web applications. Currently focused on cloud technologies and frontend development.',
    experience: [
      {
        title: 'Software Engineer',
        company: 'TechCorp',
        companyLogoUrl: getPlaceholderImageUrl('logo1'),
        startDate: 'Jan 2021',
        endDate: 'Present',
        description: 'Developing and maintaining key features for the main product.'
      },
      {
        title: 'Junior Developer',
        company: 'Innovate LLC',
        companyLogoUrl: getPlaceholderImageUrl('logo2'),
        startDate: 'Jun 2019',
        endDate: 'Dec 2020',
        description: 'Worked on various client projects, focusing on frontend technologies.'
      }
    ],
    profileUrl: '/profile'
  },
  {
    id: '2',
    name: 'John Smith',
    avatarUrl: getPlaceholderImageUrl('avatar2'),
    headline: 'Product Manager at Solutions Inc.',
    location: 'New York, NY',
    industry: 'Finance',
    skills: ['Product Management', 'Agile', 'JIRA', 'Market Research'],
    isMentor: false,
    connections: 432,
    about: 'Experienced Product Manager with a background in finance and technology. I enjoy bridging the gap between user needs and business goals.',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '3',
    name: 'Maria Garcia',
    avatarUrl: getPlaceholderImageUrl('avatar3'),
    headline: 'UX Designer at CreativeMinds',
    location: 'Austin, TX',
    industry: 'Design',
    skills: ['UX Design', 'Figma', 'User Research', 'Prototyping'],
    isMentor: true,
    connections: 312,
    about: 'Creative UX designer focused on creating intuitive and user-friendly digital experiences.',
    experience: [],
    profileUrl: '/profile'
  },
    {
    id: '4',
    name: 'Chen Wei',
    avatarUrl: getPlaceholderImageUrl('avatar4'),
    headline: 'Data Scientist at Data Insights',
    location: 'Chicago, IL',
    industry: 'Data Science',
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
    isMentor: true,
    connections: 620,
    about: 'Data Scientist with a knack for finding stories in data. Expertise in machine learning models and data visualization.',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '5',
    name: 'Fatima Al-Jamil',
    avatarUrl: getPlaceholderImageUrl('avatar5'),
    headline: 'Marketing Lead at Growth Co.',
    location: 'London, UK',
    industry: 'Marketing',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Social Media'],
    isMentor: false,
    connections: 280,
    about: 'Results-driven marketing professional specializing in digital growth strategies for SaaS companies.',
    experience: [],
    profileUrl: '/profile'
  }
];

export const CURRENT_USER = MOCK_USERS[0];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: MOCK_USERS[1],
    content: 'Excited to share that we just launched a new feature at Solutions Inc! It was a huge team effort. Big thanks to everyone involved. #productlaunch #fintech',
    imageUrl: getPlaceholderImageUrl('post1'),
    likes: 125,
    comments: 18,
    createdAt: '2h ago'
  },
  {
    id: 'p2',
    author: MOCK_USERS[2],
    content: 'Just published a new article on the importance of user research in the design process. Would love to hear your thoughts! #uxdesign #userresearch',
    likes: 88,
    comments: 12,
    createdAt: '1d ago'
  },
  {
    id: 'p3',
    author: MOCK_USERS[0],
    content: 'Attending the Global Tech Conference next week! Who else is going? Let\'s connect. #tech #conference #networking',
    imageUrl: getPlaceholderImageUrl('post2'),
    likes: 230,
    comments: 45,
    createdAt: '3d ago'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp',
    companyLogoUrl: getPlaceholderImageUrl('logo1'),
    location: 'San Francisco, CA',
    type: 'Full-time',
    postedAt: '1d ago'
  },
  {
    id: 'j2',
    title: 'Data Analyst',
    company: 'Data Insights',
    companyLogoUrl: getPlaceholderImageUrl('logo4'),
    location: 'Chicago, IL (Remote)',
    type: 'Full-time',
    postedAt: '3d ago'
  },
  {
    id: 'j3',
    title: 'Product Design Intern',
    company: 'CreativeMinds',
    companyLogoUrl: getPlaceholderImageUrl('logo3'),
    location: 'Austin, TX',
    type: 'Internship',
    postedAt: '1w ago'
  },
   {
    id: 'j4',
    title: 'Marketing Manager',
    company: 'Growth Co.',
    companyLogoUrl: getPlaceholderImageUrl('logo5'),
    location: 'London, UK',
    type: 'Full-time',
    postedAt: '2w ago'
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Alumni Networking Night',
    bannerUrl: getPlaceholderImageUrl('event1'),
    date: 'Oct 25, 2024',
    location: 'Online',
    attendees: 150,
  },
  {
    id: 'e2',
    title: 'Workshop: Career in Tech',
    bannerUrl: getPlaceholderImageUrl('event2'),
    date: 'Nov 12, 2024',
    location: 'University Auditorium',
    attendees: 75,
  },
  {
    id: 'e3',
    title: 'Annual Alumni Gala',
    bannerUrl: getPlaceholderImageUrl('event3'),
    date: 'Dec 5, 2024',
    location: 'Grand Hotel Ballroom',
    attendees: 300,
  }
];
