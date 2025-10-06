// Interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  year: number;
  branch: string;
  college: string;
  avatar: string;
  isAuthenticated: boolean;
}

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration: number;
  progress: number;
  rating: number;
  thumbnail: string;
  type: 'video' | 'article' | 'pdf' | 'quiz';
  yearRelevance: number[];
  url?: string;
  author?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  difficulty: number;
  averageSalary: string;
  description: string;
  interviewRounds: string[];
  commonQuestions: string[];
  techStack: string[];
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: number;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  totalQuestions: number;
  difficulty: number;
  questions: TestQuestion[];
}

// Mock User
export const mockUser: User = {
  id: '1',
  name: 'Arjun Sharma',
  email: 'arjun.sharma@example.com',
  year: 3,
  branch: 'Computer Science Engineering',
  college: 'Indian Institute of Technology, Delhi',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  isAuthenticated: false
};

// Mock Study Materials
export const mockStudyMaterials: StudyMaterial[] = [
  {
    id: '1',
    title: 'Data Structures and Algorithms Fundamentals',
    description: 'Complete guide to DSA concepts with practical examples and coding problems. Master arrays, linked lists, trees, graphs, and dynamic programming.',
    category: 'Technical Skills',
    subcategory: 'Data Structures & Algorithms',
    difficulty: 3,
    duration: 120,
    progress: 65,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
    type: 'video',
    yearRelevance: [2, 3, 4],
    author: 'Prof. Sarah Johnson',
    url: 'https://example.com/dsa-course'
  },
  // ...add more study materials as needed
];

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Google',
    logo: '/images/GoogleLogo.jpg',
    industry: 'Technology',
    difficulty: 5,
    averageSalary: '₹25-45 LPA',
    description: 'Leading technology company focused on search, cloud computing, and AI.',
    interviewRounds: ['Online Assessment', 'Phone Screen', 'Technical Interviews (3-4)', 'Behavioral Interview'],
    commonQuestions: [
      'Design a URL shortener like bit.ly',
      'Implement LRU Cache',
      'Find the median of two sorted arrays',
      'Design a chat application',
      'Why do you want to work at Google?'
    ],
    techStack: ['Java', 'Python', 'C++', 'Go', 'JavaScript', 'System Design']
  },
  // ...add more companies as needed
];

// Mock Tests
export const mockTests: Test[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals Quiz',
    description: 'Test your knowledge of JavaScript basics and ES6 features.',
    category: 'Programming Languages',
    duration: 30,
    totalQuestions: 15,
    difficulty: 2,
    questions: [
      {
        id: '1',
        question: 'What is the output of: console.log(typeof null)?',
        options: ['null', 'undefined', 'object', 'boolean'],
        correctAnswer: 2,
        explanation: 'In JavaScript, typeof null returns "object" due to a historical bug that has been kept for compatibility.',
        difficulty: 2
      },
      {
        id: '2',
        question: 'Which method is used to add elements to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0,
        explanation: 'The push() method adds one or more elements to the end of an array and returns the new length.',
        difficulty: 1
      }
      // ...add more JS questions
    ]
  },
  {
    id: '2',
    title: 'Data Structures Assessment',
    description: 'Comprehensive test on arrays, linked lists, stacks, and queues.',
    category: 'Technical Skills',
    duration: 45,
    totalQuestions: 20,
    difficulty: 3,
    questions: [
      {
        id: '1',
        question: 'What is the time complexity of inserting an element at the beginning of an array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Inserting at the beginning requires shifting all existing elements, making it O(n).',
        difficulty: 2
      }
      // ...add more DSA questions
    ]
  }
  // ...add more tests as needed
];

// Mock Progress
export const mockProgress = {
  overallProgress: 68,
  studyStreak: 12,
  completedMaterials: 24,
  totalMaterials: 156,
  testsCompleted: 8,
  averageScore: 78,
  badgesEarned: 6,
  weeklyGoal: 5,
  weeklyCompleted: 3
};

