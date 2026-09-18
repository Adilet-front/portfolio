"use client";

import { useState } from "react";
import { profile } from "@/content/profile";
import { InfoPanel } from "@/components/InfoPanel";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileTabs, type TabId } from "@/components/ProfileTabs";
import { WorkGrid } from "@/components/WorkGrid";

export function ProfilePage() {
  const [tab, setTab] = useState<TabId>("work");

  return (
    <main className="min-h-dvh bg-black text-white">
      <div className="mx-auto w-full max-w-[540px]">
        <ProfileHeader profile={profile} variant={tab} />
        <ProfileTabs active={tab} onChange={setTab} />
        {tab === "work" ? (
          <WorkGrid projects={profile.projects} />
        ) : (
          <InfoPanel profile={profile} />
        )}
      </div>
    </main>
  );
}
