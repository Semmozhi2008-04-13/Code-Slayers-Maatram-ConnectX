import type { User, Post, Job, Event } from './types';
import placeholderData from './placeholder-images.json';

const getPlaceholderImageUrl = (id: string) => {
    const image = placeholderData.placeholderImages.find(img => img.id === id);
    return image ? image.imageUrl : `https://picsum.photos/seed/default/600/400`;
}

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Priya Patel',
    avatarUrl: getPlaceholderImageUrl('avatar-1'),
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
        companyLogoUrl: getPlaceholderImageUrl('company-logo-1'),
        startDate: 'Jan 2021',
        endDate: 'Present',
        description: 'Developing and maintaining key features for the main product.'
      },
      {
        title: 'Junior Developer',
        company: 'Innovate LLC',
        companyLogoUrl: getPlaceholderImageUrl('company-logo-2'),
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
    avatarUrl: getPlaceholderImageUrl('avatar-2'),
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
    avatarUrl: getPlaceholderImageUrl('avatar-3'),
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
    avatarUrl: getPlaceholderImageUrl('avatar-4'),
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
    avatarUrl: getPlaceholderImageUrl('avatar-5'),
    headline: 'Marketing Lead at Growth Co.',
    location: 'London, UK',
    industry: 'Marketing',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Social Media'],
    isMentor: false,
    connections: 280,
    about: 'Results-driven marketing professional specializing in digital growth strategies for SaaS companies.',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '6',
    name: 'David Lee',
    avatarUrl: getPlaceholderImageUrl('avatar-6'),
    headline: 'Venture Capitalist at Future Ventures',
    location: 'Palo Alto, CA',
    industry: 'Venture Capital',
    skills: ['Venture Capital', 'Startups', 'Fintech'],
    isMentor: true,
    connections: 890,
    about: 'Investor in early-stage technology companies. Always looking for the next big thing.',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '7',
    name: 'Aisha Khan',
    avatarUrl: getPlaceholderImageUrl('avatar-7'),
    headline: 'Human Resources Manager at PeopleFirst',
    location: 'Toronto, Canada',
    industry: 'Human Resources',
    skills: ['Recruiting', 'Employee Relations', 'HR Policies'],
    isMentor: false,
    connections: 350,
    about: 'HR professional passionate about creating positive and productive workplace cultures.',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '8',
    name: 'Kenji Tanaka',
    avatarUrl: getPlaceholderImageUrl('avatar-8'),
    headline: 'AI Researcher at IntelliGence',
    location: 'Tokyo, Japan',
    industry: 'Artificial Intelligence',
    skills: ['Deep Learning', 'NLP', 'PyTorch'],
    isMentor: true,
    connections: 710,
    about: 'Researching and developing the next generation of artificial intelligence systems.',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '9',
    name: 'Sofia Rossi',
    avatarUrl: getPlaceholderImageUrl('avatar-9'),
    headline: 'Chef & Owner at La Cucina di Sofia',
    location: 'Rome, Italy',
    industry: 'Hospitality',
    skills: ['Culinary Arts', 'Restaurant Management', 'Italian Cuisine'],
    isMentor: false,
    connections: 215,
    about: 'Bringing authentic Italian cuisine to the heart of Rome.',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '10',
    name: 'James O\'Connell',
    avatarUrl: getPlaceholderImageUrl('avatar-10'),
    headline: 'Professor of History at City University',
    location: 'Boston, MA',
    industry: 'Education',
    skills: ['History', 'Research', 'Teaching'],
    isMentor: true,
    connections: 150,
    about: 'Historian specializing in 20th-century American history. Dedicated to educating the next generation.',
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
    imageUrl: getPlaceholderImageUrl('post-image-1'),
    likes: 125,
    comments: 18,
    createdAt: '2h ago'
  },
  {
    id: 'p2',
    author: MOCK_USERS[2],
    content: 'Just published a new article on the importance of user research in the design process. Would love to hear your thoughts! #uxdesign #userresearch',
    imageUrl: getPlaceholderImageUrl('post-image-3'),
    likes: 88,
    comments: 12,
    createdAt: '1d ago'
  },
  {
    id: 'p3',
    author: MOCK_USERS[0],
    content: 'Attending the Global Tech Conference next week! Who else is going? Let\'s connect. #tech #conference #networking',
    imageUrl: getPlaceholderImageUrl('post-image-2'),
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
    companyLogoUrl: getPlaceholderImageUrl('company-logo-1'),
    location: 'San Francisco, CA',
    type: 'Full-time',
    postedAt: '1d ago'
  },
  {
    id: 'j2',
    title: 'Data Analyst',
    company: 'Data Insights',
    companyLogoUrl: getPlaceholderImageUrl('company-logo-4'),
    location: 'Chicago, IL (Remote)',
    type: 'Full-time',
    postedAt: '3d ago'
  },
  {
    id: 'j3',
    title: 'Product Design Intern',
    company: 'CreativeMinds',
    companyLogoUrl: getPlaceholderImageUrl('company-logo-3'),
    location: 'Austin, TX',
    type: 'Internship',
    postedAt: '1w ago'
  },
   {
    id: 'j4',
    title: 'Marketing Manager',
    company: 'Growth Co.',
    companyLogoUrl: getPlaceholderImageUrl('company-logo-5'),
    location: 'London, UK',
    type: 'Full-time',
    postedAt: '2w ago'
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Alumni Networking Night',
    bannerUrl: getPlaceholderImageUrl('event-banner-1'),
    date: 'Oct 25, 2024',
    location: 'Online',
    attendees: 150,
  },
  {
    id: 'e2',
    title: 'Workshop: Career in Tech',
    bannerUrl: getPlaceholderImageUrl('event-banner-2'),
    date: 'Nov 12, 2024',
    location: 'University Auditorium',
    attendees: 75,
  },
  {
    id: 'e3',
    title: 'Annual Alumni Gala',
    bannerUrl: getPlaceholderImageUrl('event-banner-3'),
    date: 'Dec 5, 2024',
    location: 'Grand Hotel Ballroom',
    attendees: 300,
  }
];
