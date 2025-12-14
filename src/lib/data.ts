import type { User, Post, Job, Event } from './types';
import placeholderData from './placeholder-images.json';

const getPlaceholderImageUrl = (id: string) => {
    const image = placeholderData.placeholderImages.find(img => img.id === id);
    return image ? image.imageUrl : `https://picsum.photos/seed/default/600/400`;
}

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Aditi Rao',
    avatarUrl: getPlaceholderImageUrl('avatar-1'),
    headline: 'Senior AI Scientist at Zoho Corp',
    location: 'Chennai, Tamil Nadu',
    industry: 'Technology',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Cloud Computing'],
    isMentor: true,
    connections: 890,
    about: 'Passionate AI Scientist with 7 years of experience in building cutting-edge machine learning models. Currently leading a team to develop generative AI solutions at Zoho.',
    experience: [
      {
        title: 'Senior AI Scientist',
        company: 'Zoho Corp',
        companyLogoUrl: getPlaceholderImageUrl('company-logo-1'),
        startDate: 'Jan 2020',
        endDate: 'Present',
        description: 'Leading research and development of new AI-powered features for Zoho\'s product suite.'
      },
      {
        title: 'Software Engineer',
        company: 'Tata Consultancy Services',
        companyLogoUrl: getPlaceholderImageUrl('company-logo-2'),
        startDate: 'Jun 2017',
        endDate: 'Dec 2019',
        description: 'Worked on enterprise software solutions for international clients.'
      }
    ],
    profileUrl: '/profile'
  },
  {
    id: '2',
    name: 'Vikram Kumar',
    avatarUrl: getPlaceholderImageUrl('avatar-2'),
    headline: 'Product Lead at Freshworks',
    location: 'Bengaluru, Karnataka',
    industry: 'SaaS',
    skills: ['Product Strategy', 'Agile Methodologies', 'User Experience', 'Market Analysis'],
    isMentor: false,
    connections: 621,
    about: 'Customer-obsessed Product Leader with a track record of launching successful SaaS products. I thrive on solving complex problems and building high-performing teams.',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '3',
    name: 'Meera Krishnan',
    avatarUrl: getPlaceholderImageUrl('avatar-3'),
    headline: 'Principal UX Designer at Flipkart',
    location: 'Bengaluru, Karnataka',
    industry: 'E-commerce',
    skills: ['UX Design', 'Figma', 'Interaction Design', 'Design Systems'],
    isMentor: true,
    connections: 550,
    about: 'Designing seamless and delightful experiences for millions of users at India\'s leading e-commerce platform.',
    experience: [],
    profileUrl: '/profile'
  },
    {
    id: '4',
    name: 'Arjun Reddy',
    avatarUrl: getPlaceholderImageUrl('avatar-4'),
    headline: 'Data Analytics Head at Swiggy',
    location: 'Hyderabad, Telangana',
    industry: 'Food Technology',
    skills: ['Data Analytics', 'Python', 'SQL', 'Tableau', 'Big Data'],
    isMentor: true,
    connections: 710,
    about: 'Leveraging data to drive business growth and enhance customer experiences in the fast-paced food tech industry.',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '5',
    name: 'Lakshmi Menon',
    avatarUrl: getPlaceholderImageUrl('avatar-5'),
    headline: 'Brand Manager at Hindustan Unilever',
    location: 'Mumbai, Maharashtra',
    industry: 'FMCG',
    skills: ['Brand Management', 'Digital Marketing', 'Campaign Strategy'],
    isMentor: false,
    connections: 480,
    about: 'Building and nurturing iconic brands. Experienced in creating impactful marketing campaigns that resonate with consumers.',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '6',
    name: 'Rohan Prasad',
    avatarUrl: getPlaceholderImageUrl('avatar-6'),
    headline: 'Investment Banker at ICICI Securities',
    location: 'Mumbai, Maharashtra',
    industry: 'Finance',
    skills: ['Investment Banking', 'Financial Modeling', 'Mergers & Acquisitions'],
    isMentor: true,
    connections: 920,
    about: 'Advising corporations on capital raising and strategic M&A transactions. Passionate about financial markets and corporate strategy.',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '7',
    name: 'Ananya Sharma',
    avatarUrl: getPlaceholderImageUrl('avatar-7'),
    headline: 'HR Business Partner at Infosys',
    location: 'Pune, Maharashtra',
    industry: 'Information Technology',
    skills: ['Human Resources', 'Talent Management', 'Employee Engagement'],
    isMentor: false,
    connections: 410,
    about: 'Strategic HR partner dedicated to fostering a positive and inclusive work environment and driving organizational success.',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '8',
    name: 'Karthik Iyer',
    avatarUrl: getPlaceholderImageUrl('avatar-8'),
    headline: 'Robotics Engineer at Ather Energy',
    location: 'Bengaluru, Karnataka',
    industry: 'Automotive',
    skills: ['Robotics', 'C++', 'Automation', 'ROS'],
    isMentor: true,
    connections: 680,
    about: 'Building the future of urban mobility. Working on automation and robotics for intelligent electric vehicles.',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '9',
    name: 'Divya Nair',
    avatarUrl: getPlaceholderImageUrl('avatar-9'),
    headline: 'Film Director & Screenwriter',
    location: 'Kochi, Kerala',
    industry: 'Entertainment',
    skills: ['Filmmaking', 'Screenwriting', 'Directing', 'Storytelling'],
    isMentor: false,
    connections: 325,
    about: 'Telling compelling stories that reflect the richness of our culture. Director of the award-winning short film "Oru Kadhai".',
    experience: [],
    profileUrl: '/profile'
  },
  {
    id: '10',
    name: 'Dr. Surya Pillai',
    avatarUrl: getPlaceholderImageUrl('avatar-10'),
    headline: 'Professor of Computer Science at IIT Madras',
    location: 'Chennai, Tamil Nadu',
    industry: 'Education',
    skills: ['Academia', 'Research', 'Computer Science', 'Teaching'],
    isMentor: true,
    connections: 250,
    about: 'Educator and researcher in the field of theoretical computer science. Committed to mentoring the next generation of engineers and scientists.',
    experience: [],
    profileUrl: '/profile'
  }
];

