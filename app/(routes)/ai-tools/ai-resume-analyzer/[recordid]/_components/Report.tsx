import ResumeUploadDialog from "@/app/(routes)/dashboard/_components/ResumeUploadDialog";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";

const Report = ({ aiReport }: any) => {
  const [openResumeUpload, setOpenResumeUpload] = useState(false);
  return (
    <div>
      <div className="flex justify-between  items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AI Analysis Results
        </h2>

        <Button
          onClick={() => setOpenResumeUpload(true)}
          type="button" className="p-3"
          //   className="text-white hover:bg-gray-200 hover:text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 gradient-button-bg  shadow-lg"
        >
          Re-analyze <i className="fa-solid fa-sync ml-2"></i>
          <Sparkles />
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-blue-200 transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
          <i className="fas fa-star text-yellow-500 mr-2"></i> Overall Score
        </h3>
        <div className="flex  items-center justify-between mb-4">
          <span className="text-6xl font-extrabold text-blue-600">
            {aiReport?.overall_score}
            <span className="text-2xl">/100</span>
          </span>
          <div className="flex items-center">
            <i className="fas fa-arrow-up text-green-500 text-lg mr-2"></i>
            <span className="text-green-500 text-lg font-bold">
              {aiReport?.overall_feedback}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: "85%" }}
          ></div>
        </div>
        <p className="text-gray-600 text-sm">
          {aiReport?.summary_comment || "No additional comments available."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-5 border border-green-200 relative overflow-hidden group">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            <i className="fas fa-user-circle text-gray-500 mr-2"></i> Contact
            Info
          </h4>
          <span className="text-4xl font-bold highlight-text">
            {aiReport?.section_scores?.contact_info?.score}%
          </span>
          <p className="text-sm text-gray-600 mt-2">
            {aiReport?.section_scores?.contact_info?.comment}
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 border border-green-200 relative overflow-hidden group">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            <i className="fas fa-briefcase text-gray-500 mr-2"></i> Experience
          </h4>
          <span className="text-4xl font-bold highlight-text">
            {aiReport?.section_scores?.experience?.score}%
          </span>
          <p className="text-sm text-gray-600 mt-2">
            {aiReport?.section_scores?.experience?.comment}
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 border border-yellow-200 relative overflow-hidden group">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            <i className="fas fa-graduation-cap text-gray-500 mr-2"></i>{" "}
            Education
          </h4>
          <span className="text-4xl font-bold warning-text">
            {aiReport?.section_scores?.education?.score}%
          </span>
          <p className="text-sm text-gray-600 mt-2">
            {aiReport?.section_scores?.education?.comment}
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 border border-red-200 relative overflow-hidden group">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            <i className="fas fa-lightbulb text-gray-500 mr-2"></i> Skills
          </h4>
          <span className="text-4xl font-bold danger-text">
            {aiReport?.section_scores?.skills?.score}%
          </span>
          <p className="text-sm text-gray-600 mt-2">
            {aiReport?.section_scores?.skills?.comment}
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
          <i className="fas fa-lightbulb text-orange-400 mr-2"></i> Tips for
          Improvement
        </h3>
        <ol className="list-none space-y-4">
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
              <i className="fas fa-check"></i>
            </span>
            <div>
              <p className="font-semibold text-gray-800">
                Quantify Achievements:
              </p>
              <p className="text-gray-600 text-sm">
                {aiReport?.tips_for_improvement?.[1] ||
                  "Add more numbers and metrics to your experience section to show impact."}
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
              <i className="fas fa-check"></i>
            </span>
            <div>
              <p className="font-semibold text-gray-800">
                Keywords Optimization:
              </p>
              <p className="text-gray-600 text-sm">
                {aiReport?.tips_for_improvement?.[2] ||
                  "Integrate more industry-specific keywords relevant to your target roles."}
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
              <i className="fas fa-check"></i>
            </span>
            <div>
              <p className="font-semibold text-gray-800">Action Verbs:</p>
              <p className="text-gray-600 text-sm">
                {aiReport?.tips_for_improvement?.[3] ||
                  "Start bullet points with strong action verbs to make your achievements stand out."}
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-5 border border-green-200">
          <h3 className="text-lg font-bold text-green-500  mb-3 flex items-center">
            <span className="fas fa-hand-thumbs-down text-green-500 mr-2">What's Good</span> 
          </h3>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
            <li>{aiReport?.whats_good?.[0]}</li>
            <li>{aiReport?.whats_good?.[1]}</li>
            <li>{aiReport?.whats_good?.[2]}</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 border border-red-200">
          <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
            <span className="fas fa-hand-thumbs-down text-red-500 mr-2">Needs Improvement</span> 
          </h3>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
            <li>{aiReport?.needs_improvement?.[0]}</li>
            <li>{aiReport?.needs_improvement?.[1]}</li>
            <li>{aiReport?.needs_improvement?.[2]}</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600  text-white rounded-lg shadow-md p-6 mb-6 text-center gradient-button-bg">
        <h3 className="text-2xl font-bold mb-3">
          Ready to refine your resume? 💪
        </h3>
        <p className="text-base mb-4">
          Make your application stand out with our premium insights and
          features.
        </p>
        <button
          type="button"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-blue-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          Upgrade to Premium{" "}
          <i className="fas fa-arrow-right ml-2 text-blue-600"></i>
        </button>
      </div>

      <ResumeUploadDialog
        openResumeUpload={openResumeUpload}
        setOpenResumeUpload={() => setOpenResumeUpload(false)}
      />
    </div>
  );
};

export default Report;
