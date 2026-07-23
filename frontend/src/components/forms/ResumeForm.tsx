"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle, Upload } from "lucide-react";
import { resumeFormSchema, type ResumeFormData } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/types/content";

interface ResumeFormProps {
  locale: Locale;
  positions: { id: string; title: string }[];
}

export default function ResumeForm({ locale, positions }: ResumeFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeFormSchema),
  });

  const isZh = locale === "zh-CN";

  const onSubmit = async (data: ResumeFormData) => {
    setStatus("submitting");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("positionId", data.positionId);
      if (data.coverLetter) formData.append("coverLetter", data.coverLetter);
      if (file) formData.append("resume", file);
      formData.append("locale", locale);

      const res = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      reset();
      setFile(null);
    } catch {
      setStatus("error");
      setErrorMsg(isZh ? "提交失败，请稍后重试" : "Submission failed. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center justify-center p-12 text-center">
        <CheckCircle2 className="h-16 w-16 text-success" />
        <h3 className="mt-4 text-xl font-semibold text-neutral-900">
          {isZh ? "简历投递成功！" : "Resume Submitted!"}
        </h3>
        <p className="mt-2 text-neutral-500">
          {isZh
            ? "感谢您的申请，HR将在3-5个工作日内联系您。"
            : "Thank you for your application. HR will contact you within 3-5 business days."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="r-name">{isZh ? "姓名" : "Name"} <span className="text-error">*</span></Label>
          <Input id="r-name" placeholder={isZh ? "您的姓名" : "Your name"} {...register("name")} />
          {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="r-email">{isZh ? "邮箱" : "Email"} <span className="text-error">*</span></Label>
          <Input id="r-email" type="email" placeholder="your@email.com" {...register("email")} />
          {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="r-phone">{isZh ? "电话" : "Phone"} <span className="text-error">*</span></Label>
          <Input id="r-phone" placeholder={isZh ? "您的电话" : "Your phone"} {...register("phone")} />
          {errors.phone && <p className="text-xs text-error">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="r-position">{isZh ? "意向职位" : "Position"} <span className="text-error">*</span></Label>
          <select
            id="r-position"
            className="flex h-10 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            {...register("positionId")}
          >
            <option value="">{isZh ? "请选择职位" : "Select position"}</option>
            {positions.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
          {errors.positionId && <p className="text-xs text-error">{errors.positionId.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>{isZh ? "上传简历" : "Upload Resume"}</Label>
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-neutral-300 px-4 py-3 text-sm text-neutral-500 hover:border-primary hover:text-primary transition-colors">
            <Upload className="h-4 w-4" />
            {file ? file.name : isZh ? "选择文件 (PDF/DOC, 最大10MB)" : "Choose file (PDF/DOC, max 10MB)"}
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="r-cover">{isZh ? "自荐信" : "Cover Letter"}</Label>
        <Textarea
          id="r-cover"
          placeholder={isZh ? "简要介绍自己（选填）" : "Tell us about yourself (optional)"}
          rows={4}
          {...register("coverLetter")}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-error/10 px-4 py-3 text-sm text-error">
          <AlertCircle className="h-4 w-4" />{errorMsg}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isZh ? "提交中..." : "Submitting..."}</>
        ) : (
          isZh ? "提交简历" : "Submit Resume"
        )}
      </Button>
    </form>
  );
}
