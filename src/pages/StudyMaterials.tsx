import React from "react";
import { Link, useNavigate } from "react-router-dom";

const topicVideoLinks: Record<string, string> = {
  "Quantitative Aptitude": "https://www.youtube.com/playlist?list=PLpyc33gOcbVA4qXMoQ5vmhefTruk5t9lt",
  "Time & Work": "https://www.youtube.com/live/dShCSiEVBlI?si=OiKGdSSk6wJ9FKNY",
  "Profit & Loss": "https://youtu.be/vgZr0lRBEGg?si=QFMYzOeWfYayAoVP",
  "Speed, Time & Distance": "https://www.youtube.com/live/Jc0lY4Cr9Pg?si=poOHSpMIVNSjbWDX",
  "Ratio & Proportion": "https://www.youtube.com/live/f9GdqcRu3vc?si=atH9tcSlGKc6GHl6",
  "Probability & Permutation": "https://youtu.be/vntnULxgQHc?si=Ui7J9j_XVDg2gGmo",
  "Logical Reasoning": "https://www.youtube.com/live/n0LOpxYT0t8?si=y_ZCi0xlNPaurAtf",
  "Puzzles & Seating Arrangement": "https://www.youtube.com/results?search_query=rankers+gurukul+puzzles+seating+arrangement",
  "Blood Relation": "https://www.youtube.com/live/mBgtQzAYdZM?si=_GSpdI6vqbt_1V9S",
  "Syllogism": "https://youtu.be/Fep4O4mU05E?si=mRyIGdDtB5bH2ir0",
  "Direction Test": "https://www.youtube.com/live/iG9kJXJlDpA?si=KfB5fkHtcnoK-482",
  "Coding-Decoding": "https://youtu.be/G53EDjLlw3M?si=Ac6GTUL-9VdmCKci",
  "Verbal Ability": "https://www.youtube.com/results?search_query=rankers+gurukul++verbal+ability",
  "Synonyms & Antonyms": "https://www.youtube.com/live/l1vw0_pgII4?si=yyY-eo05Z8-zalGB",
  "Reading Comprehension": "https://youtu.be/4v9JUZU-GJ8?si=vdEB8b67zCgw_xix",
  "Sentence Correction": "https://www.youtube.com/live/_TGWvfSGUlM?si=egFSno3N0oaESrXX",
  "Para Jumbles": "https://www.youtube.com/live/kyt3lYeyCsg?si=C8ecDocwZ-7yrDpH",
  "Grammar Rules": "https://www.youtube.com/watch?v=SeM5EuZohRg",
  // Technical Skills
  "Programming Languages": "https://youtu.be/5QUSeBAMjoo?si=A8u-RV5L-JiemhkV",
  "C / C++ / Python / Java Notes": "https://www.youtube.com/@CodeWithHarry",
  "Basic Programs + Patterns": "https://www.youtube.com/@takeUforward",
  "Interview Coding Questions": "https://youtu.be/T0u5nwSA0w0?si=ddCxyoxJvqm9P995",
  "Web Development": "https://www.youtube.com/watch?v=tVzUXW6siu0&list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w",
  "HTML, CSS, JavaScript Notes": "https://www.youtube.com/watch?v=kUMe1FH4CHE",
  "Mini Projects (with Source Code)": "https://youtu.be/8ext9G7xspg?si=6hFhxWnYnqFZ0EDi",
  "Responsive Design Tips": "https://youtu.be/PuovsjZN11Y?si=jKAXQGcEMfQknOtZ",
  "Cybersecurity (for Cyber branch)": "https://www.youtube.com/watch?v=yywMI4pQbbc&list=PLwO5-rumi8A7RnPxB6Zx0wKFjFy75hCQs",
  "AIML": "https://youtu.be/9tbaiFIm0HU?si=8ILJ6FNJFMEft9SR",
  "Data science": "https://youtu.be/gDZ6czwuQ18?si=aoXwQn33v3hUU-MF",
  "IoT": "https://youtu.be/b7GC4Zr74M0?si=9ALRQmPOX2JIzBJy",
  // Core
  "DBMS": "https://www.youtube.com/watch?v=kBdlM6hNDAE&list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y",
  "Operating System": "https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p",
  "Computer Networks": "https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_",
  "OOPs Concepts": "https://youtu.be/i_5pvt7ag7E?si=9cEUrwZpkL-kDZpz",
  "DSA": "https://www.youtube.com/watch?v=0bHoB32fuj0&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz",
  // Soft Skills
  "Spoken English Practice": "https://www.youtube.com/live/OnSUWIyQqIc?si=bS67wR-EeqxgkhpG",
  "Email & Resume Writing": "https://www.youtube.com/results?search_query=emaila+and+resume+writing",
  "Presentation Skills": "https://youtu.be/ADJAcyTq1us?si=YqUC53BmH86RP0yT",
  "Confidence & Body Language Tips": "https://youtu.be/R2yw0GhdRA0?si=qjzd4pSotRvCzwA4",
  "Public Speaking": "https://www.youtube.com/watch?v=7oWa4tIr0vY&list=PLZsjpxNdkPe9703jiUliZrRB8cZMIXPyH",
  // Interview Preparation
  "HR Interview": "https://youtu.be/Ozmy1fGgp-g?si=wT1rWd1uoC8Ixp6G",
  "Common Questions + Sample Answers": "https://youtu.be/dHTgzj7owFc?si=kbWzqKg3Z5SWDS6M",
  "Tell Me About Yourself": "https://youtu.be/OLVUrgQ_BbA?si=P-_UVWWVwk0Ke941",
  "Strengths & Weaknesses Examples": "https://youtu.be/M5905oDA34c?si=4hcQ4RwCgN_PM_cu",
  "Technical Interview": "https://youtu.be/n9baKDP91ko?si=DpkC0kXSwv-vIz_G",
  "Subject-wise Q&A": "https://youtu.be/EH3yinampCA?si=N6xUcmo5ICsSQP7a",
  "Coding Questions": "https://youtu.be/WH_ieAsb4AI?si=XOJCSYhX6xCCR8KE",
  "Project-based Questions": "https://youtu.be/PG4t_6qjxz0?si=awHYw5kEu7PCo7No",
  "Mock Interview Practice": "https://youtu.be/srw4r3htm4U?si=ds92PgJ9haxBwOxs",
  "Self-recording Tips": "https://youtu.be/cl9-_xVQ800?si=oSvYnZxE2HIyV1bm",
  "Mock Interview Platforms": "https://youtu.be/LtDePgMsWFs?si=x90tAWjDryMFdK6s",
  // Group Discussion & Extempore
  "GD Rules & Etiquette": "https://youtu.be/8SyZWgzLQSo?si=bUhYS_WMPs1aFO8a",
  "Latest GD Topics (Tech + Social)": "https://youtu.be/_f9_6ZM-Qug?si=m8CRULcEUY2qjgPv",
  "How to Start / Conclude GD": "https://youtu.be/vCYMgOB3BR8?si=vtGqUrZtmia4NEqF",
  "Extempore Speaking Tips": "https://youtu.be/41ZBTgYSl0c?si=C_T_frShCL0kzIie",
  "Sample GD Videos": "https://youtu.be/gXId9M2w5LU?si=IwTylI51cHpHOlne",
  "Do’s & Don’ts Guides": "https://youtu.be/BfBJBG1fDWE?si=ngyFNqRGCSTYpTHM",
  // LinkedIn & Branding
  "Profile Optimization Guide": "https://www.youtube.com/watch?v=hNzpEeU3a4I",
  "How to Write “About” Section": "https://www.youtube.com/watch?v=KZt3L6P4IXw",
  "Connecting with HRs / Recruiters": "https://www.youtube.com/watch?v=hNzpEeU3a4I",
  "Post Ideas for Engagement": "https://www.youtube.com/watch?v=hNzpEeU3a4I",
  "Free Tools for Resume & LinkedIn Analysis": "https://www.youtube.com/watch?v=KZt3L6P4IXw",
  // Internship/Certification
  "Best Free Internship Portals (Internshala, AICTE, Forage)": "https://www.youtube.com/watch?v=rxMAuVv9BsM",
  "Email Writing to HR / Applying Tips": "https://www.youtube.com/watch?v=Vp7xv4YgSKc",
  "Free Certifications (Cybersecurity, Cloud, AI, Data Science)": "https://www.youtube.com/watch?v=vl0p4ahv8xE",
  "Virtual Job Simulations (Forage Links)": "https://www.youtube.com/watch?v=x8ZkzfEjGJY",
  "Project Ideas (Mini & Major)": "https://www.youtube.com/watch?v=LXb3EKWsInQ",
};

