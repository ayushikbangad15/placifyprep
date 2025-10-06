import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Upload,
  FileText,
  Target,
  Download,
  Eye,
  Linkedin,
  TrendingUp,
  Award
} from 'lucide-react';

const API_BASE = "http://localhost:5000";

const ResumeChecker = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState('');
  const [role, setRole] = useState('');
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [missing, setMissing] = useState<string[]>([]);
  const [report, setReport] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Reset analysis state
      setAtsScore(null);
      setMatched([]);
      setMissing([]);
      setReport(null);
      setAnalysisComplete(false);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile || !role || !jobDesc) {
      alert("Upload resume and fill all fields.");
      return;
    }
    setAnalyzing(true);
    setAnalysisComplete(false);

    const formData = new FormData();
    formData.append("resume", uploadedFile);
    formData.append("role", role);
    formData.append("jobDesc", jobDesc);

    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setAtsScore(data.atsScore);
      setMatched(data.matched);
      setMissing(data.missing);
      setReport(data.report);
      setAnalysisComplete(true);
    } catch (err) {
      alert("Analysis failed. Make sure Flask server is running and accessible.");
      setAnalysisComplete(false);
    }
    setAnalyzing(false);
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume & Profile Checker</h1>
          <p className="text-gray-600">
            Get your resume ATS-ready and optimize your LinkedIn profile for better visibility
          </p>
        </div>
        <Tabs defaultValue="resume" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="resume">Resume Analysis</TabsTrigger>
            <TabsTrigger value="linkedin">LinkedIn Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="resume" className="space-y-8">
            {!analysisComplete && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Upload Your Resume</span>
                  </CardTitle>
                  <CardDescription>
                    Upload your resume, specify your target role and job description for better feedback!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={e => e.preventDefault()}>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors mb-6">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Drop your resume here or click to browse
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Supports PDF files up to 10MB
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload">
                        <Button type="button" className="cursor-pointer">
                          {uploadedFile ? uploadedFile.name : "Choose File"}
                        </Button>
                      </label>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="font-medium text-gray-700">Target Role</label>
                        <input
                          value={role}
                          onChange={e => setRole(e.target.value)}
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-gray-900 focus:ring-2 focus:ring-blue-300"
                          placeholder="e.g. Frontend Developer"
                        />
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Job Description</label>
                        <textarea
                          value={jobDesc}
                          onChange={e => setJobDesc(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-gray-900 focus:ring-2 focus:ring-blue-300"
                          placeholder="Paste the relevant job description here..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAnalyze}
                      disabled={analyzing || !uploadedFile}
                      className="w-full"
                    >
                      {analyzing ? "Analyzing..." : "Analyze Resume"}
                    </Button>
                  </form>
                  {analyzing && (
                    <div className="text-center space-y-4 mt-6">
                      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <h3 className="text-lg font-medium">Analyzing your resume...</h3>
                      <p className="text-gray-600">This may take a few moments</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            {analysisComplete && atsScore !== null && (
              <div className="space-y-6">
                {(role || jobDesc) && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="mb-4">
                        {role &&
                          <div className="mb-2 font-bold text-gray-800">Target Role: <span className="font-normal">{role}</span></div>
                        }
                        {jobDesc &&
                          <div>
                            <div className="font-bold text-gray-800">Job Description:</div>
                            <div className="whitespace-pre-line text-gray-700 mt-1">{jobDesc}</div>
                          </div>
                        }
                      </div>
                    </CardContent>
                  </Card>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${getScoreBackground(atsScore)} flex items-center justify-center mx-auto mb-4`}>
                          <span className="text-2xl font-bold text-white">{atsScore}</span>
                        </div>
                        <h3 className="font-medium">ATS Score</h3>
                        <p className="text-sm text-gray-600">Out of 100</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-medium">File Uploaded</h3>
                        <p className="text-sm text-gray-600 truncate">{uploadedFile && uploadedFile.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-4">
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-medium">Download Report</h3>
                        <a href={`${API_BASE}/download/${report}`} target="_blank" rel="noopener noreferrer">
                          <Button className="mt-3" >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {/* Matched and Missing Keywords */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Matched Keywords</span>
                    </CardTitle>
                    <CardDescription>
                      These keywords from the job description are present in your resume.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {matched.map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="text-green-600 border-green-200">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Missing Keywords</span>
                    </CardTitle>
                    <CardDescription>
                      Add these keywords to improve your ATS score
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {missing.map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="text-red-600 border-red-200">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {/* Actions */}
                <div className="flex space-x-4">
                  <Button onClick={() => window.open(`${API_BASE}/download/${report}`, "_blank")}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" onClick={() => setAnalysisComplete(false)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Analyze New Resume
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          {/* ---- Linkedin Profile Tab stays same ---- */}
          <TabsContent value="linkedin" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn Profile Analysis</span>
                </CardTitle>
                <CardDescription>
                  Connect your LinkedIn profile for optimization suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertTitle>Demo Mode</AlertTitle>
                  <AlertDescription>
                    This is a demonstration of LinkedIn profile analysis features.
                  </AlertDescription>
                </Alert>
                {/* ...keep this section as in your existing design... */}
                <Button className="w-full">
                  <Linkedin className="w-4 h-4 mr-2" />
                  Connect LinkedIn Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeChecker;
