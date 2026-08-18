import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    // 1. Verify environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          reply: "Hello! Thank you for interacting with my chatbot. Currently, the server's Gemini API key is not configured. Once Mazin adds the key, you can chat with this virtual assistant. In the meantime, feel free to browse the Skills and Projects sections, or download code repositories from the links above!",
        },
        { status: 200 }
      );
    }

    // 2. Validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const { message } = body;
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "The 'message' field is required and must be a string." },
        { status: 400 }
      );
    }

    // 3. Initialize GoogleGenAI client
    const ai = new GoogleGenAI({ apiKey });

    // 4. System prompt
    const systemPrompt = `You are a virtual AI assistant representing Mazin Ibrahim, an AI / Cloud / Full-Stack Developer.
Your goal is to answer questions about Mazin's skills, projects, and work experience in a professional, polite, and concise manner.
Keep your responses short (usually 1-3 sentences) and focused.
Here is the core information about Mazin:
- Full Name: Mazin Ibrahim
- Job Title: AI / Cloud / Full-Stack Developer
- Main Stacks: React, Next.js, TypeScript, Laravel, AWS, Docker, Kubernetes, DevOps, and GenAI.
- Core Skills:
  * Frontend: React (Expert), Next.js (Expert), TypeScript (Advanced), CSS3/HTML5 (Advanced)
  * Backend: Node.js/Express (Advanced), Laravel/PHP (Advanced), PostgreSQL/MySQL (Advanced)
  * Cloud/DevOps: AWS (Advanced), Docker (Advanced), Kubernetes (Intermediate), CI/CD (Advanced)
  * AI/ML: LLM Integrations/Gemini API (Advanced), LangChain (Intermediate), Vector Databases (Intermediate)
- Projects:
  1. AI Learning Platform: Powered by Gemini, Next.js, TypeScript, PostgreSQL.
  2. E-Commerce Platform: Built with React, Laravel, MySQL, Stripe.
  3. Cloud Infrastructure Dashboard: Managing AWS resources with Next.js, TS, Docker, Kubernetes.
  4. Developer Productivity Assistant: Desktop shell tools with TypeScript, Electron, Docker.
If the user asks questions unrelated to Mazin or general programming/web-development topics, politely guide them back to his portfolio topics.`;

    // Try candidate models in order of preference to handle 503 high demand / rate limit gracefully
    const candidateModels = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-2.5-flash-lite",
      "gemini-flash-latest"
    ];

    let reply: string | null = null;
    let lastError: unknown = null;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: message,
          config: {
            systemInstruction: systemPrompt,
            maxOutputTokens: 250,
          },
        });

        if (response?.text) {
          reply = response.text;
          break;
        }
      } catch (err: unknown) {
        lastError = err;
        console.warn(`Model ${model} failed, trying next fallback:`, err instanceof Error ? err.message : err);
      }
    }

    if (reply) {
      return NextResponse.json({ reply });
    }

    // If all Gemini models are temporarily experiencing 503/unavailable status, provide intelligent portfolio fallback
    console.error("All Gemini models were unavailable:", lastError);
    
    // Quick keyword-based fallback response for seamless user experience during Google API spikes
    const lower = message.toLowerCase();
    let fallbackReply = "Mazin Ibrahim is an AI, Cloud & Full-Stack Developer specializing in React, Next.js, TypeScript, Laravel, and Cloud/DevOps (AWS, Docker, Kubernetes). Feel free to explore his projects and skills on this page!";

    if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech")) {
      fallbackReply = "Mazin's core skills include React, Next.js, TypeScript, Laravel, Node.js, AWS, Docker, Kubernetes, and Generative AI integrations (Gemini API).";
    } else if (lower.includes("project") || lower.includes("work") || lower.includes("learning platform") || lower.includes("ecommerce")) {
      fallbackReply = "Mazin has built featured projects including an AI Learning Platform (Gemini, Next.js), an E-Commerce Platform (React, Laravel, Stripe), a Cloud Infrastructure Dashboard (AWS, Docker, K8s), and Developer Productivity Tools.";
    } else if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("reach")) {
      fallbackReply = "You can get in touch with Mazin via GitHub, LinkedIn, or through the contact links provided in the portfolio header and footer.";
    }

    return NextResponse.json({ reply: fallbackReply });
  } catch (error: unknown) {
    console.error("Gemini API route error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while communicating with Gemini.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
