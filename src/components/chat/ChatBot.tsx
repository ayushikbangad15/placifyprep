import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User } from 'lucide-react';
import { Link } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  redirect?: { label: string; path: string } | null;
}

const quickQuestions = [
  'What is DSA?',
  'Best way to build resume?',
  'Interview tips',
  'Show me company prep guides',
  'How to use Placify resume checker?',
];

function getGeneralBotResponse(userInput: string): { answer: string; redirect: null | { label: string; path: string } } {
  const text = userInput.toLowerCase();

  // DSA EXPLANATION
  if (text.includes("dsa") || text.includes("data structure") || text.includes("algorithm")) {
    return {
      answer:
        "DSA stands for Data Structures and Algorithms. They're the foundation for most technical interviews. Placify's <b>Study Material Hub</b> covers DSA topics in depth.",
      redirect: { label: "Study Material Hub", path: "/studymaterials" }
    };
  }
  // RESUME/BIO/CV FIELD
  if (text.includes("resume") || text.includes("cv")) {
    return {
      answer:
        "A great resume should be clear, concise, and quantify your achievements. Want to scan your resume for suggestions and ATS formatting tips?",
      redirect: { label: "ATS Resume Checker", path: "/resume-checker" }
    };
  }
  // INTERVIEW PREP FIELD
  if (text.includes("interview") || text.includes("hr round") || text.includes("mock test")) {
    return {
      answer:
        "For interviews, focus on common DSA problems, company-specific questions, and communicate clearly. Placify's <b>Company Wise Preparation</b> section provides detailed prep guides.",
      redirect: { label: "Company Wise Preparation", path: "/companies" }
    };
  }
  // COMPANY PREPARATION
  if (text.includes("company") || text.match(/amazon|google|microsoft|infosys|tcs/)) {
    return {
      answer:
        "For specific company prep, you need to know the process, common questions, and tech focus of each organization. Placify's <b>Company Wise Preparation</b> has detailed breakdowns.",
      redirect: { label: "Company Wise Preparation", path: "/companies" }
    };
  }
  // GENERAL GREETING or HELP
  if (text.includes("hello") || text.includes("hi") || text.includes("help")) {
    return {
      answer:
        "Hello! I can answer study/career questions, explain topics, and redirect you to the right Placify resources. Try typing: 'What is DSA?' or 'Show resume tips'",
      redirect: null
    };
  }
  // TESTS & ASSESSMENTS
  if (text.includes("test") || text.includes("assessment") || text.includes("quiz")) {
    return {
      answer:
        "Practice makes perfect! Take coding tests and assessments in the Tests & Assessments section to measure your progress.",
      redirect: { label: "Tests & Assessments", path: "/tests" }
    };
  }
  // EXPLAIN TOPIC (Generic intent)
  if (text.startsWith("what is ") || text.startsWith("explain ")) {
    // very naive, just show this answer
    const topic = userInput.replace(/^what is |explain /i, '');
    return {
      answer: `Here is a short explanation for <b>${topic}</b>:
      
This is a key concept for placements! If you want detailed study material for this, visit our Study Material Hub.`,
      redirect: { label: "Study Material Hub", path: "/studymaterials" }
    };
  }
  // FALLBACK / Default
  return {
    answer: "I'm here to help with study, resume, interview or company prep questions. Please ask me something related to placement preparation, or request a topic explanation.",
    redirect: null
  };
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Placify Bot. Ask me about placements, interviews, resume building, or say 'explain [topic]' to learn more!",
      sender: 'bot',
      timestamp: new Date(),
      redirect: null,
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const curTime = new Date();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: curTime,
      redirect: null
    };

    const botRes = getGeneralBotResponse(inputMessage);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botRes.answer,
      sender: 'bot',
      timestamp: new Date(),
      redirect: botRes.redirect
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputMessage('');
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(handleSendMessage, 0);
  };

  return (
    <Card className="shadow-2xl w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <CardTitle>Placify ChatBot</CardTitle>
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-xs text-gray-600 inline-block">Online</span>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-[550px]">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white text-right'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && <Bot className="w-5 h-5 mt-0.5" />}
                    {message.sender === 'user' && <User className="w-5 h-5 mt-0.5" />}
                    <span className="text-sm whitespace-pre-line" dangerouslySetInnerHTML={{ __html: message.text }} />
                  </div>
                  {/* Prompt user to go to the related Placify section if needed */}
                  {message.redirect && (
                    <div className="mt-2 flex">
                      <Link
                        to={message.redirect.path}
                        className="bg-gradient-to-r from-teal-500 to-green-500 text-white rounded px-3 py-1 text-xs ml-auto"
                      >
                        Go to {message.redirect.label}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        {/* Show quick questions when chat opens */}
        {messages.length === 1 && (
          <div className="p-6 border-t">
            <p className="text-xs text-gray-600 mb-2">Try these questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-50 text-xs"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <div className="p-6 border-t">
          <div className="flex space-x-3">
            <Input
              placeholder="Type your question or 'explain OOPS'..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button size="sm" onClick={handleSendMessage}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;
