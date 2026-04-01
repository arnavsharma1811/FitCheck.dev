import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
        <Link 
            to={`/resume/${id}`} 
            className="resume-card animate-in fade-in duration-1000 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
        >
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {companyName && <h2 className="!text-black font-bold break-words capitalize">{companyName}</h2>}
                    {jobTitle && <h3 className="text-lg break-words text-gray-500 capitalize">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            {resumeUrl && (
                <div className="gradient-border animate-in fade-in duration-1000">
                    <div className="w-full overflow-hidden rounded-xl">
                        <img
                            src={resumeUrl}
                            alt="resume"
                            className="w-full h-[200px] max-sm:h-[140px] object-cover object-top"
                        />
                    </div>
                </div>
            )}
        </Link>
    )
}
export default ResumeCard