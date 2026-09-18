"use client";

import Image from "next/image";
import { Send, Sparkles } from "lucide-react";
import type { Profile } from "@/content/profile";
import type { TabId } from "@/components/ProfileTabs";

type ProfileHeaderProps = {
  profile: Profile;
  variant: TabId;
};

export function ProfileHeader({ profile, variant }: ProfileHeaderProps) {
  if (variant === "info") {
    return (
      <header className="relative flex items-center justify-between gap-3 px-4 pb-4 pt-5 border-b border-zinc-900">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-zinc-700 bg-zinc-800">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-[17px] font-semibold tracking-tight text-white">
              {profile.name}
            </h1>
            <p className="truncate text-[12px] text-zinc-400">
              {profile.role}
            </p>
          </div>
        </div>

        <a
          href={profile.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800/80 text-zinc-300 hover:bg-[#229ED9] hover:text-white transition"
          title="Написать в Telegram"
        >
          <Send size={15} />
        </a>
      </header>
    );
  }

  return (
    <header className="relative pb-5 pt-0">
      {/* Banner background */}
      <div className="relative h-[130px] w-full overflow-hidden bg-gradient-to-br from-zinc-900 via-[#131316] to-[#0d0d10] border-b border-zinc-800/60">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <a
            href={profile.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[12px] font-medium text-zinc-200 backdrop-blur-md border border-white/10 hover:bg-[#229ED9] hover:border-transparent hover:text-white transition"
          >
            <Send size={13} />
            <span>Telegram</span>
          </a>
        </div>
      </div>

      {/* Profile info section */}
      <div className="relative -mt-14 flex flex-col items-center px-4">
        <div className="relative h-[110px] w-[110px] overflow-hidden rounded-full border-[3.5px] border-black bg-zinc-800 shadow-xl ring-1 ring-zinc-800">
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            sizes="110px"
            className="object-cover"
            priority
          />
        </div>

        <h1 className="mt-3 text-center text-[22px] font-bold tracking-tight text-white">
          {profile.name}
        </h1>

        <div className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-zinc-400">
          <Sparkles size={13} className="text-amber-400" />
          <span>{profile.role}</span>
        </div>

        <p className="mt-1 text-center text-[12px] text-zinc-400">
          {profile.location}
        </p>
      </div>
    </header>
  );
}
