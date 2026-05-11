import { NextResponse } from "next/server";
import { getProfiles, saveProfile } from "@/lib/data";
import { Palette, Shape } from "@/types";

export async function GET() {
  return NextResponse.json(getProfiles());
}

export async function POST(request: Request) {
  const body = await request.json() as {
    name: string;
    lang: "ko" | "en";
    palette?: Palette;
    shape?: Shape;
  };

  const { name, lang, palette, shape } = body;
  if (!name || !lang) {
    return NextResponse.json({ error: "필수 필드 누락" }, { status: 400 });
  }

  const profile = saveProfile(name, lang, palette, shape);
  return NextResponse.json(profile, { status: 201 });
}
