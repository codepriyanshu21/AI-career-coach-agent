"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { LoaderCircle, Send } from "lucide-react";
import ReactMarkdown from 'react-markdown'
import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";


type Message = {
  content: string;
  role: string;
  type: string;
};

const AIChat = () => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const {chatid}:any = useParams();
  const router = useRouter();

  const getMessageList=async()=>{
    const result =await axios.get('/api/history?recordId='+chatid);
    console.log(result.data);
    setMessageList(result?.data?.content)
  }

  useEffect(() => {
    chatid && getMessageList();
  }, [chatid]);

  const handleSend = async () => {
    setLoading(true);
    setMessageList((prev) => [
      ...prev,
      {
        content: input,
        role: "user",
        type: "text",
      },
    ]);
    const result = await axios.post("/api/ai-career-chat-agent", {
      userInput: input,
    });
    console.log(result.data);
    setMessageList((prev) => [...prev, result.data]);
    setInput("");
    setLoading(false);
  };

  useEffect(()=>{
    // save message into database
    messageList.length > 0 && updateMessageList();
  },[messageList]);

  const updateMessageList=async()=>{
    const result=await axios.put('/api/history',{
      content:messageList,
      recordId:chatid
    })
    console.log(result)
  }

  // for new chat
  const onNewChat=async()=>{
    const id= uuidv4();
    const result=await axios.post('/api/history',{
      recordId:id,
      content:[]
    })
    console.log(result);
    router.replace("/ai-tools/ai-chat/" + id);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 md:p-8 border border-gray-200 dark:border-gray-800 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              AI Career Q/A Chat
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
              Smarter career decisions start here — get tailored advice,
              real-time market insights, and personalized guidance.
            </p>
          </div>
          <Button onClick={onNewChat} className="w-full md:w-auto mt-2 md:mt-0">+ New Chat</Button>
        </div>
      </div>

      {/* Prompt Suggestions */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
        <p className="text-sm text-gray-700 dark:text-gray-200 font-medium mb-2">
          Ask anything to AI Career Agent
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>What skills do I need for a data analyst role?</li>
          <li>How do I switch careers to UX design?</li>
        </ul>
      </div>

      {/* Chat Window */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-inner h-[500px] overflow-y-auto p-4 space-y-4 border border-gray-200 dark:border-gray-800">
        {messageList?.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-md text-center mt-32">
            No messages yet. Start the conversation above 👆
          </p>
        ) : (
          messageList?.map((msg, idx) => (
            <div>
              <div
                key={idx}
                className={cn(
                  "whitespace-pre-line max-w-[75%] px-4 py-3 rounded-lg text-sm",
                  msg.role === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-start"
                )}
              >
                <ReactMarkdown>
                  {msg.content}
                </ReactMarkdown>
              </div>
              <div className="flex justify-start p-3 rounded-lg gap-2 ">
                {loading && messageList?.length -1 === idx && <LoaderCircle className="animate-spin" />}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Box */}
      <div className="mt-4 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          type="text"
          placeholder="Type your question..."
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleSend} disabled={loading}>
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default AIChat;
