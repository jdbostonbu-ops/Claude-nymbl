import { NextResponse } from "next/server";
import type { ErrorResponse, VideoRequest, VideoResponse, VideoWebhookPayload } from "@/lib/types";

export const runtime = "nodejs";

const MAX_FIELD_LENGTH = 1000;
const MAX_SCRIPT_LENGTH = 4000;

const clean = (value: unknown, maxLength = MAX_FIELD_LENGTH): string => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
};

export const POST = async (request: Request): Promise<NextResponse<VideoResponse | ErrorResponse>> => {
  const webhookUrl = process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL;
  if (webhookUrl === undefined || webhookUrl === "") {
    return NextResponse.json(
      { error: "Video webhook is not configured. Add NEXT_PUBLIC_ZAPIER_WEBHOOK_URL to your .env file." },
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
  const input: VideoRequest = {
    name: clean(source.name),
    email: clean(source.email),
    phone: clean(source.phone),
    business: clean(source.business),
    promoting: clean(source.promoting),
    vibe: clean(source.vibe),
    presenter: clean(source.presenter),
    sellingPoint: clean(source.sellingPoint),
    script: clean(source.script, MAX_SCRIPT_LENGTH),
  };

  if (
    input.name === "" ||
    input.email === "" ||
    input.phone === "" ||
    input.business === "" ||
    input.script === ""
  ) {
    return NextResponse.json(
      { error: "Please add your name, email, phone, business, and generated script before ordering." },
      { status: 400 }
    );
  }

  const payload: VideoWebhookPayload = {
    ...input,
    date: new Date().toISOString(),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not send your video order. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong sending your video order." },
      { status: 500 }
    );
  }
};
