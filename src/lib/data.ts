
import type { User, Post, Job, Event } from './types';
import placeholderData from './placeholder-images.json';

const getPlaceholderImageUrl = (id: string) => {
    const image = placeholderData.placeholderImages.find(img => img.id === id);
    return image ? image.imageUrl : `https://picsum.photos/seed/default/600/400`;
}

const southIndianNames = [
  "Aadhya", "Aarav", "Advik", "Akshay", "Amrita", "Anand", "Ananya", "Anirudh", "Anjali", "Arjun", 
  "Arya", "Ashwin", "Bhavana", "Charan", "Deepak", "Deepika", "Dev", "Dhanush", "Divya", "Ganesh", 
  "Gautam", "Gayathri", "Girish", "Gokul", "Harish", "Indra", "Ishaan", "Janani", "Jayant", "Jothi",
  "Kamalesh", "Karthik", "Kavya", "Kiran", "Krishna", "Lakshmi", "Lalitha", "Madhav", "Magesh", "Mahesh",
  "Mani", "Manoj", "Maya", "Meenakshi", "Mohan", "Nandhini", "Naveen", "Nikhil", "Nisha", "Nithya",
  "Pooja", "Pradeep", "Prakash", "Pranav", "Priya", "Rahul", "Rajesh", "Ram", "Ramesh", "Ranjini", 
  "Ravi", "Reshma", "Revathi", "Rohit", "Sachin", "Sanjay", "Sanjana", "Suresh", "Saranya", "Sathish", 
  "Savitha", "Semmozhi", "Shankar", "Shanti", "Sharmila", "Shreya", "Siddharth", "Sindhu", "Sonia", 
  "Sridhar", "Subha", "Sudha", "Sumathi", "Sundar", "Surya", "Swathi", "Tharun", "Uma", "Vani", 
  "Varun", "Venkatesh", "Vidya", "Vijay", "Vikram", "Vinay", "Vinod", "Vishnu", "Vivek", "Yamuna", "Yash"
];

const companies = [
  { name: 'Tata Consultancy Services', logoId: 'company-logo-tcs' },
  { name: 'Microsoft', logoId: 'company-logo-microsoft' },
  { name: 'Amazon Web Services (AWS)', logoId: 'company-logo-amazon' },
  { name: 'Zoho Corporation', logoId: 'company-logo-zoho' },
  { name: 'Infosys', logoId: 'company-logo-infosys' },
  { name: 'Caterpillar Inc.', logoId: 'company-logo-caterpillar' },
  { name: 'Freshworks', logoId: 'company-logo-freshworks' },
  { name: 'Wipro', logoId: 'company-logo-wipro' },
  { name: 'HCL Technologies', logoId: 'company-logo-hcl' },
  { name: 'Tech Mahindra', logoId: 'company-logo-techmahindra' },
  { name: 'LTI Mindtree', logoId: 'company-logo-ltimindtree' },
  { name: 'Chargebee', logoId: 'company-logo-chargebee' },
  { name: 'Kissflow', logoId: 'company-logo-kissflow' },
  { name: 'Gupshup', logoId: 'company-logo-gupshup' },
  { name: 'Postman', logoId: 'company-logo-postman' },
  { name: 'Zeta', logoId: 'company-logo-zeta' },
  { name: 'BrowserStack', logoId: 'company-logo-browserstack' },
];

const jobTitles = [
    'Software Engineer', 'Senior Software Engineer', 'Product Manager', 'Data Scientist', 'Engineering Manager', 'UX Designer',
    'DevOps Engineer', 'Cloud Architect', 'Machine Learning Engineer', 'Cybersecurity Analyst', 'Professor', 'Research Scientist', 'IT Consultant'
];

const usLocations = ['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA'];
const canadaLocations = ['Toronto, ON', 'Vancouver, BC', 'Montreal, QC'];
const otherIntLocations = ['London, UK', 'Berlin, Germany', 'Singapore', 'Dubai, UAE'];
const indiaLocations = ['Bengaluru, Karnataka', 'Hyderabad, Telangana', 'Pune, Maharashtra', 'Chennai, Tamil Nadu', 'Gurgaon, Haryana'];

