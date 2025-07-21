import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req:any){
    try {
        const { roadmapId, userInput } = await req.json();
        const user = await currentUser();
        const resultIds = await inngest.send({
            name: "AiRoadmapAgent",
            data: {
                userInput: userInput,
                roadmapId: roadmapId,
                userEmail: user?.primaryEmailAddress?.emailAddress || "",
            },
        });
        const runId = resultIds?.ids?.[0];

        if (!runId) {
            return NextResponse.json({ error: "Failed to trigger Inngest" }, { status: 500 });
        }

        let runStatus;
        let attempts = 0;
        const maxAttempts = 40;
        while (attempts < maxAttempts) {
            runStatus = await getRuns(runId);
            if (runStatus?.data?.[0]?.status === "Completed") break;
            await new Promise((resolve) => setTimeout(resolve, 500));
            attempts++;
        }

        if (runStatus?.data?.[0]?.status !== "Completed") {
            return NextResponse.json({ error: "Inngest function timeout" }, { status: 504 });
        }

        // Log the full runStatus for debugging
        console.log("RunStatus:", runStatus);

        const output  = runStatus?.data?.[0]?.output;
        if (!output) {
            return NextResponse.json({ error: "No output found in Inngest result" }, { status: 404 });
        }

        return NextResponse.json(output);
    } catch (error) {
        console.error("Roadmap Agent API Error:", error);
        return NextResponse.json({ error: "Internal Server Error", details: String(error) }, { status: 500 });
    }
}

export async function getRuns(runId:string){
    const result=await axios.get(process.env.INNGEST_SERVER_HOST + '/v1/events/' + runId + '/runs',{
        headers:{
            Authorization:`Bearer ${process.env.INNGEST_SIGNING_KEY}`,
        }
    })

    return result.data;
}
