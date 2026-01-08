
import type { User, Job, Event, Post, Experience, Certification } from './types';

export const dummyUsers: User[] = [
  // Mentors / Senior Alumni
  {
    id: 'user-1',
    firstName: 'Arjun',
    lastName: 'Krishnamurthy',
    email: 'arjun.k@example.com',
    profilePictureUrl: `https://picsum.photos/seed/user1/200/200`,
    headline: 'Principal Engineer at Zoho Corporation',
    location: 'Chennai, Tamil Nadu',
    industry: 'Software Development',
    skills: ['Cloud Computing', 'SaaS', 'Microservices', 'System Design', 'Go'],
    alumni: true,
    isMentor: true,
    about: 'Seasoned software architect with over 15 years of experience in building scalable, cloud-native applications. Passionate about mentoring the next generation of engineers and fostering a culture of technical excellence. Graduated from PSG College of Technology.',
    experience: [
      { title: 'Principal Engineer', company: 'Zoho Corporation', companyLogoUrl: `https://logo.clearbit.com/zoho.com`, startDate: '2015', endDate: 'Present', description: 'Leading the architecture and development of a new suite of SaaS products.' },
      { title: 'Senior Software Engineer', company: 'Freshworks', companyLogoUrl: `https://logo.clearbit.com/freshworks.com`, startDate: '2010', endDate: '2015', description: 'Key contributor to the Freshdesk platform, focusing on performance and scalability.' },
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect - Professional', issuingOrganization: 'Amazon Web Services', credentialId: 'AWS-PRO-12345' }
    ]
  },
  {
    id: 'user-2',
    firstName: 'Priya',
    lastName: 'Subramanian',
    email: 'priya.s@example.com',
    profilePictureUrl: `https://picsum.photos/seed/user2/200/200`,
    headline: 'Director of Product Management at Freshworks',
    location: 'Chennai, Tamil Nadu',
    industry: 'Product Management',
    skills: ['Product Strategy', 'Agile Methodologies', 'User Research', 'Market Analysis', 'Roadmap Planning'],
    alumni: true,
    isMentor: true,
    about: 'Product leader with a track record of launching successful B2B SaaS products. Expertise in translating customer needs into compelling product features. I enjoy guiding aspiring product managers. Alumnus of Anna University.',
     experience: [
      { title: 'Director of Product Management', company: 'Freshworks', companyLogoUrl: `https://logo.clearbit.com/freshworks.com`, startDate: '2018', endDate: 'Present', description: 'Overseeing the product strategy for the CRM and Sales suites.' },
      { title: 'Product Manager', company: 'Chargebee', companyLogoUrl: `https://logo.clearbit.com/chargebee.com`, startDate: '2014', endDate: '2018', description: 'Managed the core billing and subscription management platform.' },
    ],
    certifications: [
      { name: 'Certified Scrum Product Owner (CSPO)', issuingOrganization: 'Scrum Alliance', credentialId: 'CSPO-67890' }
    ]
  },
  // Recent Alumni
  {
    id: 'user-3',
    firstName: 'Karthik',
    lastName: 'Narayanan',
    email: 'karthik.n@example.com',
    profilePictureUrl: `https://picsum.photos/seed/user3/200/200`,
    headline: 'Software Engineer at Microsoft',
    location: 'Bengaluru, Karnataka',
    industry: 'Software Development',
    skills: ['React', 'TypeScript', 'Node.js', 'Azure', 'GraphQL'],
    alumni: true,
    isMentor: false,
    about: 'Passionate frontend developer with a focus on creating beautiful and performant user interfaces. Graduate of SSN College of Engineering, Chennai. Always eager to learn new technologies and contribute to impactful projects.',
    experience: [
      { title: 'Software Engineer', company: 'Microsoft', companyLogoUrl: `https://logo.clearbit.com/microsoft.com`, startDate: '2021', endDate: 'Present', description: 'Working on the Microsoft Teams frontend, improving user experience and performance.' },
    ]
  },
  {
    id: 'user-4',
    firstName: 'Divya',
    lastName: 'Rao',
    email: 'divya.r@example.com',
    profilePictureUrl: `https://picsum.photos/seed/user4/200/200`,
    headline: 'Data Scientist at Amazon',
    location: 'Chennai, Tamil Nadu',
    industry: 'Data Science',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Data Visualization'],
    alumni: true,
    isMentor: false,
    about: 'Data Scientist specializing in Natural Language Processing. My work involves building models to understand and derive insights from customer feedback. Graduated from Madras Institute of Technology.',
    experience: [
      { title: 'Data Scientist', company: 'Amazon', companyLogoUrl: `https://logo.clearbit.com/amazon.com`, startDate: '2020', endDate: 'Present', description: 'Developing NLP models for sentiment analysis and topic modeling on customer reviews.' },
    ]
  },
  // Students
  {
    id: 'user-5',
    firstName: 'Sanjay',
    lastName: 'Kumar',
    email: 'sanjay.k@example.com',
    profilePictureUrl: `https://picsum.photos/seed/user5/200/200`,
    headline: 'Final Year CSE Student at IIT Madras',
    location: 'Chennai, Tamil Nadu',
    industry: 'Information Technology',
    skills: ['C++', 'Data Structures', 'Algorithms', 'Java', 'Python'],
    alumni: false,
    isMentor: false,
    about: 'Aspiring software developer with a strong foundation in computer science fundamentals. Looking for internship opportunities in backend development or cloud computing.'
  },
  {
    id: 'user-6',
    firstName: 'Anusha',
    lastName: 'Menon',
    email: 'anusha.m@example.com',
    profilePictureUrl: `https://picsum.photos/seed/user6/200/200`,
    headline: 'Student at Loyola College, Chennai',
    location: 'Chennai, Tamil Nadu',
    industry: 'Business',
    skills: ['Marketing', 'Social Media', 'Content Creation', 'Public Speaking'],
    alumni: false,
    isMentor: false,
    about: 'Enthusiastic marketing student, passionate about building brands and connecting with audiences. Currently exploring the world of digital marketing and content strategy.'
  },
  {
    id: 'user-7',
    firstName: 'Vikram',
    lastName: 'Singh',
    email: 'vikram.s@example.com',
    profilePictureUrl: `https://picsum.photos/seed/user7/200/200`,
    headline: 'AI & Data Science Student at PSG College of Technology',
    location: 'Coimbatore, Tamil Nadu',
    industry: 'Data Science',
    skills: ['Machine Learning', 'Python', 'Pandas', 'Scikit-learn', 'SQL'],
    alumni: false,
    isMentor: false,
    about: 'Currently in my third year, focusing on AI and Machine Learning. I have a keen interest in computer vision and deep learning applications. I am actively working on personal projects to build my skills and portfolio.'
  }
];

