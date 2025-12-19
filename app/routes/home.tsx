import { resumes } from "~/constants";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import Navbar from "~/components/Navbar";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "FitCheck.dev" },
    { name: "description", content: "Feedback for your dream job" },
  ];
}

export default function Home() {
   const { auth } = usePuterStore();
    
    
    const navigate = useNavigate();

    useEffect(() => {
      if(!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
    
    <section className="main-section">
      <div className="page-heading">
        <h1>Track Your Applications & Resume Ratings</h1>
        <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>
    
    {resumes.length > 0 && (
      <div className="resumes-section">
      {resumes.map((resume) => (
  <ResumeCard key={resume.id} resume={resume} />
))}

    </div>
    )}
    </section>
  </main>;
}
