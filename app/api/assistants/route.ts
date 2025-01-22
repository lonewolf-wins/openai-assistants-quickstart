import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      id: 'gpt-4',
      name: 'GPT-4',
      status: 'Active',
      link: 'https://platform.openai.com/docs/models/gpt-4',
    },
    {
      id: 'gpt-3.5',
      name: 'GPT-3.5',
      status: 'Active',
      link: 'https://platform.openai.com/docs/models/gpt-3-5',
    },
  ]);
}

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }

    return NextResponse.json({ message: "POST request received", input });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
