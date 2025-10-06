import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Building, 
  DollarSign, 
  Users, 
  Star,
  ArrowRight,
  BookOpen,
  MessageCircle,
  TrendingUp
} from 'lucide-react';

const mockCompanies = [
  {
    id: "google",
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    industry: "Technology",
    description: "Google is a global leader in search, cloud, and software development, well-known for its innovation-centric hiring.",
    difficulty: 5,
    averageSalary: "₹30-50 LPA",
    interviewRounds: [
      "Online Coding Test",
      "Technical Phone Interview",
      "Onsite Interviews (DSA, System Design, Behavioral)"
    ],
    commonQuestions: [
      "Explain the difference between process and thread.",
      "Find the longest palindromic substring in a string.",
      "How would you design Google Maps?",
      "Tell me about a time you worked on a diverse team."
    ],
    techStack: [
      "C++", "Java", "Python", "Go", "JavaScript", "Machine Learning", "Cloud"
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    industry: "Technology",
    description: "Microsoft is a pioneer in personal computing, cloud offerings, and developer tools, with a rigorous technical hiring process.",
    difficulty: 4,
    averageSalary: "₹22-45 LPA",
    interviewRounds: [
      "Online Assessment",
      "Technical Interview (multiple rounds)",
      "HR/Behavioral Interview"
    ],
    commonQuestions: [
      "What happens when you enter a URL in the browser?",
      "Implement LRU Cache.",
      "Explain SOLID principles in OOP.",
      "Describe your favorite project."
    ],
    techStack: [
      "C#", "C++", "Java", "Python", "Azure", ".NET", "JavaScript"
    ],
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    industry: "E-commerce/Technology",
    description: "Amazon is a global leader in e-commerce and cloud, expecting strong data structures and systems design skills.",
    difficulty: 4,
    averageSalary: "₹28-45 LPA",
    interviewRounds: [
      "Online Assessment (OA)",
      "Technical Interviews (Bar Raiser, DSA, System Design)",
      "Hiring Manager/Behavioral"
    ],
    commonQuestions: [
      "Find the Kth largest element in an array.",
      "Design Amazon's product recommendation engine.",
      "Explain a time you disagreed with your team.",
      "What is dynamic programming? Give an example."
    ],
    techStack: [
      "Java", "C++", "Python", "JavaScript", "AWS", "DynamoDB"
    ],
  },
  {
    id: "deloitte",
    name: "Deloitte",
    logo: "https://companieslogo.com/img/orig/DLT-3c58d347.png?t=1699122280",
    industry: "Consulting/IT Services",
    description: "Deloitte is one of the Big 4 global professional services firms, offering Audit, Consulting, Financial Advisory and more.",
    difficulty: 3,
    averageSalary: "₹7-10 LPA",
    interviewRounds: [
      "Online Assessment (Aptitude, Logical, Verbal)",
      "Group Discussion / JAM (Case Study/Scenario)",
      "Technical Interview",
      "HR Interview"
    ],
    commonQuestions: [
      "Tell me about yourself.",
      "Why Deloitte?",
      "Describe a competitive work situation and result.",
      "Case study: How would you approach solving a client’s problem?",
      "What is Agile methodology?",
      "How do you handle feedback?",
      "Describe a time when you worked in a team."
    ],
    techStack: [
      "Java", "Python", "SQL", "Excel", "Cloud (AWS/Azure)", "Business Analysis"
    ],
  },
  {
    id: "infosys",
    name: "Infosys",
    logo: "https://companieslogo.com/img/orig/INFY.NS-ddb86bbb.png?t=1699122348",
    industry: "IT Services",
    description: "Infosys provides next-generation digital services and consulting worldwide.",
    difficulty: 2,
    averageSalary: "₹3-6 LPA",
    interviewRounds: [
      "Online Assessment (Aptitude, Verbal, Coding)",
      "Technical Interview",
      "HR Interview"
    ],
    commonQuestions: [
      "Walk me through your resume.",
      "Why Infosys?",
      "Describe a challenge you faced and how you handled it.",
      "What are your strengths and weaknesses?",
      "Write a code to check for palindrome strings.",
      "What is DBMS?"
    ],
    techStack: [
      "Java", "Python", "SQL", "Cloud", "SAP", "Oracle"
    ],
  },
  {
    id: "tcs",
    name: "TCS",
    logo: "https://companieslogo.com/img/orig/TCS.NS-9c07083a.png?t=1699122109",
    industry: "IT Services",
    description: "TCS is one of the largest Indian multinational IT services and consulting companies.",
    difficulty: 2,
    averageSalary: "₹3-7 LPA",
    interviewRounds: [
      "Online Assessment (Aptitude, Reasoning)",
      "Technical Interview",
      "Managerial/HR Interview"
    ],
    commonQuestions: [
      "Describe yourself.",
      "Why do you want to join TCS?",
      "Explain SDLC.",
      "What is normalization in DBMS?",
      "Write a program to find the factorial of a number."
    ],
    techStack: [
      "Java", "Python", "C#", "SQL", "Cloud", "Testing"
    ],
  },
  {
    id: "wipro",
    name: "Wipro",
    logo: "https://companieslogo.com/img/orig/WIPRO.NS-ecbbb4e7.png?t=1699122341",
    industry: "IT Services",
    description: "Wipro is a leading global information technology, consulting and business process services company.",
    difficulty: 2,
    averageSalary: "₹3.5-7 LPA",
    interviewRounds: [
      "Aptitude/Online Assessment",
      "Technical Interview",
      "HR Interview"
    ],
    commonQuestions: [
      "Tell me about yourself.",
      "Why do you want to work at Wipro?",
      "Can you work in rotational shifts?",
      "Explain OOPs with examples.",
      "Write a program to reverse a string.",
      "Describe a difficult work situation and how you overcame it."
    ],
    techStack: [
      "Java", "C", "C++", "Python", "SQL", "Testing"
    ],
  },
  {
    id: "accenture",
    name: "Accenture",
    logo: "https://companieslogo.com/img/orig/ACN-4417c131.png?t=1699121586",
    industry: "Consulting/IT Services",
    description: "Accenture is a global management consulting and professional services company.",
    difficulty: 3,
    averageSalary: "₹5-10 LPA",
    interviewRounds: [
      "Online Assessment",
      "Technical Interview",
      "HR Interview"
    ],
    commonQuestions: [
      "Why do you want to work at Accenture?",
      "Explain a project you have worked on.",
      "What is Cloud Computing?",
      "How do you handle project deadlines?",
      "Tell us about a time you failed and how you recovered."
    ],
    techStack: [
      "Java", "Python", "Salesforce", "Cloud", "SAP"
    ],
  },
  {
    id: "ibm",
    name: "IBM",
    logo: "https://companieslogo.com/img/orig/IBM-eedd8e82.png?t=1699121695",
    industry: "IT Services",
    description: "IBM is a global technology and consulting company, serving clients in more than 170 countries.",
    difficulty: 3,
    averageSalary: "₹5-11 LPA",
    interviewRounds: [
      "Aptitude Test",
      "Coding Test",
      "Technical Interview",
      "HR Interview"
    ],
    commonQuestions: [
      "What do you know about IBM?",
      "Explain OOPs concepts.",
      "Write a program to implement linked list.",
      "Describe a challenging situation and how you managed it.",
      "Are you willing to relocate?"
    ],
    techStack: [
      "Java", "C++", "Python", "Machine Learning", "DB2", "Cloud"
    ],
  },
  {
    id: "capgemini",
    name: "Capgemini",
    logo: "https://companieslogo.com/img/orig/CAP.PA-c3f9b07b.png?t=1710349203",
    industry: "IT Consulting",
    description: "Capgemini is a global leader in consulting, digital transformation, and engineering services.",
    difficulty: 2,
    averageSalary: "₹3.5-8 LPA",
    interviewRounds: [
      "Online Assessment",
      "Technical Interview",
      "HR Interview"
    ],
    commonQuestions: [
      "Why Capgemini?",
      "Explain Agile methodology.",
      "Describe a situation where you had to work as a team.",
      "Write a code to sort an array.",
      "What are your career goals?"
    ],
    techStack: [
      "Java", "Python", "SQL", "Data Science", "DevOps"
    ],
  },
  {
    id: "hcl",
    name: "HCL Technologies",
    logo: "https://companieslogo.com/img/orig/HCLTECH.NS-a012dde8.png?t=1699122183",
    industry: "IT Services",
    description: "HCL is a leading IT services company providing a broad range of technology solutions.",
    difficulty: 2,
    averageSalary: "₹3-6 LPA",
    interviewRounds: [
      "Aptitude Test",
      "Technical Interview",
      "HR Interview"
    ],
    commonQuestions: [
      "Why HCL?",
      "Explain your final year project.",
      "What is normalization in DBMS?",
      "How will you contribute to HCL?",
      "Explain exception handling in Java."
    ],
    techStack: [
      "Java", "Python", "C", "Testing", "SQL", "Networking"
    ],
  },
  {
    id: "cognizant",
    name: "Cognizant",
    logo: "https://companieslogo.com/img/orig/CTSH-9bed38d1.png?t=1699121604",
    industry: "IT Services",
    description: "Cognizant is an American multinational technology company that provides consulting and IT services.",
    difficulty: 2,
    averageSalary: "₹3-8 LPA",
    interviewRounds: [
      "Aptitude Test",
      "Technical Interview",
      "HR Interview"
    ],
    commonQuestions: [
      "Tell us about yourself.",
      "What technologies are you comfortable with?",
      "What is inheritance in OOP?",
      "How do you keep yourself updated with technology?",
      "Give an example of a technical challenge you solved."
    ],
    techStack: [
      "Java", "Python", "SQL", "Cloud", "SAP"
    ],
  }
];

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const filteredCompanies = mockCompanies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCompanyData = mockCompanies.find(c => c.id === selectedCompany);

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-blue-100 text-blue-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      case 4: return 'bg-orange-100 text-orange-800';
      case 5: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: number) => {
    const levels = ['', 'Easy', 'Moderate', 'Challenging', 'Hard', 'Very Hard'];
    return levels[difficulty] || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Preparation Hub</h1>
          <p className="text-gray-600">
            Get company-specific preparation materials and interview insights
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Companies List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Top Companies</CardTitle>
                <CardDescription>
                  Select a company to view preparation materials
                </CardDescription>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredCompanies.map((company) => (
                    <div
                      key={company.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedCompany === company.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedCompany(company.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <img 
                          src={company.logo}
                          alt={company.name}
                          className="w-10 h-10 object-contain"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{company.name}</h4>
                          <p className="text-sm text-gray-600">{company.industry}</p>
                        </div>
                        <Badge className={getDifficultyColor(company.difficulty)}>
                          {getDifficultyText(company.difficulty)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Details */}
          <div className="lg:col-span-2">
            {selectedCompanyData ? (
              <div className="space-y-6">
                {/* Company Overview */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={selectedCompanyData.logo}
                        alt={selectedCompanyData.name}
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <CardTitle className="text-2xl">{selectedCompanyData.name}</CardTitle>
                        <CardDescription className="text-lg">
                          {selectedCompanyData.industry}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{selectedCompanyData.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-600">Average Salary</p>
                          <p className="font-medium">{selectedCompanyData.averageSalary}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Difficulty Level</p>
                          <Badge className={getDifficultyColor(selectedCompanyData.difficulty)}>
                            {getDifficultyText(selectedCompanyData.difficulty)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-600">Industry</p>
                          <p className="font-medium">{selectedCompanyData.industry}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Tabs defaultValue="interview" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="interview">Interview Process</TabsTrigger>
                    <TabsTrigger value="questions">Common Questions</TabsTrigger>
                    <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                  </TabsList>
                  <TabsContent value="interview" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Interview Process</CardTitle>
                        <CardDescription>
                          Typical interview rounds at {selectedCompanyData.name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedCompanyData.interviewRounds.map((round, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{round}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="questions" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <CardDescription>
                          Common interview questions at {selectedCompanyData.name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedCompanyData.commonQuestions.map((question, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-start space-x-3">
                                <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                                <p className="font-medium">{question}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full mt-4">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Practice These Questions
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="tech" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Technical Stack</CardTitle>
                        <CardDescription>
                          Technologies commonly used at {selectedCompanyData.name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedCompanyData.techStack.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-sm">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">💡 Preparation Tip</h4>
                          <p className="text-blue-800 text-sm">
                            Focus on mastering the core technologies listed above. Build projects 
                            that demonstrate your proficiency in these areas.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a Company
                  </h3>
                  <p className="text-gray-600">
                    Choose a company from the list to view detailed preparation materials
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
