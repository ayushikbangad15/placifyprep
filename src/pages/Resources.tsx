import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ExternalLink, 
  Search, 
  Bookmark, 
  BookmarkCheck,
  Star,
  Globe,
  Youtube,
  BookOpen,
  Code,
  GraduationCap
} from 'lucide-react';
import { mockResources } from '@/lib/mockData';
import { useAppStore } from '@/lib/store';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const { bookmarkedMaterials, toggleBookmark } = useAppStore();

  const categories = [
    'All Categories',
    'Coding Practice',
    'Learning Platform',
    'Online Courses',
    'Interview Prep',
    'Career Guidance',
    'Certification'
  ];

  const additionalResources = [
    {
      id: '4',
      title: 'HackerRank',
      description: 'Practice coding skills and prepare for technical interviews',
      url: 'https://hackerrank.com',
      category: 'Coding Practice',
      rating: 4.5,
      isBookmarked: false
    },
    {
      id: '5',
      title: 'InterviewBit',
      description: 'Structured programming interview preparation',
      url: 'https://interviewbit.com',
      category: 'Interview Prep',
      rating: 4.4,
      isBookmarked: true
    },
    {
      id: '6',
      title: 'Udemy',
      description: 'Online learning platform with thousands of courses',
      url: 'https://udemy.com',
      category: 'Online Courses',
      rating: 4.3,
      isBookmarked: false
    },
    {
      id: '7',
      title: 'LinkedIn Learning',
      description: 'Professional development courses and career guidance',
      url: 'https://linkedin.com/learning',
      category: 'Career Guidance',
      rating: 4.6,
      isBookmarked: true
    },
    {
      id: '8',
      title: 'AWS Certification',
      description: 'Cloud computing certifications and training materials',
      url: 'https://aws.amazon.com/certification',
      category: 'Certification',
      rating: 4.8,
      isBookmarked: false
    },
    {
      id: '9',
      title: 'freeCodeCamp',
      description: 'Free coding bootcamp with comprehensive curriculum',
      url: 'https://freecodecamp.org',
      category: 'Learning Platform',
      rating: 4.9,
      isBookmarked: true
    }
  ];

  const allResources = [...mockResources, ...additionalResources];

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Coding Practice': return Code;
      case 'Learning Platform': return BookOpen;
      case 'Online Courses': return GraduationCap;
      case 'Interview Prep': return Star;
      case 'Career Guidance': return Globe;
      case 'Certification': return Badge;
      default: return ExternalLink;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Coding Practice': return 'from-blue-500 to-cyan-500';
      case 'Learning Platform': return 'from-green-500 to-emerald-500';
      case 'Online Courses': return 'from-purple-500 to-pink-500';
      case 'Interview Prep': return 'from-orange-500 to-red-500';
      case 'Career Guidance': return 'from-indigo-500 to-blue-500';
      case 'Certification': return 'from-teal-500 to-green-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">External Resources</h1>
          <p className="text-gray-600">
            Curated collection of the best external platforms and tools for placement preparation
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold">{allResources.length}</p>
                <p className="text-sm text-gray-600">Total Resources</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookmarkCheck className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold">{allResources.filter(r => r.isBookmarked).length}</p>
                <p className="text-sm text-gray-600">Bookmarked</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold">4.6</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
                <p className="text-sm text-gray-600">Categories</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Find Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredResources.length} of {allResources.length} resources
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const CategoryIcon = getCategoryIcon(resource.category);
            const isBookmarked = resource.isBookmarked;
            
            return (
              <Card key={resource.id} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getCategoryColor(resource.category)} flex items-center justify-center`}>
                        <CategoryIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {resource.title}
                        </CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {resource.category}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleBookmark(resource.id)}
                      className="w-8 h-8 p-0"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-2">
                    {resource.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{resource.rating}</span>
                    </div>
                    <Badge variant="secondary">
                      Free Access
                    </Badge>
                  </div>
                  
                  <Button 
                    className="w-full group-hover:bg-blue-600 transition-colors"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Resource
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <ExternalLink className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;