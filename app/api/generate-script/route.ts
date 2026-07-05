import { NextResponse } from "next/server";
import type { ErrorResponse, ScriptRequest, ScriptResponse } from "@/lib/types";

// Server-side only: the OpenAI key never reaches the browser.
// The demo GENERATES a script and returns it. It does not post or deliver
// anything — that keeps the public demo from being abused.

export const runtime = "nodejs";

// --- small guards to keep a public demo from being abused ---
const MAX_FIELD_LENGTH = 1000;

const clean = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, MAX_FIELD_LENGTH);
};

const buildPrompt = (input: ScriptRequest): string => {
  const product = input.promoting === "" ? "the business" : input.promoting;
  const extra =
    input.sellingPoint === ""
      ? ""
      : ` Work in this selling point naturally: "${input.sellingPoint}".`;
  return (
    `Write a punchy 60-second social video script promoting "${product}".` +
    ` Tone: ${input.vibe}. Presenter style: ${input.presenter}.` +
    extra +
    " Return 8 to 10 short spoken lines, around 130 to 160 words total." +
    " Include a strong hook, a clear benefit, a credibility or detail line," +
    " and a closing call to action. No stage directions, no labels, no hashtags."
  );
};

// Minimal shape of the OpenAI chat completion response we actually read.
interface OpenAIChoiceMessage {
  content: string | null;
}
interface OpenAIChoice {
  message: OpenAIChoiceMessage;
}
interface OpenAICompletion {
  choices: ReadonlyArray<OpenAIChoice>;
}

export const POST = async (request: Request): Promise<NextResponse<ScriptResponse | ErrorResponse>> => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey === undefined || apiKey === "") {
    return NextResponse.json(
      { error: "OpenAI is not configured. Add OPENAI_API_KEY to your .env file." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const source = (body ?? {}) as Record<string, unknown>;
  const input: ScriptRequest = {
    promoting: clean(source.promoting),
    vibe: clean(source.vibe),
    presenter: clean(source.presenter),
    sellingPoint: clean(source.sellingPoint),
  };

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  try {
    const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: 500,
        temperature: 0.9,
        messages: [
          {
            role: "system",
            content: "You are a sharp short-form video copywriter for small businesses.",
          },
          { role: "user", content: buildPrompt(input) },
        ],
      }),
    });

    if (!openAiResponse.ok) {
      return NextResponse.json(
        { error: "The script service is busy right now. Please try again." },
        { status: 502 }
      );
    }

    const data = (await openAiResponse.json()) as OpenAICompletion;
    const first = data.choices[0];
    const script = first !== undefined && first.message.content !== null
      ? first.message.content.trim()
      : "";

    if (script === "") {
      return NextResponse.json(
        { error: "No script came back. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ script });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong reaching the script service." },
      { status: 500 }
    );
  }
};
