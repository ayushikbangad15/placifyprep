import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  CheckCircle, 
  Circle, 
  BookOpen,
  Users,
  Code,
  Briefcase,
  ExternalLink,
  Star,
  Globe
} from 'lucide-react';
import { mockStudyPlans as allStudyPlans } from '@/lib/mockData';
import { useAuthStore } from '@/lib/store';

// Define outside so it is not re-created every render
const yearIcons = {
  '1': Code,
  '2': BookOpen,
  '3': Users,
  '4': Briefcase
};

const yearColors = {
  '1': 'from-green-500 to-emerald-500',
  '2': 'from-blue-500 to-cyan-500',
  '3': 'from-purple-500 to-pink-500',
  '4': 'from-orange-500 to-red-500'
};

// Recommended Sources Data
const recommendedSources = [
  {
    id: 1,
    title: 'LeetCode',
    description: 'Practice coding problems and prepare for technical interviews with 2000+ problems',
    url: 'https://leetcode.com',
    category: 'Coding Practice',
    rating: 4.8,
    type: 'Platform',
    icon: '💻'
  },
  {
    id: 2,
    title: 'GeeksforGeeks',
    description: 'Comprehensive computer science tutorials, algorithms, and interview preparation',
    url: 'https://geeksforgeeks.org',
    category: 'Learning Platform',
    rating: 4.6,
    type: 'Website',
    icon: '📚'
  },
  {
    id: 3,
    title: 'Coursera',
    description: 'Online courses from top universities: Stanford, MIT, Google, IBM',
    url: 'https://coursera.org',
    category: 'Online Courses',
    rating: 4.7,
    type: 'Platform',
    icon: '🎓'
  },
  {
    id: 4,
    title: 'HackerRank',
    description: 'Coding challenges, skill assessments, and company-specific preparation',
    url: 'https://hackerrank.com',
    category: 'Coding Practice',
    rating: 4.5,
    type: 'Platform',
    icon: '🏆'
  },
  {
    id: 5,
    title: 'Udemy Tech Courses',
    description: 'Practical programming courses: React, Python, Java, System Design',
    url: 'https://udemy.com',
    category: 'Video Courses',
    rating: 4.4,
    type: 'Platform',
    icon: '📖'
  },
  {
    id: 6,
    title: 'YouTube - CS Dojo',
    description: 'Free programming tutorials and career advice from industry experts',
    url: 'https://youtube.com/c/CSDojo',
    category: 'Video Tutorials',
    rating: 4.6,
    type: 'Channel',
    icon: '📺'
  }
];

// Browsing Materials Data
const browsingMaterials = [
  {
    id: 1,
    title: 'Cracking the Coding Interview',
    author: 'Gayle Laakmann McDowell',
    description: 'Essential book for technical interview preparation with 189+ programming questions',
    category: 'Books',
    rating: 4.9,
    type: 'Book',
    icon: '📕',
    price: '$35',
    url: 'https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850'
  },
  {
    id: 2,
    title: 'System Design Primer',
    author: 'Donne Martin (GitHub)',
    description: 'Learn how to design large-scale systems. Prep for system design interviews',
    category: 'GitHub Resources',
    rating: 4.8,
    type: 'Repository',
    icon: '🔧',
    price: 'Free',
    url: 'https://github.com/donnemartin/system-design-primer'
  },
  {
    id: 3,
    title: 'Blind 75 LeetCode Questions',
    author: 'Community Curated',
    description: 'Most important 75 coding problems for technical interview preparation',
    category: 'Problem Sets',
    rating: 4.7,
    type: 'Problem List',
    icon: '🎯',
    price: 'Free',
    url: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions'
  },
  {
    id: 4,
    title: 'Tech Interview Handbook',
    author: 'Yangshun Tay',
    description: 'Comprehensive guide covering algorithms, system design, and behavioral questions',
    category: 'Guides',
    rating: 4.6,
    type: 'Handbook',
    icon: '📋',
    price: 'Free',
    url: 'https://techinterviewhandbook.org/'
  },
  {
    id: 5,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    description: 'A handbook of agile software craftsmanship and best coding practices',
    category: 'Books',
    rating: 4.8,
    type: 'Book',
    icon: '📗',
    price: '$42',
    url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350884'
  },
  {
    id: 6,
    title: 'Algorithms Specialization',
    author: 'Stanford University',
    description: 'Comprehensive algorithms course covering divide-and-conquer, graph algorithms',
    category: 'Online Courses',
    rating: 4.9,
    type: 'Course',
    icon: '🧮',
    price: '$49/month',
    url: 'https://www.coursera.org/specializations/algorithms'
  },
  {
    id: 7,
    title: 'InterviewBit',
    author: 'Scaler Academy',
    description: 'Structured programming interview preparation with topic-wise practice',
    category: 'Practice Platforms',
    rating: 4.5,
    type: 'Platform',
    icon: '💡',
    price: 'Free',
    url: 'https://www.interviewbit.com/'
  },
  {
    id: 8,
    title: 'Pramp - Mock Interviews',
    author: 'Pramp',
    description: 'Practice coding interviews with peers and get real-time feedback',
    category: 'Mock Interviews',
    rating: 4.4,
    type: 'Platform',
    icon: '🎤',
    price: 'Free',
    url: 'https://www.pramp.com/'
  }
];

