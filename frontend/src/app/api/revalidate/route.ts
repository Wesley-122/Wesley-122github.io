import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || "lk-revalidate-secret";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, path } = body;

    if (secret !== REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // Revalidate all locale versions
    revalidatePath(`/zh-CN${path}`);
    revalidatePath(`/en${path}`);

    return NextResponse.json({
      success: true,
      revalidated: [`/zh-CN${path}`, `/en${path}`],
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
