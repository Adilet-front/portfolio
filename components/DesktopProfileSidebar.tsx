import Image from "next/image";
import { CheckCircle2, MapPin, Send, Sparkles } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import type { Profile } from "@/content/profile";

type DesktopProfileSidebarProps = {
  profile: Profile;
};

export function DesktopProfileSidebar({ profile }: DesktopProfileSidebarProps) {
  return (
    <aside className="sticky top-6 pb-16">
      <div className="relative h-[144px] w-[144px] overflow-hidden rounded-full border-4 border-background bg-surface shadow-2xl ring-1 ring-line">
        <Image
          src={profile.avatar}
          alt={profile.name}
          fill
          sizes="144px"
          className="object-cover object-[center_30%]"
          priority
        />
      </div>

      <div className="mt-6 border-b border-line pb-7">
        <h1 className="text-[30px] font-bold leading-tight text-foreground">
          {profile.name}
        </h1>

        <div className="mt-4 space-y-2.5 text-[14px] text-foreground/80">
          <p className="flex items-center gap-2.5">
            <Sparkles size={16} className="shrink-0 text-amber-400" />
            <span>{profile.role}</span>
          </p>
          <p className="flex items-center gap-2.5">
            <MapPin size={16} className="shrink-0 text-muted" />
            <span>{profile.location}</span>
          </p>
        </div>

        <p className="mt-5 text-[14px] leading-6 text-muted">
          {profile.aboutShort}
        </p>
      </div>

      <div className="space-y-2.5 border-b border-line py-6">
        <a
          href={profile.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-[14px] font-semibold text-background transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Send size={16} />
          Обсудить проект
        </a>
        <ShareButton
          className="!h-12 w-full justify-center !rounded-lg !border-line !bg-card !text-[14px] hover:!bg-surface"
          title={profile.shareTitle}
          text={profile.shareText}
        />
      </div>

      <div className="pt-6">
        <p className="text-[11px] font-semibold uppercase text-muted">
          Специализация
        </p>
        <div className="mt-4 space-y-3">
          {profile.focus.map((item) => (
            <p key={item} className="flex items-center gap-2.5 text-[13px] text-foreground/80">
              <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
              <span>{item}</span>
            </p>
          ))}
        </div>
      </div>
    </aside>
  );
}