const StudyPlans = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedYear, setSelectedYear] = useState(user?.year?.toString() || '1');
  // Deep clone for local editing
  const [studyPlans, setStudyPlans] = useState(() =>
    JSON.parse(JSON.stringify(allStudyPlans))
  );

  const currentPlan = studyPlans[selectedYear];
  const milestones = currentPlan.milestones;
  const completedMilestones = milestones.filter(m => m.completed).length;
  const totalMilestones = milestones.length;
  const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100);

  const handleTakeTest = () => {
    navigate('/tests');
  };

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Toggle milestone complete/incomplete
  const toggleMilestone = (idx: number) => {
    setStudyPlans(plans => {
      const newPlans = { ...plans };
      newPlans[selectedYear] = {
        ...newPlans[selectedYear],
        milestones: newPlans[selectedYear].milestones.map((m: any, i: number) =>
          i === idx ? { ...m, completed: !m.completed } : m
        )
      };
      return newPlans;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Year-wise Study Plans</h1>
          <p className="text-gray-600">
            Personalized roadmaps tailored to your academic year and career goals
          </p>
        </div>

        {/* Year Selection */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(studyPlans).map(([year, plan]) => {
            const Icon = yearIcons[year as keyof typeof yearIcons];
            const isSelected = selectedYear === year;
            const completed = plan.milestones.filter((m: any) => m.completed).length;
            const total = plan.milestones.length;
            const percentage = Math.round((completed / total) * 100);

            return (
              <Card 
                key={year}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => setSelectedYear(year)}
              >
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${yearColors[year as keyof typeof yearColors]} flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-medium mb-1">Year {year}</h3>
                    <p className="text-sm text-gray-600 mb-3">{completed}/{total} completed</p>
                    <Progress value={percentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Current Plan Details */}
        <div className="space-y-6">
          {/* Plan Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${yearColors[selectedYear as keyof typeof yearColors]} flex items-center justify-center`}>
                      <span className="text-white font-bold">{selectedYear}</span>
                    </div>
                    <span>{currentPlan.title}</span>
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    {currentPlan.description}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{progressPercentage}%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{completedMilestones} of {totalMilestones} milestones completed</span>
                <span>{totalMilestones - completedMilestones} remaining</span>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Learning Milestones</span>
              </CardTitle>
              <CardDescription>
                Track your progress through key learning objectives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {milestones.map((milestone: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className="flex-shrink-0 mt-1 cursor-pointer"
                      onClick={() => toggleMilestone(index)}
                      style={{ minWidth: 24 }}
                      title="Mark as complete/incomplete"
                    >
                      {milestone.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-medium ${milestone.completed ? 'text-green-700' : 'text-gray-900'}`}>
                          {milestone.title}
                        </h4>
                        {milestone.completed && (
                          <Badge className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {milestone.description}
                      </p>
                      {!milestone.completed && (
                        <Button size="sm" variant="outline" onClick={() => toggleMilestone(index)}>
                          Start Working
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources Tabs */}
          <Tabs defaultValue="recommended" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recommended">Recommended Sources</TabsTrigger>
              <TabsTrigger value="browsing">Browsing Materials</TabsTrigger>
            </TabsList>

            {/* Recommended Sources Tab */}
            <TabsContent value="recommended" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Recommended Learning Platforms</span>
                  </CardTitle>
                  <CardDescription>
                    Curated platforms and resources for your placement preparation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendedSources.map((source) => (
                      <div key={source.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{source.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-lg">{source.title}</h4>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{source.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{source.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {source.category}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {source.type}
                                </Badge>
                              </div>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                onClick={() => handleOpenLink(source.url)}
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Visit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Browsing Materials Tab */}
            <TabsContent value="browsing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Essential Reading & Study Materials</span>
                  </CardTitle>
                  <CardDescription>
                    Books, guides, and resources to enhance your preparation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {browsingMaterials.map((material) => (
                      <div key={material.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{material.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-lg">{material.title}</h4>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{material.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mb-1">by {material.author}</p>
                            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{material.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {material.category}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {material.price}
                                </Badge>
                              </div>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                onClick={() => handleOpenLink(material.url)}
                              >
                                <Globe className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Take immediate action to boost your preparation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">🎯 Take Practice Test</h4>
                  <p className="text-blue-800 text-sm mb-3">
                    Evaluate your current skill level with comprehensive assessments
                  </p>
                  <Button size="sm" onClick={handleTakeTest} className="bg-blue-600 hover:bg-blue-700">
                    Take Test
                  </Button>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">📚 Study Materials</h4>
                  <p className="text-green-800 text-sm mb-3">
                    Access curated study materials relevant to your current year
                  </p>
                  <Button size="sm" variant="outline" onClick={() => navigate('/study-materials')}>
                    Browse Materials
                  </Button>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">🏢 Company Prep</h4>
                  <p className="text-purple-800 text-sm mb-3">
                    Prepare for specific companies with targeted resources
                  </p>
                  <Button size="sm" variant="outline" onClick={() => navigate('/companies')}>
                    View Companies
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudyPlans;
