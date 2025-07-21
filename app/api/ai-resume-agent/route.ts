import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    const formData = await req.formData();
    const recordId = formData.get("recordId");
    const resumeFile: File | null = formData.get("resumeFile") as File;

    if (!recordId || !resumeFile) {
      return NextResponse.json({ error: "Missing resume file or recordId" }, { status: 400 });
    }

    // Read raw PDF content
    const loader = new WebPDFLoader(resumeFile);
    const docs = await loader.load();

    if (!docs.length || !docs[0].pageContent) {
      return NextResponse.json({ error: "Could not read resume text" }, { status: 400 });
    }

    // Convert file to base64
    const arrayBuffer = await resumeFile.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // Send to Inngest (fire-and-forget)
    const resultIds = await inngest.send({
      name: "AiResumeAgent",
      data: {
        recordId,
        base64ResumeFile: base64,
        pdfText: docs[0].pageContent,
        aiAgentType: "/ai-tools/ai-resume-analyzer",
        userEmail: user?.primaryEmailAddress?.emailAddress || "unknown",
      },
    });

    const runId = resultIds?.ids?.[0];
    if (!runId) {
      return NextResponse.json({ error: "Failed to trigger Inngest" }, { status: 500 });
    }

    // Return immediately with the runId
    return NextResponse.json({ runId, recordId, status: "processing" });

  } catch (error) {
    console.error("Resume Analyzer Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: String(error) }, { status: 500 });
  }
}