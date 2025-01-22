import { openai } from "@/app/openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    // Validate input
    if (!input) {
      return Response.json({ error: "Input is required" }, { status: 400 });
    }

    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    if (!assistantId) {
      throw new Error("Assistant ID is missing in environment variables.");
    }

    // Step 1: Create a new thread
    const thread = await openai.beta.threads.create();

    // Step 2: Add messages to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: input,
    });

    // Step 3: Run the assistant on the thread
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
      model: process.env.GPT_MODEL_ID || "gpt-4-turbo",
      instructions: "Respond based on the selected panel expertise.",
      additional_instructions: "Make sure to provide accurate and concise responses.",
      tools: [
        { type: "code_interpreter" },
        { type: "file_search" }
      ]
    });

    // Poll the run until completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while (runStatus.status !== "completed" && runStatus.status !== "failed") {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Polling interval
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    if (runStatus.status === "failed") {
      throw new Error("Assistant failed to process the request.");
    }

    // Step 4: Retrieve assistant's response
    const messages = await openai.beta.threads.messages.list(thread.id);
    const responseMessage = messages.data.find(msg => msg.role === "assistant");

    return Response.json({ response: responseMessage?.content || "No response received." });
  } catch (error) {
    console.error("API error:", error);
    return Response.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
