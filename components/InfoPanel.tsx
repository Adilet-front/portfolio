"use client";

import { useState } from "react";
import { MapPin, Send, ExternalLink, Calendar, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import type { Profile } from "@/content/profile";

function SkillSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-7 rounded-2xl border border-line bg-card p-4">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        {title}
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[14px] leading-5 text-foreground/85">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function InfoPanel({ profile }: { profile: Profile }) {
  const [expanded, setExpanded] = useState(false);
  const aboutText = expanded ? profile.aboutFull : profile.about;

  // Clean and robust Telegram URL: https://t.me/username
  const username = (profile.telegram || "@koooki0").replace(/^@+/, "");
  const telegramHref = `https://t.me/${username}`;
  const telegramDisplay = `@${username}`;

  return (
    <div className="px-5 pb-20 pt-6 animate-in fade-in duration-200 lg:max-w-[860px] lg:px-0 lg:pt-8">
      {/* Location */}
      <section className="mb-7 rounded-2xl border border-line bg-card p-4">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          Локация
        </p>
        <p className="flex items-center gap-2 text-[15px] font-medium text-foreground">
          <MapPin size={17} className="text-muted" />
          <span>{profile.location}</span>
        </p>
      </section>

      {/* About */}
      <section className="mb-7 rounded-2xl border border-line bg-card p-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          О себе
        </p>
        <p className="whitespace-pre-line text-[14px] leading-relaxed text-foreground/85">
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

      <SkillSection title="Мои сильные качества" items={profile.strengths} />
      <SkillSection title="Профессиональные навыки" items={profile.professionalSkills} />
      <SkillSection title="Личные навыки" items={profile.personalSkills} />

      {/* Contact / Links */}
      <section className="mb-7 rounded-2xl border border-line bg-card p-4">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          Связь / Telegram
        </p>
        <div className="space-y-2.5">
          <a
            href={telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3.5 text-[14px] font-medium text-foreground hover:border-[#229ED9]/70 hover:bg-[#229ED9]/15 transition"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#229ED9]/20 text-[#229ED9] group-hover:bg-[#229ED9] group-hover:text-white transition">
                <Send size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[15px] font-semibold text-foreground tracking-wide">
                  {telegramDisplay}
                </span>
                <span className="text-[11px] text-muted">
                  Написать в Telegram
                </span>
              </div>
            </div>
            <ExternalLink size={16} className="text-muted group-hover:text-foreground transition" />
          </a>

          <div className="pt-0.5">
            <ShareButton
              className="w-full justify-center !rounded-xl !border-line !bg-surface !py-3 text-[14px] hover:!bg-surface-strong"
              title={profile.shareTitle}
              text={profile.shareText}
            />
          </div>
        </div>
      </section>

      {/* Member since footer */}
      <div className="flex items-center justify-center gap-2 text-center text-[12px] font-medium tracking-wide text-muted">
        <Calendar size={13} />
        <span>В дизайне с {profile.memberSince}</span>
      </div>
    </div>
  );
}
