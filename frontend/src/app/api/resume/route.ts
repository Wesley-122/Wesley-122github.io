import { NextRequest, NextResponse } from "next/server";
import { resumeFormSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      positionId: formData.get("positionId") as string,
      coverLetter: formData.get("coverLetter") as string || "",
    };

    const validated = resumeFormSchema.safeParse(data);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const resumeFile = formData.get("resume") as File | null;

    // TODO: Upload file to Strapi media library
    // TODO: Create resume submission in Strapi

    console.log("[Resume Submission]", {
      ...validated.data,
      hasFile: !!resumeFile,
      fileName: resumeFile?.name,
    });

    return NextResponse.json(
      { success: true, message: "Resume submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resume form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
