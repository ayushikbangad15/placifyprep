import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Award, 
  Calendar,
  Clock,
  Star,
  ArrowRight,
  Trophy,
  Flame,
  CheckCircle,
  PlayCircle,
  Users
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { mockProgress } from '@/lib/mockData';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Redirect to home if not authenticated
  if (!isAuthenticated || !user) {
    navigate('/');
    return null;
  }

  const handleNavigation = (path: string, title: string) => {
    try {
      toast.success(`Opening ${title}...`);
      navigate(path);
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error('Navigation failed. Please try again.');
    }
  };

  const progressCards = [
    {
      title: 'Study Materials',
      completed: mockProgress.completedMaterials,
      total: mockProgress.totalMaterials,
      percentage: Math.round((mockProgress.completedMaterials / mockProgress.totalMaterials) * 100),
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      path: '/study-materials'
    },
    {
      title: 'Tests Completed',
      completed: mockProgress.testsCompleted,
      total: 15,
      percentage: Math.round((mockProgress.testsCompleted / 15) * 100),
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      path: '/tests'
    },
    {
      title: 'Average Score',
      completed: mockProgress.averageScore,
      total: 100,
      percentage: mockProgress.averageScore,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      path: '/tests'
    },
    {
      title: 'Badges Earned',
      completed: mockProgress.badgesEarned,
      total: 12,
      percentage: Math.round((mockProgress.badgesEarned / 12) * 100),
      icon: Award,
      color: 'from-orange-500 to-red-500',
      path: '/dashboard'
    }
  ];

  const recentActivities = [
    { title: 'Completed JavaScript Quiz', time: '2 hours ago', type: 'test', icon: CheckCircle, color: 'text-green-500' },
    { title: 'Studied System Design Basics', time: '1 day ago', type: 'study', icon: BookOpen, color: 'text-blue-500' },
    { title: 'Updated Resume', time: '2 days ago', type: 'profile', icon: Target, color: 'text-purple-500' },
    { title: 'Mock Interview - Google', time: '3 days ago', type: 'interview', icon: PlayCircle, color: 'text-orange-500' }
  ];

  const recommendations = [
    { 
      title: 'Complete Data Structures Module', 
      description: 'Continue your DSA journey with advanced topics', 
      link: '/study-materials',
      icon: BookOpen,
      progress: 65,
      estimatedTime: '2 hours'
    },
    { 
      title: 'Take Aptitude Test', 
      description: 'Improve your quantitative skills with practice tests', 
      link: '/tests',
      icon: Target,
      progress: 0,
      estimatedTime: '45 minutes'
    },
    { 
      title: 'Update LinkedIn Profile', 
      description: 'Optimize your profile for better recruiter visibility', 
      link: '/resume-checker',
      icon: Users,
      progress: 30,
      estimatedTime: '30 minutes'
    }
  ];

  const upcomingDeadlines = [
    { title: 'Google Application Deadline', date: '2024-01-15', daysLeft: 5 },
    { title: 'Microsoft Coding Test', date: '2024-01-20', daysLeft: 10 },
    { title: 'Amazon Interview Prep', date: '2024-01-25', daysLeft: 15 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
              </h1>
              <p className="text-gray-600">
                {user?.year && `Year ${user.year} • ${user.branch}`}
              </p>
              <p className="text-sm text-gray-500">{user?.college}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>{mockProgress.studyStreak} day streak</span>
            </Badge>
            <Badge variant="outline">
              Weekly Goal: {mockProgress.weeklyCompleted}/{mockProgress.weeklyGoal}
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Overall Progress: {mockProgress.overallProgress}%
            </Badge>
          </div>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {progressCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => handleNavigation(card.path, card.title)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </CardTitle>
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {card.completed}{card.title === 'Average Score' ? '%' : `/${card.total}`}
                  </div>
                  <Progress value={card.percentage} className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {card.percentage}% complete
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recommendations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Recommended for You</span>
                </CardTitle>
                <CardDescription>
                  Personalized suggestions based on your progress and goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec, index) => {
                  const Icon = rec.icon;
                  return (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                            <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                              {rec.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>⏱️ {rec.estimatedTime}</span>
                              {rec.progress > 0 && (
                                <span className="flex items-center space-x-1">
                                  <span>📊 {rec.progress}% complete</span>
                                </span>
                              )}
                            </div>
                            {rec.progress > 0 && (
                              <Progress value={rec.progress} className="mt-2 h-1" />
                            )}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group-hover:scale-105 transition-transform"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigation(rec.link, rec.title);
                          }}
                        >
                          {rec.progress > 0 ? 'Continue' : 'Start'}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Deadlines</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div>
                      <h4 className="font-medium text-gray-900">{deadline.title}</h4>
                      <p className="text-sm text-gray-600">{deadline.date}</p>
                    </div>
                    <Badge variant={deadline.daysLeft <= 7 ? 'destructive' : 'secondary'}>
                      {deadline.daysLeft} days left
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start hover:bg-blue-50 hover:text-blue-700 transition-colors" 
                  variant="outline"
                  onClick={() => handleNavigation('/tests', 'Tests')}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Take a Test
                </Button>
                <Button 
                  className="w-full justify-start hover:bg-green-50 hover:text-green-700 transition-colors" 
                  variant="outline"
                  onClick={() => handleNavigation('/study-materials', 'Study Materials')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Materials
                </Button>
                <Button 
                  className="w-full justify-start hover:bg-purple-50 hover:text-purple-700 transition-colors" 
                  variant="outline"
                  onClick={() => handleNavigation('/companies', 'Companies')}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Company Prep
                </Button>
                <Button 
                  className="w-full justify-start hover:bg-orange-50 hover:text-orange-700 transition-colors" 
                  variant="outline"
                  onClick={() => handleNavigation('/resume-checker', 'Resume Checker')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Resume Check
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;