export const CURRENT_USER = MOCK_USERS[0];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: MOCK_USERS[1],
    content: 'Thrilled to announce the launch of our new CRM module at Freshworks! A massive shout-out to the entire team for their relentless effort. #SaaS #ProductLaunch #Freshworks',
    imageUrl: getPlaceholderImageUrl('post-image-1'),
    likes: 180,
    comments: 25,
    createdAt: '3h ago'
  },
  {
    id: 'p2',
    author: MOCK_USERS[2],
    content: 'Deep diving into the nuances of building scalable design systems. Wrote a blog post on my findings. Link in bio! #UXDesign #DesignSystems #Flipkart',
    imageUrl: getPlaceholderImageUrl('post-image-3'),
    likes: 95,
    comments: 15,
    createdAt: '1d ago'
  },
  {
    id: 'p3',
    author: MOCK_USERS[0],
    content: 'Heading to the NASSCOM Technology & Leadership Forum next month. Who else will be there? Would love to connect and discuss the future of AI in India. #NASSCOM #AI #Networking',
    imageUrl: getPlaceholderImageUrl('post-image-2'),
    likes: 250,
    comments: 50,
    createdAt: '4d ago'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Senior ML Engineer',
    company: 'Zoho Corp',
    companyLogoUrl: getPlaceholderImageUrl('company-logo-1'),
    location: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    postedAt: '2d ago'
  },
  {
    id: 'j2',
    title: 'Lead Data Analyst',
    company: 'Swiggy',
    companyLogoUrl: getPlaceholderImageUrl('company-logo-4'),
    location: 'Bengaluru, Karnataka (Hybrid)',
    type: 'Full-time',
    postedAt: '4d ago'
  },
  {
    id: 'j3',
    title: 'UX Design Intern',
    company: 'Flipkart',
    companyLogoUrl: getPlaceholderImageUrl('company-logo-3'),
    location: 'Bengaluru, Karnataka',
    type: 'Internship',
    postedAt: '1w ago'
  },
   {
    id: 'j4',
    title: 'Digital Marketing Specialist',
    company: 'Hindustan Unilever',
    companyLogoUrl: getPlaceholderImageUrl('company-logo-5'),
    location: 'Mumbai, Maharashtra',
    type: 'Full-time',
    postedAt: '2w ago'
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Chennai Alumni Chapter Meetup',
    bannerUrl: getPlaceholderImageUrl('event-banner-1'),
    date: 'Oct 28, 2024',
    location: 'Online',
    attendees: 180,
  },
  {
    id: 'e2',
    title: 'Workshop: Building a Career in SaaS',
    bannerUrl: getPlaceholderImageUrl('event-banner-2'),
    date: 'Nov 15, 2024',
    location: 'University Campus, Main Hall',
    attendees: 85,
  },
  {
    id: 'e3',
    title: 'Annual Alumni Reunion Dinner',
    bannerUrl: getPlaceholderImageUrl('event-banner-3'),
    date: 'Dec 10, 2024',
    location: 'The Leela Palace, Chennai',
    attendees: 350,
  }
];
