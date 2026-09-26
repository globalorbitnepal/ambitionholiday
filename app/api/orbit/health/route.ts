import { NextResponse } from "next/server";
import { isOrbitConfigured } from "@/lib/orbit-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ configured: isOrbitConfigured() });
}
