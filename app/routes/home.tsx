import { resumes } from "~/constants";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "FitCheck.dev" },
    { name: "description", content: "Feedback for your dream job" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <section className="main-section">
      <div className="page-heading">
        <h1>Track Your Applications & Resume Ratings</h1>
        <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>
    
    {resumes.length > 0 && (
      <div className="resume-section">
      {resumes.map((resume) => (
  <ResumeCard key={resume.id} resume={resume} />
))}

    </div>
    )}
    </section>
  </main>;
}
