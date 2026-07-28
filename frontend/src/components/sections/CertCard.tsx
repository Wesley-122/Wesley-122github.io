"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CertCardProps {
  name: string;
  body: string;
  image: string;
  delay?: number;
}

export default function CertCard({ name, body, image, delay = 0 }: CertCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="card flex flex-col items-center p-6 text-center h-full cursor-pointer group"
        style={{ animationDelay: `${delay}s` }}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(true);
        }}
        aria-label={`查看${name}大图`}
      >
        <div className="relative h-32 w-full overflow-hidden rounded-lg bg-neutral-50 group-hover:ring-2 group-hover:ring-primary/30 transition-all">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>
        <h4 className="mt-4 font-semibold text-neutral-900 group-hover:text-primary transition-colors">
          {name}
        </h4>
        <p className="mt-1 text-xs text-neutral-400">{body}</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-50">
            <Image
              src={image}
              alt={name}
              fill
              sizes="672px"
              className="object-contain p-4"
              unoptimized
            />
          </div>
          <p className="text-center text-sm text-neutral-500">{body}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
