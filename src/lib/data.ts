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
    headline: 'Senior AI Scientist at Google',
    location: 'Bengaluru, Karnataka',
    industry: 'Technology',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Cloud Computing'],
    isMentor: true,
    connections: 890,
    about: 'Passionate AI Scientist with 7 years of experience in building cutting-edge machine learning models. Currently leading a team to develop generative AI solutions at Google.',
    experience: [
      {
        title: 'Senior AI Scientist',
        company: 'Google',
        companyLogoUrl: getPlaceholderImageUrl('company-logo-google'),
        startDate: 'Jan 2020',
        endDate: 'Present',
        description: 'Leading research and development of new AI-powered features for Google\'s product suite.'
      },
      {
        title: 'Software Engineer',
        company: 'Infosys',
        companyLogoUrl: getPlaceholderImageUrl('company-logo-infosys'),
        startDate: 'Jun 2017',
        endDate: 'Dec 2019',
        description: 'Worked on enterprise software solutions for international clients.'
      }
    ],
    profileUrl: '/profile/1',
    role: 'Alumni'
  },
  {
    id: '2',
    name: 'Vikram Kumar',
    avatarUrl: getPlaceholderImageUrl('avatar-2'),
    headline: 'Product Lead at Amazon Web Services (AWS)',
    location: 'Hyderabad, Telangana',
    industry: 'Cloud Computing',
    skills: ['Product Strategy', 'Agile Methodologies', 'User Experience', 'SaaS'],
    isMentor: true,
    connections: 621,
    about: 'Customer-obsessed Product Leader with a track record of launching successful cloud products. I thrive on solving complex problems and building high-performing teams.',
    experience: [
      {
        title: 'Product Lead',
        company: 'Amazon Web Services (AWS)',
        companyLogoUrl: getPlaceholderImageUrl('company-logo-amazon'),
        startDate: 'Mar 2019',
        endDate: 'Present',
        description: 'Defining the roadmap and strategy for new AWS services.'
      }
    ],
    profileUrl: '/profile/2',
    role: 'Alumni'
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
    experience: [
       {
        title: 'Principal UX Designer',
        company: 'Flipkart',
        companyLogoUrl: getPlaceholderImageUrl('company-logo-flipkart'),
        startDate: 'Aug 2018',
        endDate: 'Present',
        description: 'Leading the design for the core shopping experience across mobile and web.'
      }
    ],
    profileUrl: '/profile/3',
    role: 'Alumni'
  },
    {
    id: '4',
    name: 'Arjun Reddy',
    avatarUrl: getPlaceholderImageUrl('avatar-4'),
    headline: 'Data Analytics Head at Swiggy',
    location: 'Bengaluru, Karnataka',
    industry: 'Food Technology',
    skills: ['Data Analytics', 'Python', 'SQL', 'Tableau', 'Big Data'],
    isMentor: true,
    connections: 710,
    about: 'Leveraging data to drive business growth and enhance customer experiences in the fast-paced food tech industry.',
    experience: [
       {
        title: 'Data Analytics Head',
        company: 'Swiggy',
        companyLogoUrl: getPlaceholderImageUrl('company-logo-swiggy'),
        startDate: 'Feb 2021',
        endDate: 'Present',
        description: 'Building and leading a team of analysts to uncover insights from large-scale data.'
      }
    ],
    profileUrl: '/profile/4',
    role: 'Alumni'
  },
  {
    id: '5',
    name: 'Priya Sharma',
    avatarUrl: getPlaceholderImageUrl('avatar-5'),
    headline: 'Final Year CSE Student at Chennai Institute of Technology',
    location: 'Chennai, Tamil Nadu',
    industry: 'Education',
    skills: ['Java', 'Data Structures', 'Web Development', 'React'],
    isMentor: false,
    connections: 150,
    about: 'Aspiring software developer with a passion for building innovative web applications. Seeking internship opportunities in the tech industry.',
    experience: [],
    profileUrl: '/profile/5',
    role: 'Student',
    college: 'Chennai Institute of Technology',
    graduationYear: '2025'
  },
   {
    id: '6',
    name: 'Rahul Varma',
    avatarUrl: getPlaceholderImageUrl('avatar-6'),
    headline: 'ECE Student at Rajalakshmi Engineering College',
    location: 'Chennai, Tamil Nadu',
    industry: 'Education',
    skills: ['C++', 'Embedded Systems', 'VLSI', 'IoT'],
    isMentor: false,
    connections: 95,
    about: 'Enthusiastic electronics and communication engineering student interested in the field of IoT and embedded systems.',
    experience: [],
    profileUrl: '/profile/6',
    role: 'Student',
    college: 'Rajalakshmi Engineering College',
    graduationYear: '2026'
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
    profileUrl: '/profile/7',
    role: 'Alumni'
  },
   {
    id: '8',
    name: 'Suresh Menon',
    avatarUrl: getPlaceholderImageUrl('avatar-8'),
    headline: 'IT Student at Sathyabama Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    industry: 'Education',
    skills: ['Cybersecurity', 'Networking', 'Python', 'Ethical Hacking'],
    isMentor: false,
    connections: 110,
    about: 'A second-year IT student focused on cybersecurity. Eager to connect with professionals in the security domain.',
    experience: [],
    profileUrl: '/profile/8',
    role: 'Student',
    college: 'Sathyabama Institute of Science and Technology',
    graduationYear: '2027'
  },
  {
    id: '9',
    name: 'Karthik Iyer',
    avatarUrl: getPlaceholderImageUrl('avatar-9'),
    headline: 'Robotics Engineer at Ather Energy',
    location: 'Bengaluru, Karnataka',
    industry: 'Automotive',
    skills: ['Robotics', 'C++', 'Automation', 'ROS'],
    isMentor: true,
    connections: 680,
    about: 'Building the future of urban mobility. Working on automation and robotics for intelligent electric vehicles.',
    experience: [],
    profileUrl: '/profile/9',
    role: 'Alumni'
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
    profileUrl: '/profile/10',
    role: 'Alumni'
  },
  ...Array.from({ length: 101 }, (_, i) => {
    const studentId = i + 11;
    const colleges = ['Chennai Institute of Technology', 'Rajalakshmi Engineering College', 'Sathyabama Institute of Science and Technology', 'SRM Institute of Science and Technology', 'Vellore Institute of Technology'];
    const locations = ['Chennai, Tamil Nadu', 'Coimbatore, Tamil Nadu', 'Madurai, Tamil Nadu', 'Tiruchirappalli, Tamil Nadu'];
    const skills = [['Python', 'Machine Learning'], ['JavaScript', 'React'], ['Java', 'Spring Boot'], ['C#', '.NET'], ['Go', 'Microservices'], ['Swift', 'iOS Development'], ['Kotlin', 'Android Development'], ['TypeScript', 'Node.js'], ['Ruby', 'Rails'], ['PHP', 'Laravel']];
    const graduationYear = 2025 + (i % 4);
    
    return {
      id: `${studentId}`,
      name: `Student ${i + 1}`,
      avatarUrl: getPlaceholderImageUrl(`avatar-${studentId}`),
      headline: `Student at ${colleges[i % colleges.length]}`,
      location: locations[i % locations.length],
      industry: 'Education',
      skills: skills[i % skills.length],
      isMentor: false,
      connections: Math.floor(Math.random() * 200),
      about: `Eager to learn and grow in the tech industry. Passionate about ${skills[i % skills.length].join(' and ')}.`,
      experience: [],
      profileUrl: `/profile/${studentId}`,
      role: 'Student' as const,
      college: colleges[i % colleges.length],
      graduationYear: `${graduationYear}`,
    };
  })
];

