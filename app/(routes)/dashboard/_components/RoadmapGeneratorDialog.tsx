import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import axios from "axios";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const RoadmapGeneratorDialog = ({ openDialog, setOpenDialog }: any) => {
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const roadmapId = v4();
  const { has } = useAuth();
  const router = useRouter();
  const generateRoadmap = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const hasSubscriptionEnabled = await has({ plan: "pro" });
      if (!hasSubscriptionEnabled) {
        const resultHistory = await axios.get("/api/history");
        const historyList = resultHistory.data;
        const isPresent = await historyList.find(
          (item: any) => item?.aiAgentType == "/ai-tools/ai-roadmap-agent"
        );
        router.push("/billing");
        if (isPresent) {
          return null;
        }
      }

      const result = await axios.post("/api/ai-roadmap-agent", {
        roadmapId: roadmapId,
        userInput: userInput,
      });
      console.log(result.data);
      router.push("/ai-tools/ai-roadmap-agent/" + roadmapId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error generating roadmap:", error);
    }
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Position/Skills to Generate Roadmap</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-2">
              <Input
                onChange={(e) => setUserInput(e?.target.value)}
                placeholder="e.g Full Stack Developer"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"outline"}>Cancel</Button>
          <Button disabled={loading || !userInput} onClick={generateRoadmap}>
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <SparklesIcon />
            )}
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoadmapGeneratorDialog;
