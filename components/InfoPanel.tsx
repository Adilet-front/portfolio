"use client";

import { useState } from "react";
import { MapPin, Send, ExternalLink, Calendar, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import type { Profile } from "@/content/profile";

export function InfoPanel({ profile }: { profile: Profile }) {
  const [expanded, setExpanded] = useState(false);
  const aboutText = expanded ? profile.aboutFull : profile.about;

  return (
    <div className="px-5 pb-20 pt-6 animate-in fade-in duration-200">
      {/* Location */}
      <section className="mb-7 rounded-2xl border border-zinc-850 bg-[#141416] p-4">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Локация
        </p>
        <p className="flex items-center gap-2 text-[15px] font-medium text-zinc-100">
          <MapPin size={17} className="text-zinc-400" />
          <span>{profile.location}</span>
        </p>
      </section>

      {/* About */}
      <section className="mb-7 rounded-2xl border border-zinc-850 bg-[#141416] p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          О себе
        </p>
        <p className="whitespace-pre-line text-[14px] leading-relaxed text-zinc-200">
          {aboutText}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-blue-400 hover:text-blue-300 transition"
        >
          <span>{expanded ? "Свернуть" : "Читать полностью"}</span>
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </section>

      {/* Contact / Links */}
      <section className="mb-7 rounded-2xl border border-zinc-850 bg-[#141416] p-4">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Контакты и связь
        </p>
        <a
          href={profile.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-[14px] font-medium text-zinc-100 hover:border-[#229ED9]/60 hover:bg-[#229ED9]/10 transition"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#229ED9]/20 text-[#229ED9] group-hover:bg-[#229ED9] group-hover:text-white transition">
              <Send size={15} />
            </div>
            <span>{profile.telegramLabel}</span>
          </div>
          <ExternalLink size={16} className="text-zinc-500 group-hover:text-white transition" />
        </a>
      </section>

      {/* Focus */}
      <section className="mb-8 rounded-2xl border border-zinc-850 bg-[#141416] p-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Специализация & Фокус
        </p>
        <div className="flex flex-wrap gap-2">
          {profile.focus.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-[13px] font-medium text-zinc-200"
            >
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Member since footer */}
      <div className="flex items-center justify-center gap-2 text-center text-[12px] font-medium tracking-wide text-zinc-400">
        <Calendar size={13} />
        <span>В дизайне с {profile.memberSince}</span>
      </div>
    </div>
  );
}
