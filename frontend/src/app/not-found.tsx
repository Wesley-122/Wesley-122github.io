import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-white font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-neutral-900">
            页面未找到 / Page Not Found
          </h2>
          <p className="mt-2 text-neutral-500">
            您访问的页面不存在或已移除。The page you are looking for does not exist.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/zh-CN" className="btn-primary">
              返回首页 / Home
            </Link>
            <Link href="/en" className="btn-secondary">
              English
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
