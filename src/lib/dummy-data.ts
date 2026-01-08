
import type { User, Job, Event, Post, Experience, Certification } from './types';

export const dummyUsers: User[] = [
  // Mentors / Senior Alumni
  {
    id: 'user-1',
    firstName: 'Arjun',
    lastName: 'Krishnamurthy',
    email: 'arjun.k@example.com',
    profilePictureUrl: `https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=200&q=80`,
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
    profilePictureUrl: `https://images.unsplash.com/photo-1624298357597-2b22f2444e2c?auto=format&fit=crop&w=200&q=80`,
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
    {
    id: 'user-8',
    firstName: 'Rohan',
    lastName: 'Gupta',
    email: 'rohan.g@example.com',
    profilePictureUrl: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4331?auto=format&fit=crop&w=200&q=80',
    headline: 'Lead Data Scientist at Tiger Analytics',
    location: 'Chennai, Tamil Nadu',
    industry: 'Data Science',
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'NLP', 'Big Data'],
    alumni: true,
    isMentor: true,
    about: 'Lead Data Scientist with a passion for solving complex business problems using machine learning. Experienced in leading teams and delivering high-impact data science projects. Alumnus of IIT Madras.',
    experience: [
      { title: 'Lead Data Scientist', company: 'Tiger Analytics', companyLogoUrl: 'https://logo.clearbit.com/tigeranalytics.com', startDate: '2019', endDate: 'Present', description: 'Leading a team of data scientists on various client projects.' },
    ],
    certifications: []
  },
  // Recent Alumni
  {
    id: 'user-3',
    firstName: 'Karthik',
    lastName: 'Narayanan',
    email: 'karthik.n@example.com',
    profilePictureUrl: `https://images.unsplash.com/photo-1622263098276-8178a3615993?auto=format&fit=crop&w=200&q=80`,
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
    profilePictureUrl: `https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=200&q=80`,
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
    profilePictureUrl: `https://images.unsplash.com/photo-1555120282-57698662916b?auto=format&fit=crop&w=200&q=80`,
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
    profilePictureUrl: `https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=200&q=80`,
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
    profilePictureUrl: `https://images.unsplash.com/photo-1526413227916-383412a8a589?auto=format&fit=crop&w=200&q=80`,
    headline: 'AI & Data Science Student at PSG College of Technology',
    location: 'Coimbatore, Tamil Nadu',
    industry: 'Data Science',
    skills: ['Machine Learning', 'Python', 'Pandas', 'Scikit-learn', 'SQL'],
    alumni: false,
    isMentor: false,
    about: 'Currently in my third year, focusing on AI and Machine Learning. I have a keen interest in computer vision and deep learning applications. I am actively working on personal projects to build my skills and portfolio.'
  },
  {
    id: 'user-9',
    firstName: 'Meera',
    lastName: 'Nair',
    email: 'meera.n@example.com',
    profilePictureUrl: 'https://images.unsplash.com/photo-1594385313333-e2863a3952f9?auto=format&fit=crop&w=200&q=80',
    headline: 'UX Designer at ThoughtWorks',
    location: 'Coimbatore, Tamil Nadu',
    industry: 'Design',
    skills: ['UX Design', 'UI Design', 'Figma', 'User Research', 'Prototyping'],
    alumni: true,
    isMentor: true,
    about: 'Creative UX designer focused on crafting intuitive and user-friendly digital experiences. I believe in a user-centered design approach to solve real-world problems. Graduate of National Institute of Design.',
    experience: [
      { title: 'UX Designer', company: 'ThoughtWorks', companyLogoUrl: 'https://logo.clearbit.com/thoughtworks.com', startDate: '2020', endDate: 'Present', description: 'Designing user experiences for various clients across different domains.' },
    ],
    certifications: []
  },
  {
    id: 'user-10',
    firstName: 'Aditya',
    lastName: 'Sharma',
    email: 'aditya.s@example.com',
    profilePictureUrl: 'https://images.unsplash.com/photo-1578635073854-e8932f7b1e41?auto=format&fit=crop&w=200&q=80',
    headline: 'DevOps Engineer at HCL Technologies',
    location: 'Madurai, Tamil Nadu',
    industry: 'IT Services',
    skills: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'AWS'],
    alumni: true,
    isMentor: false,
    about: 'DevOps engineer with experience in automating and streamlining the software development lifecycle. Proficient in building and maintaining CI/CD pipelines. Alumnus of Thiagarajar College of Engineering.',
    experience: [
      { title: 'DevOps Engineer', company: 'HCL Technologies', companyLogoUrl: 'https://logo.clearbit.com/hcltech.com', startDate: '2019', endDate: 'Present', description: 'Managing infrastructure and deployment pipelines for enterprise clients.' },
    ],
    certifications: []
  },
  {
    id: 'user-11',
    firstName: 'Sneha',
    lastName: 'Patel',
    email: 'sneha.p@example.com',
    profilePictureUrl: 'https://images.unsplash.com/photo-1574660430686-b2a255cfce68?auto=format&fit=crop&w=200&q=80',
    headline: 'Student at SRM Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    industry: 'Engineering',
    skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Git'],
    alumni: false,
    isMentor: false,
    about: 'A motivated engineering student with a strong interest in web development. I am currently learning React and looking for opportunities to apply my skills in a real-world project.'
  },
  {
    id: 'user-12',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.k@example.com',
    profilePictureUrl: 'https://images.unsplash.com/photo-1602566356438-dd36d35e989c?auto=format&fit=crop&w=200&q=80',
    headline: 'Student at VIT Chennai',
    location: 'Chennai, Tamil Nadu',
    industry: 'Computer Science',
    skills: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Microservices'],
    alumni: false,
    isMentor: false,
    about: 'A computer science student with a passion for backend development. I have experience building RESTful APIs using Spring Boot and I am eager to learn more about microservices architecture.'
  }
];

