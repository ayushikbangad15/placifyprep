import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import StudyMaterials from './pages/StudyMaterials';
import ResumeChecker from './pages/ResumeChecker';
import Companies from './pages/Companies';
import StudyPlans from './pages/StudyPlans';
import Tests from './pages/Tests';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import ChatBotPage from "./pages/chatBotPage.tsx";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header />
          <Routes>
  <Route path="/" element={<Index />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/studymaterials" element={<StudyMaterials />} />
  <Route path="/study-materials" element={<StudyMaterials />} />
  <Route path="/resume-checker" element={<ResumeChecker />} />
  <Route path="/companies" element={<Companies />} />
  <Route path="/study-plans" element={<StudyPlans />} />
  <Route path="/tests" element={<Tests />} />
  <Route path="/resources" element={<Resources />} />
  <Route path="/chatbot" element={<ChatBotPage />} />
  <Route path="*" element={<NotFound />} />


          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;