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

    // 4. Generate content
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

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 250,
      },
    });

    const reply = response.text || "I apologize, but I couldn't formulate a response at this time.";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Gemini API route error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while communicating with Gemini.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