export const dummyJobs: Job[] = [
  {
    id: 'job-1',
    title: 'SPARC Program Coordinator',
    company: 'Maatram Foundation',
    companyLogoUrl: 'https://images.unsplash.com/photo-1707784014029-6ea4c88b7074?auto=format&fit=crop&w=64&q=80',
    location: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 'job-2',
    title: 'Department Head - Community Outreach',
    company: 'Maatram Foundation',
    companyLogoUrl: 'https://images.unsplash.com/photo-1707784014029-6ea4c88b7074?auto=format&fit=crop&w=64&q=80',
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
    bannerUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1080&q=80',
    date: 'August 15, 2024',
    location: 'The Westin Chennai Velachery',
    attendees: 120,
  },
  {
    id: 'event-2',
    title: 'SPARC: Career Guidance Workshop',
    bannerUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1080&q=80',
    date: 'September 5, 2024',
    location: 'Online / Virtual Event',
    attendees: 350,
  },
  {
    id: 'event-3',
    title: 'Maatram Foundation Annual Gala',
    bannerUrl: 'https://images.unsplash.com/photo-1604726433857-015a513c3931?auto=format&fit=crop&w=1080&q=80',
    date: 'October 20, 2024',
    location: 'Le Méridien Coimbatore',
    attendees: 250,
  },
];


export const dummyPosts: Omit<Post, 'id'>[] = [
  {
    author: {
      id: 'user-1',
      name: 'Arjun Krishnamurthy',
      avatarUrl: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=200&q=80',
      headline: 'Principal Engineer at Zoho Corporation'
    },
    content: 'Just wrapped up a great session mentoring students on system design principles. It\'s incredibly rewarding to see the next generation of engineers so passionate and full of potential. Keep learning, keep building! #mentorship #systemdesign #engineering',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1080&q=80',
    likeCount: 152,
    commentCount: 18,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) as any
  },
  {
    author: {
      id: 'user-3',
      name: 'Karthik Narayanan',
      avatarUrl: 'https://images.unsplash.com/photo-1622263098276-8178a3615993?auto=format&fit=crop&w=200&q=80',
      headline: 'Software Engineer at Microsoft'
    },
    content: 'Thrilled to share that I\'ve officially joined Microsoft as a Software Engineer! A big thank you to my mentors and professors from SSN College. Looking forward to contributing to amazing products and learning from the best in the industry. #newbeginnings #microsoft #softwareengineer',
    likeCount: 230,
    commentCount: 45,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) as any
  },
  {
    author: {
      id: 'user-5',
      name: 'Sanjay Kumar',
      avatarUrl: 'https://images.unsplash.com/photo-1555120282-57698662916b?auto=format&fit=crop&w=200&q=80',
      headline: 'Final Year CSE Student at IIT Madras'
    },
    content: 'Our team just won the internal hackathon at IIT Madras! We built a project using computer vision to help farmers detect crop diseases early. It was an intense 24 hours, but so proud of what we accomplished. #hackathon #computervision #iitmadras #agritech',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1080&q=80',
    likeCount: 98,
    commentCount: 12,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) as any
  },
  {
    author: {
      id: 'user-2',
      name: 'Priya Subramanian',
      avatarUrl: 'https://images.unsplash.com/photo-1624298357597-2b22f2444e2c?auto=format&fit=crop&w=200&q=80',
      headline: 'Director of Product Management at Freshworks'
    },
    content: 'What are the key metrics you track for a new product launch? I find that focusing on a single "North Star Metric" often provides more clarity than a dashboard full of vanity metrics. For us, it\'s usually tied to user activation and retention. Would love to hear other perspectives! #productmanagement #kpis #saas',
    likeCount: 180,
    commentCount: 32,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) as any
  },
  {
    author: {
      id: 'user-9',
      name: 'Meera Nair',
      avatarUrl: 'https://images.unsplash.com/photo-1594385313333-e2863a3952f9?auto=format&fit=crop&w=200&q=80',
      headline: 'UX Designer at ThoughtWorks'
    },
    content: 'A reminder for all designers: you are not your user. The most beautiful interface can fail if it doesn\'t solve the user\'s problem. Always start with empathy and research. #uxdesign #uidesign #designthinking',
    likeCount: 112,
    commentCount: 20,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) as any
  },
  {
    author: {
      id: 'user-7',
      name: 'Vikram Singh',
      avatarUrl: 'https://images.unsplash.com/photo-1526413227916-383412a8a589?auto=format&fit=crop&w=200&q=80',
      headline: 'AI & Data Science Student at PSG College of Technology'
    },
    content: 'Just completed the "AI for Everyone" course by Andrew Ng. It\'s a fantastic introduction to the world of AI, even for non-technical folks. Highly recommend it to anyone curious about how AI is changing our world. #ai #machinelearning #datascience #coursera',
    likeCount: 75,
    commentCount: 9,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) as any
  }
];

    