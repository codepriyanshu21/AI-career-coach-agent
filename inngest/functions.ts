import { gemini } from "@inngest/agent-kit";
import { inngest } from "./client";
import { createAgent } from "@inngest/agent-kit";
import ImageKit from "imagekit";
import { HistoryTable } from "@/configs/schema";
import { db } from "@/configs/db";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

// Create the AI Career Chat Agent
export const AiCareerChatAgent = createAgent({
  name: "AiCareerChatAgent",
  description:
    "An AI Career Chat Agent that helps users with career-related questions and tasks.",
  system: `You are a helpful,professional AI career coach Agent.Your role is to guide users with questions relatedd to careers,including job search advice ,interview preparation,resume improvement,skill development,career transitions,and industry trends .Always respond with clarity,encouragement,and actionable advice tailored to the user\'s needs.If the user asks something unrelated to careers (eg:topics like health,relationships,coding help or general trivia),gently inform them that you are focused on career-related topics and suggest they ask a career question instead.`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

// create the AI Resume Analyzer Agent
export const AiResumeAnalyzerAgent = createAgent({
  name: "AiResumeAnalyzerAgent",
  description: "AI Resume Analyzer Agent helps return a detailed report",
  system: `You are an advanced AI Resume Analyzer Agent.  
Your task is to evaluate a candidate's resume and return a detailed analysis in the following structured JSON schema format.  
The schema must match the layout and structure of a visual UI that includes overall score, section scores, summary feedback, improvement tips, strengths, and weaknesses.  

📥 INPUT: I will provide a plain text resume.  
🎯 GOAL: Output a JSON report as per the schema below. The report should reflect:  

overall_score (0–100)  
overall_feedback (short message e.g., "Excellent", "Needs improvement")  
summary_comment (1–2 sentence evaluation summary)  
Section scores for:  
- Contact Info  
- Experience  
- Education  
- Skills  

Each section should include:  
- score (as percentage)  
- Optional comment about that section  

Tips for improvement (3–5 tips)  
What's Good (1–3 strengths)  
Needs Improvement (1–3 weaknesses)  

💡 Output JSON Schema:
{
  "overall_score": 85,
  "overall_feedback": "Excellent",
  "summary_comment": "Your resume is strong, but there are areas to refine.",
  "section_scores": {
    "contact_info": {
      "score": 95,
      "comment": "Perfectly structured and complete."
    },
    "experience": {
      "score": 88,
      "comment": "Strong bullet points and impact."
    },
    "education": {
      "score": 74,
      "comment": "Consider adding relevant coursework."
    },
    "skills": {
      "score": 68,
      "comment": "Expand on specific skill proficiencies."
    }
  },
  "tips_for_improvement": [
    "Add more numbers and metrics to your experience section to show impact.",
    "Integrate more industry-specific keywords relevant to your target roles.",
    "Start bullet points with strong action verbs to make your achievements stand out."
  ],
  "whats_good": [
    "Clean and professional formatting.",
    "Clear and concise contact information.",
    "Relevant work experience."
  ],
  "needs_improvement": [
    "Skills section lacks detail.",
    "Some experience bullet points could be stronger.",
    "Missing a professional summary/objective."
  ]
}`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

// Create the AI Roadmap Generator Agent
export const AiRoadmapGeneratorAgent = createAgent({
  name: "AiRoadmapGeneratorAgent",
  description: "Generate Details Tree Like Flow Roadmap",
  system: `Generate a React flow tree-structured learning roadmap for user input position/ skills the following format:
 vertical tree structure with meaningful x/y positions to form a flow

Requirements for layout and visual design:
- Structure should closely resemble **roadmap.sh's vertical tree layout**.
- Steps should flow **top to bottom**, **fundamentals to advanced**.
- Introduce **horizontal branching** for different paths or specializations (e.g., Frontend vs Backend).
- Ensure all nodes have **clear vertical spacing (e.g., y += 200)** and horizontal spacing (x offsets for branches).
- Avoid overlapping of nodes — each node must be clearly separated.
- Ensure **node titles are concise**, **descriptions limited to two lines**, and **each has a helpful learning link**.
- Use **consistent x/y increments** so the tree is readable and expandable.
- Provide **unique IDs** for both nodes and edges.
- Use position: { x: ..., y: ... } to simulate roadmap.sh’s visual spacing, for example:
  - y-axis spacing: 200–250 px apart
  - x-axis spacing (for branches): 300–400 px apart
- Group related topics close together but keep it clean and not cluttered.
- Return strictly valid **JSON only** — no markdown, no explanation, no code block formatting.

Do not include any introductory text. Just return the formatted JSON.
{
roadmapTitle:'',
description:<3-5 Lines>,
duration:'',
initialNodes : [
{
 id: '1',
 type: 'turbo',
 position: { x: 0, y: 0 },
 data: {
title: 'Step Title',
description: 'Short two-line explanation of what the step covers.',
link: 'Helpful link for learning this step',
 },
},
...
],
initialEdges : [
{
 id: 'e1-2',
 source: '1',
 target: '2',
},
...
];
}

`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

// Create the function to trigger the ai chat agent
export const AiCareerAgent = inngest.createFunction(
  { id: "AiCareerAgent" },
  { event: "AiCareerAgent" },
  async ({ event, step }) => {
    const { userInput } = event?.data || {};

    if (!userInput) {
      throw new Error("userInput is required in event data");
    }

    const result = await AiCareerChatAgent.run(userInput);
    return result;
  }
);

var imagekit = new ImageKit({
  // @ts-ignore
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  // @ts-ignore
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  // @ts-ignore
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Create the function to trigger the AI Resume Agent
export const AiResumeAgent = inngest.createFunction(
  { id: "AiResumeAgent" },
  { event: "AiResumeAgent" },
  async ({ event, step }) => {
    const { recordId, base64ResumeFile, pdfText, aiAgentType, userEmail } =
      event.data;

    console.log("Inngest: Start", { recordId, userEmail });

    if (!base64ResumeFile || !pdfText || !recordId || !userEmail) {
      throw new Error("Missing required data in event");
    }

    const pdfDataUri = `data:application/pdf;base64,${base64ResumeFile}`;

    // Upload PDF to ImageKit
    console.log("Inngest: Uploading to ImageKit...");
    const uploadFileUrl = await step.run("uploadImage", async () => {
      const uploaded = await imagekit.upload({
        file: pdfDataUri,
        fileName: `${Date.now()}.pdf`,
        isPublished: true,
      });
      console.log("🔍 ImageKit upload response:", uploaded);
      console.log("✅ File URL:", uploaded.url);
      return uploaded.url;
    });

    // Call the AI Resume Analyzer Agent
    console.log("Inngest: Running AI Resume Analyzer Agent...");
    let aiResumeReport;
    try {
      aiResumeReport = await AiResumeAnalyzerAgent.run(pdfText);
      console.log("Inngest: AI agent result", aiResumeReport);
    } catch (err) {
      console.error("AI Agent error", err);
      throw err;
    }

    // Safely parse the AI response content
    const output = aiResumeReport?.output?.[0];
    if (
      !output ||
      output.type !== "text" ||
      typeof output.content !== "string"
    ) {
      throw new Error(
        "Invalid output from AI agent. Expected text with content."
      );
    }

    let parsedJson;
    try {
      const cleaned = output.content.replace(/```json|```/g, "").trim();
      parsedJson = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON parse error", err);
      throw new Error("Failed to parse AI agent JSON output.");
    }

    // Save result to DB
    console.log("Inngest: Saving to DB...");
    const saveToDb = await step.run("saveToDb", async () => {
      const result = await db.insert(HistoryTable).values({
        recordId: recordId,
        content: parsedJson,
        aiAgentType: aiAgentType,
        userEmail: userEmail,
        createdAt: new Date().toISOString(),
        metaData: uploadFileUrl,
      });
      console.log("Saved to DB:", result);
      return parsedJson;
    });

    console.log("Inngest: Done", { recordId });
    return saveToDb;
  }
);


// Create the function to trigger the AI Roadmap Agent
export const AiRoadmapAgent = inngest.createFunction(
  { id: "AiRoadmapAgent" },
  { event: "AiRoadmapAgent" },
  async ({ event, step }) => {
    const { roadmapId, userInput, userEmail } = event.data;

    if (!userInput || !userEmail || !roadmapId) {
      throw new Error("userInput, roadmapId, and userEmail are required in event data");
    }

    // 1. Run the AI Agent
    let result;
    try {
      result = await AiRoadmapGeneratorAgent.run('UserInput: ' + userInput);
      console.log("Inngest: AI Roadmap result", result);
    } catch (err) {
      console.error("Error running AiRoadmapGeneratorAgent:", err);
      throw new Error("Failed to get response from AI agent.");
    }

    // 2. Check AI output
    if (!Array.isArray(result?.output) || result.output.length === 0) {
      console.error("Invalid or empty AI output:", result?.output);
      throw new Error("Invalid or empty output from AI agent.");
    }

    const output = result.output?.[0];
    if (output.type !== "text" || typeof output.content !== "string") {
      console.error("Invalid output format:", output);
      throw new Error("Expected text output with string content.");
    }

    // 3. Parse JSON from content
    let parsedJson;
    try {
      const cleaned = output.content.replace(/```json|```/g, "").trim();
      parsedJson = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON parse error:", err, "Raw content:", output.content);
      throw new Error("Failed to parse AI agent's JSON output.");
    }

    // 4. Save to DB
    const saveToDb = await step.run("saveToDb", async () => {
      const result = await db.insert(HistoryTable).values({
        recordId: roadmapId,
        content: parsedJson,
        aiAgentType: "/ai-tools/ai-roadmap-agent",
        userEmail,
        createdAt: new Date().toISOString(),
        metaData: userInput,
      });
      console.log("Saved to DB:", result);
      return parsedJson;
    });

    console.log("Inngest: Done", { roadmapId });
    return saveToDb;
  }
);