const allLocations = [...usLocations, ...canadaLocations, ...otherIntLocations, ...indiaLocations];

const skills = [
  ['Java', 'Spring Boot', 'Microservices'],
  ['Python', 'Django', 'Flask'],
  ['JavaScript', 'React', 'Node.js'],
  ['TypeScript', 'Angular', 'GraphQL'],
  ['C#', '.NET', 'Azure'],
  ['Go', 'Kubernetes', 'Docker'],
  ['Swift', 'iOS', 'Xcode'],
  ['Kotlin', 'Android', 'Jetpack Compose'],
  ['Rust', 'Systems Programming', 'WASM'],
  ['Scala', 'Akka', 'Spark'],
  ['Ruby', 'Ruby on Rails', 'Heroku'],
  ['PHP', 'Laravel', 'Symfony'],
  ['Data Science', 'Pandas', 'Scikit-learn'],
  ['Machine Learning', 'TensorFlow', 'PyTorch'],
  ['Cloud Computing', 'AWS', 'GCP'],
  ['DevOps', 'CI/CD', 'Terraform'],
];

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Aditi Rao',
    email: 'aditi.rao@example.com',
    password: 'password123',
    avatarUrl: getPlaceholderImageUrl('avatar-1'),
    headline: 'Senior AI Scientist at Google',
    location: 'Bengaluru, Karnataka',
    industry: 'Technology',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Cloud Computing', 'Generative AI', 'Natural Language Processing'],
    isMentor: true,
    connections: 890,
    about: 'Passionate AI Scientist with over 7 years of experience in building cutting-edge machine learning models. Currently leading a team to develop and scale generative AI solutions at Google. My expertise lies in natural language processing, deep learning, and building large-scale AI systems. I am always excited to connect with fellow tech enthusiasts and mentor aspiring data scientists.',
    experience: [
      {
        title: 'Senior AI Scientist',
        company: 'Google',
        companyLogoUrl: getPlaceholderImageUrl('company-logo-google'),
        startDate: 'Jan 2020',
        endDate: 'Present',
        description: 'Leading research and development of new generative AI-powered features for Google\'s product suite. Responsible for the end-to-end model lifecycle, from data processing and training to deployment and monitoring in production.'
      },
      {
        title: 'Machine Learning Engineer',
        company: 'Microsoft',
        companyLogoUrl: getPlaceholderImageUrl('company-logo-microsoft'),
        startDate: 'Jul 2018',
        endDate: 'Dec 2019',
        description: 'Developed and deployed machine learning models for the Azure AI platform. Worked on projects related to text analytics and predictive maintenance, improving model accuracy by 15%.'
      },
      {
        title: 'Software Engineer',
        company: 'Infosys',
        companyLogoUrl: getPlaceholderImageUrl('company-logo-infosys'),
        startDate: 'Jun 2017',
        endDate: 'Jun 2018',
        description: 'Worked on enterprise software solutions for international clients in the banking sector. Gained foundational experience in software development lifecycle and agile methodologies.'
      }
    ],
    role: 'Alumni'
  },
  {
    id: '2',
    name: 'Vikram Kumar',
    email: 'vikram.kumar@example.com',
    password: 'password123',
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
    role: 'Alumni'
  },
  {
    id: '3',
    name: 'Meera Krishnan',
    email: 'meera.krishnan@example.com',
    password: 'password123',
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
    role: 'Alumni'
  },
    {
    id: '4',
    name: 'Arjun Reddy',
    email: 'arjun.reddy@example.com',
    password: 'password123',
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
    role: 'Alumni'
  },
  {
    id: '5',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    password: 'password123',
    avatarUrl: getPlaceholderImageUrl('avatar-5'),
    headline: 'CSE Student at Chennai Institute of Technology',
    location: 'Chennai, Tamil Nadu',
    industry: 'Education',
    skills: ['Java', 'Data Structures', 'Web Development', 'React'],
    isMentor: false,
    connections: 150,
    about: 'Aspiring software developer with a passion for building innovative web applications. Seeking internship opportunities in the tech industry.',
    experience: [],
    role: 'Student',
    college: 'Chennai Institute of Technology',
    graduationYear: '2025',
    department: 'CSE'
  },
   {
    id: '6',
    name: 'Rahul Varma',
    email: 'rahul.varma@example.com',
    password: 'password123',
    avatarUrl: getPlaceholderImageUrl('avatar-6'),
    headline: 'ECE Student at Rajalakshmi Engineering College',
    location: 'Chennai, Tamil Nadu',
    industry: 'Education',
    skills: ['C++', 'Embedded Systems', 'VLSI', 'IoT'],
    isMentor: false,
    connections: 95,
    about: 'Enthusiastic electronics and communication engineering student interested in the field of IoT and embedded systems.',
    experience: [],
    role: 'Student',
    college: 'Rajalakshmi Engineering College',
    graduationYear: '2026',
    department: 'ECE'
  },
   {
    id: '7',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    password: 'password123',
    avatarUrl: getPlaceholderImageUrl('avatar-7'),
    headline: 'HR Business Partner at Infosys',
    location: 'Pune, Maharashtra',
    industry: 'Information Technology',
    skills: ['Human Resources', 'Talent Management', 'Employee Engagement'],
    isMentor: false,
    connections: 410,
    about: 'Strategic HR partner dedicated to fostering a positive and inclusive work environment and driving organizational success.',
    experience: [],
    role: 'Alumni'
  },
   {
    id: '8',
    name: 'Suresh Menon',
    email: 'suresh.menon@example.com',
    password: 'password123',
    avatarUrl: getPlaceholderImageUrl('avatar-8'),
    headline: 'IT Student at Sathyabama Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    industry: 'Education',
    skills: ['Cybersecurity', 'Networking', 'Python', 'Ethical Hacking'],
    isMentor: false,
    connections: 110,
    about: 'A second-year IT student focused on cybersecurity. Eager to connect with professionals in the security domain.',
    experience: [],
    role: 'Student',
    college: 'Sathyabama Institute of Science and Technology',
    graduationYear: '2027',
    department: 'IT'
  },
  {
    id: '9',
    name: 'Karthik Iyer',
    email: 'karthik.iyer@example.com',
    password: 'password123',
    avatarUrl: getPlaceholderImageUrl('avatar-9'),
    headline: 'Robotics Engineer at Ather Energy',
    location: 'Bengaluru, Karnataka',
    industry: 'Automotive',
    skills: ['Robotics', 'C++', 'Automation', 'ROS'],
    isMentor: true,
    connections: 680,
    about: 'Building the future of urban mobility. Working on automation and robotics for intelligent electric vehicles.',
    experience: [],
    role: 'Alumni'
  },
   {
    id: '10',
    name: 'Dr. Surya Pillai',
    email: 'surya.pillai@example.com',
    password: 'password123',
    avatarUrl: getPlaceholderImageUrl('avatar-10'),
    headline: 'Professor of Computer Science at IIT Madras',
    location: 'Chennai, Tamil Nadu',
    industry: 'Education',
    skills: ['Academia', 'Research', 'Computer Science', 'Teaching'],
    isMentor: true,
    connections: 250,
    about: 'Educator and researcher in the field of theoretical computer science. Committed to mentoring the next generation of engineers and scientists.',
    experience: [],
    role: 'Alumni'
  },
  ...Array.from({ length: 101 }, (_, i) => {
    const studentId = i + 11;
    const colleges = [
        'SRM Institute of Science and Technology', 
        'SRM Easwari Engineering College', 
        'Sri Venkateswara College of Engineering', 
        'Chennai Institute of Technology', 
        'Rajalakshmi Engineering College', 
        'Sathyabama Institute of Science and Technology', 
        'Vellore Institute of Technology',
        'PSG College of Technology',
        'Coimbatore Institute of Technology'
    ];
    const departments = ['ECE', 'EEE', 'CSE', 'Aeronautical Engineering', 'IT', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering', 'Biotechnology'];
    const studentLocations = ['Chennai, Tamil Nadu', 'Coimbatore, Tamil Nadu', 'Madurai, Tamil Nadu', 'Tiruchirappalli, Tamil Nadu'];
    const studentSkills = [['Python', 'Machine Learning'], ['JavaScript', 'React'], ['Java', 'Spring Boot'], ['C#', '.NET'], ['Go', 'Microservices'], ['Swift', 'iOS Development'], ['Kotlin', 'Android Development'], ['TypeScript', 'Node.js'], ['Ruby', 'Rails'], ['PHP', 'Laravel']];
    const graduationYear = 2025 + (i % 4);
    const department = departments[i % departments.length];
    
    return {
      id: `${studentId}`,
      name: `${southIndianNames[i % southIndianNames.length]} ${i % 2 === 0 ? 'Rao' : 'Menon'}`,
      email: `${southIndianNames[i % southIndianNames.length].toLowerCase()}${i}@example.com`,
      password: 'password123',
      avatarUrl: getPlaceholderImageUrl(`avatar-${studentId}`),
      headline: `${department} Student at ${colleges[i % colleges.length]}`,
      location: studentLocations[i % studentLocations.length],
      industry: 'Education',
      skills: studentSkills[i % studentSkills.length],
      isMentor: false,
      connections: Math.floor(Math.random() * 200),
      about: `Eager to learn and grow in the tech industry. Passionate about ${studentSkills[i % studentSkills.length].join(' and ')}.`,
      experience: [],
      role: 'Student' as const,
      college: colleges[i % colleges.length],
      graduationYear: `${graduationYear}`,
      department: department,
    };
  }),
  ...Array.from({ length: 150 }, (_, i) => {
    const alumniId = i + 112;
    const company = companies[i % companies.length];
    const jobTitle = jobTitles[i % jobTitles.length];
    const location = allLocations[i % allLocations.length];
    const userSkills = skills[i % skills.length];
    const isMentor = Math.random() > 0.5;

    return {
      id: `${alumniId}`,
      name: `${southIndianNames[(i+10) % southIndianNames.length]} ${i % 2 === 0 ? 'Nair' : 'Gupta'}`,
      email: `${southIndianNames[(i+10) % southIndianNames.length].toLowerCase()}${i}@example.com`,
      password: 'password123',
      avatarUrl: getPlaceholderImageUrl(`avatar-${alumniId}`),
      headline: `${jobTitle} at ${company.name}`,
      location: location,
      industry: company.name === 'Microsoft' || company.name === 'Amazon Web Services (AWS)' || company.name === 'Google' ? 'Technology' : 'Information Technology and Services',
      skills: userSkills,
      isMentor: isMentor,
      connections: Math.floor(Math.random() * 800) + 200,
      about: `Experienced ${jobTitle} with a demonstrated history of working in the computer software industry. Skilled in ${userSkills.join(', ')}.`,
      experience: [
        {
          title: jobTitle,
          company: company.name,
          companyLogoUrl: getPlaceholderImageUrl(company.logoId),
          startDate: `${['Jan', 'Mar', 'Jun', 'Sep'][i%4]} 20${15 + (i%8)}`,
          endDate: 'Present',
          description: `Working as a ${jobTitle} focusing on ${userSkills[0]}.`
        }
      ],
      role: 'Alumni' as const,
    };
  })
];

