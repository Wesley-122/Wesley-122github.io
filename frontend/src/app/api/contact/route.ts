import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactFormSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, company, phone, message } = validated.data;

    // TODO: Forward to Strapi CMS when available
    // const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/contact-submissions`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ data: { name, email, company, phone, message } }),
    // });

    // For now, log and return success (local dev mode)
    console.log("[Contact Submission]", { name, email, company, phone, message });

    return NextResponse.json(
      { success: true, message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
