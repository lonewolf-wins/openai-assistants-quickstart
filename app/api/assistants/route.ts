import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      id: 'gpt-4',
      name: 'GPT-4',
      status: 'Active',
      link: 'https://platform.openai.com/docs/models/gpt-4',
      model_id: 'gpt-4-turbo',
      context_window: 8192,
      max_tokens: 4096,
      pricing: {
        input: "$0.03 / 1K tokens",
        output: "$0.06 / 1K tokens"
      },
      release_date: "2023-03-14",
      capabilities: ["text generation", "code generation", "function calling"]
    },
    {
      id: 'gpt-3.5',
      name: 'GPT-3.5',
      status: 'Active',
      link: 'https://platform.openai.com/docs/models/gpt-3-5',
      model_id: 'gpt-3.5-turbo',
      context_window: 4096,
      max_tokens: 2048,
      pricing: {
        input: "$0.002 / 1K tokens",
        output: "$0.004 / 1K tokens"
      },
      release_date: "2022-06-01",
      capabilities: ["text generation", "chatbot", "summarization"]
    },
  ]);
}
