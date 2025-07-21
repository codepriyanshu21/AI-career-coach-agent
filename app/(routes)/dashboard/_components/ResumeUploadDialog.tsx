"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { File, Loader2Icon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const ResumeUploadDialog = ({ openResumeUpload, setOpenResumeUpload }: any) => {
  const router = useRouter();
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState(false);
  const {has}=useAuth();
  const onFileChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file.name);
      setFile(file);
    }
  };

  // ...existing code...
  const onUpLoadAndAnalyze = async () => {
    setLoading(true);
    const recordId = uuidv4();
    const formData = new FormData();
    formData.append("recordId", recordId);
    formData.append("resumeFile", file);

    //@ts-ignore
    const hasSubscriptionEnabled=await has({plan: "pro"});
    if(!hasSubscriptionEnabled) {
      const resultHistory=await axios.get('/api/history');
      const historyList=resultHistory.data;
      const isPresent=await historyList.find((item:any)=>item?.aiAgentType=='/ai-tools/ai-resume-analyzer/');
      router.push('/billing');
      if(isPresent){
        return null
      }
    }

    try {
      const result = await axios.post("/api/ai-resume-agent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result.data);
      setOpenResumeUpload(false);
      router.push("/ai-tools/ai-resume-analyzer/" + recordId);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
 

  return (
    <Dialog open={openResumeUpload} onOpenChange={setOpenResumeUpload}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload resume pdf file</DialogTitle>
          <DialogDescription>
            <div>
              <label
                htmlFor="resumeUpload"
                className="flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl hover:bg-gray-100 cursor-pointer"
              >
                <File className="h-10 w-10" />
                {file ? (
                  <h2 className="mt-3 text-md text-blue-500">{file?.name}</h2>
                ) : (
                  <h2 className="mt-3">Click here to Upload PDF file</h2>
                )}
              </label>
              <input
                type="file"
                id="resumeUpload"
                accept="application/pdf"
                className="hidden"
                onChange={onFileChange}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Cancel</Button>
          <Button disabled={!file || loading} onClick={onUpLoadAndAnalyze}>
            {loading ? <Loader2Icon className="animate-spin" /> : <Sparkles />}
            Upload & Analyze
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadDialog;