export const REGISTERED_USERS: User[] = [];

export let CURRENT_USER: User = MOCK_USERS[0];

export function setCurrentUser(user: User) {
  CURRENT_USER = user;
}

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: MOCK_USERS.find(u => u.id === '2')!,
    content: 'Thrilled to announce the launch of our new cloud-native observability platform at AWS! A massive shout-out to the entire team for their relentless effort. This new platform will empower developers to monitor their applications with unprecedented detail and efficiency. \n\n#Cloud #ProductLaunch #AWS #Observability',
    imageUrl: getPlaceholderImageUrl('post-image-1'),
    likes: 180,
    comments: 25,
    createdAt: '3h ago'
  },
  {
    id: 'p2',
    author: MOCK_USERS.find(u => u.id === '3')!,
    content: 'Deep diving into the nuances of building scalable design systems. It’s not just about components; it’s about creating a shared language for designers and developers. Wrote a blog post on my findings. Link in bio!\n\n#UXDesign #DesignSystems #Flipkart #ProductDesign',
    imageUrl: getPlaceholderImageUrl('post-image-2'),
    likes: 95,
    comments: 15,
    createdAt: '1d ago'
  },
  {
    id: 'p3',
    author: MOCK_USERS.find(u => u.id === '1')!,
    content: 'Heading to the Google Cloud Summit in Bengaluru next month. Who else will be there? Would love to connect and discuss the future of AI in India and the amazing possibilities of GenAI.\n\n#GoogleCloud #AI #Networking #GenAI',
    imageUrl: getPlaceholderImageUrl('post-image-3'),
    likes: 250,
    comments: 50,
    createdAt: '2d ago'
  },
  {
    id: 'p4',
    author: MOCK_USERS.find(u => u.id === '4')!,
    content: 'Just analyzed our latest delivery data and found some fascinating trends in order patterns during peak hours! Data is the new oil, and we are drilling! The insights will help us optimize our fleet and reduce delivery times significantly.\n\n#DataAnalytics #Swiggy #BigData #Logistics',
    imageUrl: getPlaceholderImageUrl('post-image-4'),
    likes: 120,
    comments: 18,
    createdAt: '3d ago'
  },
  {
    id: 'p5',
    author: MOCK_USERS.find(u => u.id === '5')!,
    content: 'Excited to start my summer internship journey as a Software Engineer Intern! Grateful for the opportunity to learn from the best and contribute to real-world projects. Let the learning begin!\n\n#Internship #StudentLife #Tech #SoftwareDevelopment',
    imageUrl: getPlaceholderImageUrl('post-image-5'),
    likes: 75,
    comments: 12,
    createdAt: '5d ago'
  },
  {
    id: 'p6',
    author: MOCK_USERS.find(u => u.id === '9')!,
    content: 'Just published my first robotics project on GitHub! It\'s an autonomous line-following robot built with an Arduino and a few sensors. Check out the repository and let me know your thoughts!\n\n#Robotics #AtherEnergy #Engineering #OpenSource',
    imageUrl: getPlaceholderImageUrl('post-image-6'),
    likes: 210,
    comments: 32,
    createdAt: '6d ago'
  },
    {
    id: 'p7',
    author: MOCK_USERS.find(u => u.id === '10')!,
    content: 'Great discussion today on "The Ethics of AI" with my students. It\'s crucial to consider the societal impact of the technology we build. The future is in their hands.\n\n#AI #Ethics #Education #IITMadras',
    imageUrl: getPlaceholderImageUrl('post-image-7'),
    likes: 155,
    comments: 28,
    createdAt: '1w ago'
  },
  {
    id: 'p8',
    author: MOCK_USERS.find(u => u.id === '7')!,
    content: 'Proud to be part of a company that prioritizes employee well-being. Our latest "Wellness Week" initiative was a huge success! A healthy team is a happy and productive team.\n\n#HumanResources #EmployeeEngagement #Infosys #WorkLifeBalance',
    imageUrl: getPlaceholderImageUrl('post-image-8'),
    likes: 98,
    comments: 14,
    createdAt: '1w ago'
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
    bannerUrl: getPlaceholderImageUrl('event-banner-2'),
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
