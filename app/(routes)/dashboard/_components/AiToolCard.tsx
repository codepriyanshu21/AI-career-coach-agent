'use client';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ResumeUploadDialog from './ResumeUploadDialog';
import RoadmapGeneratorDialog from './RoadmapGeneratorDialog';

interface TOOL {
  name: string;
  desc: string;
  icon: string;
  button: string;
  path: string;
}

type AIToolProps = {
  tool: TOOL;
};

const AiToolCard = ({ tool }: AIToolProps) => {
  const id=uuidv4();
  const {user}=useUser()
  const router=useRouter()
  const [openResumeUpload, setOpenResumeUpload] = useState(false)
  const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false);
  
  const onClickButton=async()=>{
    if(tool.name ==='AI Resume Analyzer' ){
      setOpenResumeUpload(true);
      return;
    }

    if(tool.path==='/ai-tools/ai-roadmap-agent'){
      setOpenRoadmapDialog(true);
      return;
    }
    // create new record to history table
    const result=await axios.post('/api/history',{
      recordId:id,
      content:[],
      aiAgentType:tool.path
    })
    console.log(result)
    router.push(tool.path + "/" + id)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all p-6 w-full max-w-sm flex flex-col gap-4 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center  gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">
          <Image src={tool.icon} width={40} height={40} alt={tool.name} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{tool.name}</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{tool.desc}</p>
      
        <Button className="w-full mt-2"
        onClick={onClickButton}>{tool.button}</Button>
      
      <ResumeUploadDialog openResumeUpload={openResumeUpload}
      setOpenResumeUpload={setOpenResumeUpload}/>

      <RoadmapGeneratorDialog openDialog={openRoadmapDialog} setOpenDialog={()=>setOpenRoadmapDialog(false)}/>
    </div>
  );
};

export default AiToolCard;
