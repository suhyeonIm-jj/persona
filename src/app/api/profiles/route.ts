import { NextResponse } from "next/server";
import { getProfiles, saveProfile } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getProfiles());
}

export async function POST(request: Request) {
  const body = await request.json() as {
    name: string;
    lang: "ko" | "en";
    length?: 8 | 12;
    meaning?: string;
  };

  const { name, lang, length, meaning } = body;
  if (!name || !lang) {
    return NextResponse.json({ error: "필수 필드 누락" }, { status: 400 });
  }

  const profile = saveProfile(name, lang, length, meaning);
  return NextResponse.json(profile, { status: 201 });
}
