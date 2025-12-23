import { Link } from "react-router";

export const meta = () => ([
    { title: 'FitCheck.dev | review' },
    { name: 'description', content: 'Detailed analysis of you resume' },
])
export const Resume = () => {
    const Resume = () =>{}
    return (
       <main className="!pt-0">
        <nav className="resume-nav">
            <Link to="/" className="back-button">
           <div className="primary-button flex gap-1"> <img src="/icons/back.svg"/>
            <span className="font-semibold" >Back to Homepage</span>
            </div>
            </Link>
        </nav>

       </main>
    );
};

export default Resume;