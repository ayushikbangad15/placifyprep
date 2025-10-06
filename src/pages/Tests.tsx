import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Clock, 
  Trophy, 
  Target, 
  Play,
  AlertCircle,
  BarChart3,
  Users
} from 'lucide-react';
import { mockTests } from '@/lib/mockData';

function getCustomTestsFromStorage() {
  let customTests = [];
  try {
    customTests = JSON.parse(localStorage.getItem("customTests") || "[]");
  } catch {}
  return customTests;
}

const Tests = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  const categories = ['All Categories', 'Programming Languages', 'Technical Skills', 'Aptitude'];

  // Merge built-in mockTests and custom topic tests for this session
  const allTests = useMemo(() => {
    return [...mockTests, ...getCustomTestsFromStorage()];
  }, [testStarted, selectedTest]);

  const filteredTests = allTests.filter(test => 
    selectedCategory === 'All Categories' || test.category === selectedCategory
  );

  const currentTestData = allTests.find(t => t.id === selectedTest);

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
    const levels = ['', 'Beginner', 'Easy', 'Medium', 'Hard', 'Expert'];
    return levels[difficulty] || 'Unknown';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNextQuestion = () => {
    if (currentTestData && currentQuestion < currentTestData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    let correct = 0;
    currentTestData?.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    const score = Math.round((correct / (currentTestData?.questions.length || 1)) * 100);
    alert(`Test completed! Your score: ${score}% (${correct}/${currentTestData?.questions.length})`);

    setTestStarted(false);
    setSelectedTest(null);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(1800);
  };

  if (testStarted && currentTestData) {
    const currentQuestionData = currentTestData.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / currentTestData.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{currentTestData.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                  </div>
                  <Badge variant="secondary">
                    {currentQuestion + 1} of {currentTestData.questions.length}
                  </Badge>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Question {currentQuestion + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{currentQuestionData.question}</p>
              <div className="space-y-3">
                {currentQuestionData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestionData.id, index)}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      answers[currentQuestionData.id] === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <div className="space-x-2">
              {currentQuestion === currentTestData.questions.length - 1 ? (
                <Button onClick={handleSubmitTest} className="bg-green-600 hover:bg-green-700">
                  Submit Test
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tests & Assessments</h1>
          <p className="text-gray-600">
            Evaluate your skills and track your progress with comprehensive assessments
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Trophy className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-600">Tests Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Target className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-sm text-gray-600">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-600">Rank Position</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-gray-600">Total Participants</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Available Tests</CardTitle>
            <CardDescription>
              Choose from various categories to test your knowledge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {test.description}
                    </CardDescription>
                  </div>
                  <Badge className={getDifficultyColor(test.difficulty)}>
                    {getDifficultyText(test.difficulty)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{test.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-gray-500" />
                      <span>{test.totalQuestions} questions</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{test.category}</Badge>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setSelectedTest(test.id);
                      setTestStarted(true);
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tests;