const studySections = [
  {
    id: 1,
    title: "Aptitude & Reasoning",
    subtopics: [
      { name: "Quantitative Aptitude" },
      { name: "Time & Work" },
      { name: "Profit & Loss" },
      { name: "Speed, Time & Distance" },
      { name: "Ratio & Proportion" },
      { name: "Probability & Permutation" },
      { name: "Logical Reasoning" },
      { name: "Puzzles & Seating Arrangement" },
      { name: "Blood Relation" },
      { name: "Syllogism" },
      { name: "Direction Test" },
      { name: "Coding-Decoding" },
      { name: "Verbal Ability" },
      { name: "Synonyms & Antonyms" },
      { name: "Reading Comprehension" },
      { name: "Sentence Correction" },
      { name: "Para Jumbles" },
      { name: "Grammar Rules" },
    ],
  },
  {
    id: 2,
    title: "Technical Skills (Core + Programming)",
    subtopics: [
      { name: "Programming Languages" },
      { name: "C / C++ / Python / Java Notes" },
      { name: "Basic Programs + Patterns" },
      { name: "Interview Coding Questions" },
      { name: "Web Development" },
      { name: "HTML, CSS, JavaScript Notes" },
      { name: "Mini Projects (with Source Code)" },
      { name: "Responsive Design Tips" },
      { name: "Cybersecurity (for Cyber branch)" },
      { name: "AIML" },
      { name: "Data science" },
      { name: "IoT" },
    ],
  },
  {
    id: 3,
    title: "Core Subjects (CS/IT Focused)",
    subtopics: [
      { name: "DBMS" },
      { name: "Operating System" },
      { name: "Computer Networks" },
      { name: "OOPs Concepts" },
      { name: "DSA" },
    ],
  },
  {
    id: 4,
    title: "Soft Skills & Communication",
    subtopics: [
      { name: "Spoken English Practice" },
      { name: "Email & Resume Writing" },
      { name: "Presentation Skills" },
      { name: "Confidence & Body Language Tips" },
      { name: "Public Speaking" },
    ],
  },
  {
    id: 5,
    title: "Resume & Portfolio Building",
    subtopics: [
      { name: "Resume Templates (ATS-friendly formats)", resource: "https://www.jobscan.co/resume-templates/ats-templates" },
      { name: "Portfolio Website Templates" },
      { name: "Resume checker", resource: "/resume-checker" },
      { name: "Common Resume Mistakes", resource: "https://novoresume.com/resume-templates" },
      { name: "Writing Achievements Effectively" },
      { name: "Using Canva / FlowCV / Overleaf", resource: "https://www.canva.com/p/wisscreative/collections/AYv3Dp1Oo-Ewpyjtj32DVw" },
    ],
  },
  {
    id: 6,
    title: "Interview Preparation",
    subtopics: [
      { name: "HR Interview" },
      { name: "Common Questions + Sample Answers" },
      { name: "Tell Me About Yourself" },
      { name: "Strengths & Weaknesses Examples" },
      { name: "Technical Interview" },
      { name: "Subject-wise Q&A" },
      { name: "Coding Questions" },
      { name: "Project-based Questions" },
      { name: "Mock Interview Practice" },
      { name: "Self-recording Tips" },
      { name: "Mock Interview Platforms" },
    ],
  },
  {
    id: 7,
    title: "Group Discussion (GD) & Extempore",
    subtopics: [
      { name: "GD Rules & Etiquette" },
      { name: "Latest GD Topics (Tech + Social)" },
      { name: "How to Start / Conclude GD" },
      { name: "Extempore Speaking Tips" },
      { name: "Sample GD Videos" },
      { name: "Do’s & Don’ts Guides" },
    ],
  },
  {
    id: 8,
    title: "LinkedIn & Personal Branding",
    subtopics: [
      { name: "Profile Optimization Guide" },
      { name: "How to Write “About” Section" },
      { name: "Connecting with HRs / Recruiters" },
      { name: "Post Ideas for Engagement" },
      { name: "Free Tools for Resume & LinkedIn Analysis" },
    ],
  },
  {
    id: 9,
    title: "Internship & Certification Guidance",
    subtopics: [
      { name: "Best Free Internship Portals (Internshala, AICTE, Forage)" },
      { name: "Email Writing to HR / Applying Tips" },
      { name: "Free Certifications (Cybersecurity, Cloud, AI, Data Science)" },
      { name: "Virtual Job Simulations (Forage Links)" },
      { name: "Project Ideas (Mini & Major)" },
    ],
  },
];

