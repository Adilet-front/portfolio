"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MapPin,
  Maximize2,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import type { Certificate, Profile } from "@/content/profile";

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

function CertificateArtwork({
  certificate,
  className = "",
}: {
  certificate: Certificate;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-white ${className}`}
      style={{ aspectRatio: `${certificate.imageWidth} / ${certificate.imageHeight}` }}
    >
      <Image
        src={certificate.image}
        alt={`Сертификат «${certificate.title}»`}
        width={certificate.imageWidth}
        height={certificate.imageHeight}
        sizes="(max-width: 768px) 78vw, 360px"
        className="block h-full w-full object-contain"
      />
    </div>
  );
}

export function InfoPanel({ profile }: { profile: Profile }) {
  const [expanded, setExpanded] = useState(false);
  const [openCertificate, setOpenCertificate] = useState<Certificate | null>(null);
  const aboutText = expanded ? profile.aboutFull : profile.about;

  useEffect(() => {
    if (!openCertificate) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenCertificate(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openCertificate]);

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

      {/* Education and certificates */}
      {profile.certificates.map((certificate) => (
        <section
          key={certificate.credentialId}
          className="mb-7 overflow-hidden rounded-2xl border border-line bg-card"
        >
          <div className="grid md:grid-cols-[minmax(230px,0.8fr)_minmax(0,1fr)]">
            <button
              type="button"
              onClick={() => setOpenCertificate(certificate)}
              title="Открыть сертификат"
              className="group flex min-h-[360px] items-center justify-center bg-surface p-5 transition hover:bg-surface-strong sm:min-h-[420px]"
            >
              <CertificateArtwork
                certificate={certificate}
                className="w-full max-w-[290px] shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition duration-300 group-hover:scale-[1.015]"
              />
            </button>

            <div className="flex flex-col justify-center p-5 sm:p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f27a32]/15 text-[#f27a32]">
                <Award size={21} />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Образование и сертификаты
              </p>
              <h2 className="mt-2 text-[22px] font-bold leading-tight text-foreground">
                {certificate.title}
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-foreground/75">
                Курс профессиональной подготовки от {certificate.issuer}
              </p>

              <dl className="mt-5 space-y-3 border-y border-line py-4 text-[13px]">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted">Дата выдачи</dt>
                  <dd className="text-right font-medium text-foreground/85">{certificate.issuedAt}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted">Номер</dt>
                  <dd className="font-mono text-[12px] font-semibold text-foreground/85">
                    {certificate.credentialId}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex items-center gap-2 text-[12px] text-emerald-500">
                <ShieldCheck size={15} />
                <span>Квалификация подтверждена сертификатом</span>
              </div>

              <button
                type="button"
                onClick={() => setOpenCertificate(certificate)}
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 text-[13px] font-semibold text-foreground transition hover:bg-surface-strong"
              >
                <Maximize2 size={15} />
                <span>Посмотреть сертификат</span>
              </button>
            </div>
          </div>
        </section>
      ))}

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

      {openCertificate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Сертификат «${openCertificate.title}»`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpenCertificate(null);
          }}
          className="fixed inset-0 z-50 flex flex-col bg-black/92 backdrop-blur-md"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4 text-white sm:px-6">
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold">{openCertificate.title}</p>
              <p className="truncate text-[11px] text-white/55">{openCertificate.issuer}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpenCertificate(null)}
              aria-label="Закрыть сертификат"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-4 sm:p-6">
            <CertificateArtwork
              certificate={openCertificate}
              className="w-[min(92vw,calc((100dvh-112px)*0.72))] shrink-0 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