// Mock Testimonials
export const mockTestimonials = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'SDE',
    company: 'Microsoft',
    college: 'IIT Bombay',
    content: 'Placify helped me crack my dream job at Microsoft. The company-specific preparation and mock interviews were game-changers!',
    avatar: '/images/Success.jpg',
    rating: 5
  },
  // ...add more testimonials as needed
];

// --------- MOST IMPORTANT: KEYS AS STRINGS BELOW! ---------
export const mockStudyPlans = {
  '1': {
    title: 'Foundation Building Year',
    description: 'Focus on programming fundamentals and basic concepts',
    milestones: [
      { title: 'Learn Programming Basics', completed: true, description: 'Master C/C++ or Python fundamentals' },
      { title: 'Mathematics & Logic', completed: true, description: 'Strengthen mathematical reasoning skills' },
      { title: 'First Coding Contest', completed: false, description: 'Participate in online coding competitions' },
      { title: 'Basic Projects', completed: false, description: 'Build 2-3 simple programming projects' }
    ]
  },
  '2': {
    title: 'Core CS Year',
    description: 'Advance to core computer science principles and start competitive coding',
    milestones: [
      { title: 'Data Structures Mastery', completed: false, description: 'Learn stacks, queues, trees, graphs etc.' },
      { title: 'Algorithm Practice', completed: false, description: 'Solve 50+ algorithm problems' },
      { title: 'Competitive Coding', completed: false, description: 'Participate in 2+ contests' },
      { title: 'Open Source', completed: false, description: 'Contribute to open source project' }
    ]
  },
  '3': {
    title: 'Internship Preparation Year',
    description: 'Prepare for your first internships and develop real-world coding skills',
    milestones: [
      { title: 'Aptitude & Coding Tests', completed: false, description: 'Attempt mock tests for companies' },
      { title: 'Projects Portfolio', completed: false, description: 'Build 1-2 major projects on GitHub' },
      { title: 'Resume & LinkedIn', completed: false, description: 'Prepare resume and LinkedIn profile' },
      { title: 'Core Subjects Review', completed: false, description: 'Revise DBMS, OS, CN, OOPs' }
    ]
  },
  '4': {
    title: 'Placement Preparation Year',
    description: 'Focused practice for final placements, advanced system design, and interviews',
    milestones: [
      { title: 'Advanced DSA & System Design', completed: false, description: 'Study DSA patterns and system design basics' },
      { title: 'Mock Interviews', completed: false, description: 'Participate in at least 5 mock interviews' },
      { title: 'Company-Specific Prep', completed: false, description: 'Target preparation for dream companies' },
      { title: 'HR & Behavioral', completed: false, description: 'Practice HR and behavioral interview questions' }
    ]
  }
};
// -----------------------------------------------------------

// Mock Resources
export const mockResources = [
  {
    id: '1',
    title: 'LeetCode',
    description: 'Practice coding problems and prepare for technical interviews',
    url: 'https://leetcode.com',
    category: 'Coding Practice',
    rating: 4.8,
    isBookmarked: true
  },
  // ...add more resources as needed
];

// Categories and Subcategories
export const categories = [
  'All Categories',
  'Technical Skills',
  'Interview Preparation',
  'Professional Development',
  'Aptitude & Reasoning',
  'Communication Skills'
];

export const subcategories = {
  'Technical Skills': [
    'Data Structures & Algorithms',
    'Programming Languages',
    'System Design',
    'Database Management'
  ],
  'Interview Preparation': [
    'Technical Interview',
    'HR Interview',
    'Group Discussion',
    'Mock Interviews'
  ],
  'Professional Development': [
    'Resume Building',
    'LinkedIn Optimization',
    'Networking',
    'Career Planning'
  ],
  'Aptitude & Reasoning': [
    'Quantitative Aptitude',
    'Logical Reasoning',
    'Verbal Ability',
    'Analytical Skills'
  ],
  'Communication Skills': [
    'Interview Communication',
    'Presentation Skills',
    'Email Writing',
    'Public Speaking'
  ]
};
