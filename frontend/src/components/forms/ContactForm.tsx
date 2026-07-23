"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/types/content";

interface ContactFormProps {
  locale: Locale;
}

export default function ContactForm({ locale }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const isZh = locale === "zh-CN";

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(isZh ? "提交失败，请稍后重试" : "Submission failed, please try again later.");
    }
  };

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center justify-center p-12 text-center">
        <CheckCircle2 className="h-16 w-16 text-success" />
        <h3 className="mt-4 text-xl font-semibold text-neutral-900">
          {isZh ? "提交成功！" : "Submitted Successfully!"}
        </h3>
        <p className="mt-2 text-neutral-500">
          {isZh
            ? "感谢您的咨询，我们将在24小时内与您联系。"
            : "Thank you for your inquiry. We will contact you within 24 hours."}
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          {isZh ? "继续咨询" : "Submit Another"}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            {isZh ? "姓名" : "Name"} <span className="text-error">*</span>
          </Label>
          <Input
            id="name"
            placeholder={isZh ? "请输入您的姓名" : "Your name"}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-error">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            {isZh ? "邮箱" : "Email"} <span className="text-error">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={isZh ? "请输入您的邮箱" : "Your email"}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-error">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">
            {isZh ? "公司名称" : "Company"}
          </Label>
          <Input
            id="company"
            placeholder={isZh ? "请输入公司名称（选填）" : "Your company (optional)"}
            {...register("company")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            {isZh ? "电话" : "Phone"}
          </Label>
          <Input
            id="phone"
            placeholder={isZh ? "请输入您的电话（选填）" : "Your phone (optional)"}
            {...register("phone")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          {isZh ? "咨询内容" : "Message"} <span className="text-error">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder={isZh ? "请描述您的需求，我们将尽快回复..." : "Please describe your needs..."}
          rows={5}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-error">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-error/10 px-4 py-3 text-sm text-error">
          <AlertCircle className="h-4 w-4" />
          {errorMsg}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isZh ? "提交中..." : "Submitting..."}
          </>
        ) : (
          isZh ? "提交咨询" : "Submit Inquiry"
        )}
      </Button>
    </form>
  );
}