export const CURRENT_USER = MOCK_USERS[0];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: MOCK_USERS[1],
    content: 'Thrilled to announce the launch of our new cloud-native observability platform at AWS! A massive shout-out to the entire team for their relentless effort. #Cloud #ProductLaunch #AWS',
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
    content: 'Heading to the Google Cloud Summit in Bengaluru next month. Who else will be there? Would love to connect and discuss the future of AI in India. #GoogleCloud #AI #Networking',
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
    company: 'Google',
    companyLogoUrl: getPlaceholderImageUrl('company-logo-google'),
    location: 'Bengaluru, Karnataka',
    type: 'Full-time',
    postedAt: '2d ago'
  },
  {
    id: 'j2',
    title: 'Cloud Support Engineer',
    company: 'Amazon Web Services (AWS)',
    companyLogoUrl: getPlaceholderImageUrl('company-logo-amazon'),
    location: 'Hyderabad, Telangana (Hybrid)',
    type: 'Full-time',
    postedAt: '4d ago'
  },
  {
    id: 'j3',
    title: 'Software Development Intern',
    company: 'Infosys',
    companyLogoUrl: getPlaceholderImageUrl('company-logo-infosys'),
    location: 'Pune, Maharashtra',
    type: 'Internship',
    postedAt: '1w ago'
  },
   {
    id: 'j4',
    title: 'Data Science Intern',
    company: 'Swiggy',
    companyLogoUrl: getPlaceholderImageUrl('company-logo-swiggy'),
    location: 'Bengaluru, Karnataka',
    type: 'Internship',
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
    bannerUrl: 'https://storage.googleapis.com/aif-studiogpt-sc-images/2024-08-01/clx68czn000073b6k9jfj0k4g/8a2e58c0-c3d0-40e9-a35b-873096b797de.png',
    date: 'Nov 15, 2024',
    location: 'University Campus, Main Hall',
    attendees: 85,
  },
  {
    id: 'e3',
    title: 'Annual Alumni Reunion',
    bannerUrl: getPlaceholderImageUrl('event-banner-3'),
    date: 'Dec 10, 2024',
    location: 'The Leela Palace, Chennai',
    attendees: 350,
  }
];

    