export const dummyJobs: Job[] = [
  {
    id: 'job-1',
    title: 'SPARC Program Coordinator',
    company: 'Maatram Foundation',
    companyLogoUrl: 'https://picsum.photos/seed/maatram/64/64',
    location: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 'job-2',
    title: 'Department Head - Community Outreach',
    company: 'Maatram Foundation',
    companyLogoUrl: 'https://picsum.photos/seed/maatram/64/64',
    location: 'Coimbatore, Tamil Nadu',
    type: 'Full-time',
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: 'job-3',
    title: 'Frontend Developer',
    company: 'Zoho Corporation',
    companyLogoUrl: 'https://logo.clearbit.com/zoho.com',
    location: 'Chennai, Tamil Nadu',
    type: 'Internship',
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 'job-4',
    title: 'Cloud Support Associate',
    company: 'Amazon Web Services',
    companyLogoUrl: 'https://logo.clearbit.com/aws.amazon.com',
    location: 'Bengaluru, Karnataka',
    type: 'Full-time',
    postedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
];

export const dummyEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Alumni Networking Mixer - Chennai Chapter',
    bannerUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTA5ODV8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBuZXR3b3JraW5nJTIwZXZlbnR8ZW58MHx8fHwxNzY3Mzk1MDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'August 15, 2024',
    location: 'The Westin Chennai Velachery',
    attendees: 120,
  },
  {
    id: 'event-2',
    title: 'SPARC: Career Guidance Workshop',
    bannerUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTA5ODV8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB1bml2ZXJzaXR5JTIwd29ya3Nob3B8ZW58MHx8fHwxNzY3Mzk1MDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'September 5, 2024',
    location: 'Online / Virtual Event',
    attendees: 350,
  },
  {
    id: 'event-3',
    title: 'Maatram Foundation Annual Gala',
    bannerUrl: 'https://images.unsplash.com/photo-1604726433857-015a513c3931?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTA5ODV8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBnYWxhJTIwZXZlbnR8ZW58MHx8fHwxNzY3Mzk1MDc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'October 20, 2024',
    location: 'Le Méridien Coimbatore',
    attendees: 250,
  },
];

    