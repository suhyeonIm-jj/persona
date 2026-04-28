import { NextResponse } from "next/server";
import { deleteProfile } from "@/lib/data";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  deleteProfile(id);
  return NextResponse.json({ success: true });
}
