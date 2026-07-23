"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { demoRequestSchema, type DemoRequestData } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/types/content";

interface DemoRequestFormProps {
  locale: Locale;
  products?: { id: string; name: string }[];
}

export default function DemoRequestForm({ locale, products = [] }: DemoRequestFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemoRequestData>({
    resolver: zodResolver(demoRequestSchema),
  });

  const isZh = locale === "zh-CN";

  const onSubmit = async (data: DemoRequestData) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMsg(isZh ? "预约失败，请稍后重试" : "Booking failed. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center justify-center p-12 text-center">
        <CheckCircle2 className="h-16 w-16 text-success" />
        <h3 className="mt-4 text-xl font-semibold text-neutral-900">
          {isZh ? "预约成功！" : "Demo Booked!"}
        </h3>
        <p className="mt-2 text-neutral-500">
          {isZh
            ? "我们将在1个工作日内确认您的预约时间。"
            : "We will confirm your demo time within 1 business day."}
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          {isZh ? "返回" : "Back"}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="d-name">{isZh ? "姓名" : "Name"} <span className="text-error">*</span></Label>
          <Input id="d-name" placeholder={isZh ? "您的姓名" : "Your name"} {...register("name")} />
          {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="d-company">{isZh ? "公司名称" : "Company"} <span className="text-error">*</span></Label>
          <Input id="d-company" placeholder={isZh ? "您的公司" : "Your company"} {...register("company")} />
          {errors.company && <p className="text-xs text-error">{errors.company.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="d-email">{isZh ? "邮箱" : "Email"} <span className="text-error">*</span></Label>
          <Input id="d-email" type="email" placeholder="your@email.com" {...register("email")} />
          {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="d-phone">{isZh ? "电话" : "Phone"} <span className="text-error">*</span></Label>
          <Input id="d-phone" placeholder={isZh ? "您的电话" : "Your phone"} {...register("phone")} />
          {errors.phone && <p className="text-xs text-error">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="d-product">{isZh ? "产品兴趣" : "Product Interest"}</Label>
          <select
            id="d-product"
            className="flex h-10 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            {...register("productInterest")}
          >
            <option value="">{isZh ? "请选择（选填）" : "Select (optional)"}</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="d-date">{isZh ? "期望日期" : "Preferred Date"}</Label>
          <Input id="d-date" type="date" {...register("preferredDate")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="d-message">{isZh ? "补充说明" : "Additional Notes"}</Label>
        <Textarea
          id="d-message"
          placeholder={isZh ? "请描述您关注的功能或业务场景" : "Describe features or scenarios you care about"}
          rows={3}
          {...register("message")}
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
          isZh ? "提交预约" : "Book Demo"
        )}
      </Button>
    </form>
  );
}