export default function StudyMaterials() {
  const navigate = useNavigate();

  const getLink = (topic) => topicVideoLinks[topic] || "https://youtube.com/results?search_query=" + encodeURIComponent(topic);

  // Creates a generated test and redirects to /tests (will appear in mockTests for session)
  const handleAssessmentStart = (topic) => {
    const generatedTest = {
      id: "custom-assess-" + topic,
      title: topic + " Quiz",
      description: `Auto-generated topic quiz for ${topic}.`,
      category: "Aptitude",
      duration: 10,
      totalQuestions: 1,
      difficulty: 2,
      questions: [
        {
          id: "custom-q1",
          question: `What is one key concept in "${topic}"?`,
          options: ["Concept A", "Concept B", "Concept C", "Concept D"],
          correctAnswer: 0,
          explanation: "Concept A is just a placeholder.",
          difficulty: 2
        }
      ]
    };
    let customTests = [];
    try {
      customTests = JSON.parse(localStorage.getItem("customTests") || "[]");
    } catch {}
    // Avoid duplicate on repeated clicks on same topic
    if (!customTests.some(t => t.id === generatedTest.id)) {
      customTests.push(generatedTest);
      localStorage.setItem("customTests", JSON.stringify(customTests));
    }
    // Optionally, flag which topic was taken for session (not required with above logic)
    navigate("/tests");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Study Material Hub</h1>
        <p className="text-lg text-gray-600 mb-2">
          Centralized space for topic-wise prep. Each card gives quick access to a top video and assessment
        </p>
      </div>
      {studySections.map(section => (
        <section key={section.id} className="max-w-5xl mx-auto mb-12 bg-white rounded-2xl shadow-lg py-8 px-5 md:px-10 transition hover:shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-500 mb-4">{section.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {section.subtopics.map((topic, idx) => {
              const videoLink = getLink(topic.name);
              return (
                <div key={idx} className="bg-gradient-to-tr from-blue-20 to-cyan-100 rounded-xl shadow-md p-4 border border-blue-100 hover:border-blue-400 transition flex flex-col items-start">
                  <span className="font-semibold text-gray-900 text-lg mb-2">{topic.name}</span>
                  <div className="flex gap-2 mb-2">
                    <a href={videoLink} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-sm rounded bg-blue-600 text-white font-medium hover:bg-blue-500 transition">Watch Video</a>
                    <button
                      onClick={() => handleAssessmentStart(topic.name)}
                      className="px-3 py-1 text-sm rounded bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
                    >
                      Assessment
                    </button>
                  </div>
                  {topic.resource && (
                    <a href={topic.resource} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-1 text-xs">Direct Resource</a>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <Link to="/resources">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-800 hover:to-indigo-800 transition text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg">
            Go To Resources Section
          </button>
        </Link>
      </div>
    </main>
  );
}
