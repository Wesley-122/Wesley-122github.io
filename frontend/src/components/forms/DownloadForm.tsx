"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle, Download } from "lucide-react";
import { downloadFormSchema, type DownloadFormData } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/types/content";

interface DownloadFormProps {
  locale: Locale;
  pdfTitle: string;
  pdfUrl: string;
}

export default function DownloadForm({ locale, pdfTitle, pdfUrl }: DownloadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DownloadFormData>({
    resolver: zodResolver(downloadFormSchema),
  });

  const isZh = locale === "zh-CN";

  const onSubmit = async (data: DownloadFormData) => {
    setStatus("submitting");
    try {
      await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, pdfTitle, locale }),
      });
      setStatus("success");
      // Trigger download
      window.open(pdfUrl, "_blank");
    } catch {
      setStatus("error");
      setErrorMsg(isZh ? "下载失败，请稍后重试" : "Download failed. Please try again.");
    }
  };

  return (
    <div className="card p-6">
      {status === "success" ? (
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
          <p className="mt-3 font-medium text-neutral-900">
            {isZh ? "下载已开始！" : "Download Started!"}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dl-name">{isZh ? "姓名" : "Name"} <span className="text-error">*</span></Label>
            <Input id="dl-name" placeholder={isZh ? "您的姓名" : "Your name"} {...register("name")} />
            {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dl-email">{isZh ? "邮箱" : "Email"} <span className="text-error">*</span></Label>
            <Input id="dl-email" type="email" placeholder="your@email.com" {...register("email")} />
            {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dl-company">{isZh ? "公司名称" : "Company"}</Label>
            <Input id="dl-company" placeholder={isZh ? "您的公司（选填）" : "Your company (optional)"} {...register("company")} />
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="dl-consent"
              className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary"
              {...register("consent")}
            />
            <Label htmlFor="dl-consent" className="text-xs text-neutral-500 leading-relaxed cursor-pointer">
              {isZh
                ? "我同意箩筐科技隐私政策，并允许通过此信息与我联系。"
                : "I agree to LKtechnology's privacy policy and consent to being contacted."}
              <span className="text-error">*</span>
            </Label>
          </div>
          {errors.consent && <p className="text-xs text-error">{errors.consent.message}</p>}

          {status === "error" && (
            <div className="flex items-center gap-2 rounded-lg bg-error/10 px-4 py-3 text-sm text-error">
              <AlertCircle className="h-4 w-4" />{errorMsg}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isZh ? "下载中..." : "Downloading..."}</>
            ) : (
              <><Download className="mr-2 h-4 w-4" />{isZh ? "下载资料" : "Download PDF"}</>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
