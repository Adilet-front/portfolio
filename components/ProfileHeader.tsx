"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import type { Profile } from "@/content/profile";

type ProfileHeaderProps = {
  profile: Profile;
};

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <header className="relative pb-5 pt-0">
      {/* Banner background */}
      <div className="relative h-[130px] w-full overflow-hidden bg-gradient-to-br from-zinc-900 via-[#131316] to-[#0d0d10] border-b border-zinc-800/60">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute right-4 top-4 flex items-center gap-2 z-10">
          <ShareButton
            title={`${profile.name} — ${profile.role}`}
            text={profile.about}
          />
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
