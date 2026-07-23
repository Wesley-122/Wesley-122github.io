import { NextRequest, NextResponse } from "next/server";
import { demoRequestSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = demoRequestSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    // TODO: Forward to Strapi CMS
    console.log("[Demo Request]", validated.data);

    return NextResponse.json(
      { success: true, message: "Demo request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Demo request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
