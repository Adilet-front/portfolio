"use client";

import { useState } from "react";
import { profile } from "@/content/profile";
import { DesktopProfileSidebar } from "@/components/DesktopProfileSidebar";
import { InfoPanel } from "@/components/InfoPanel";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileTabs, type TabId } from "@/components/ProfileTabs";
import { ShareButton } from "@/components/ShareButton";
import { WorkGrid } from "@/components/WorkGrid";

export function ProfilePage() {
  const [tab, setTab] = useState<TabId>("work");

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="relative hidden h-[184px] overflow-hidden border-b border-line bg-banner lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(var(--pattern)_1px,transparent_1px)] opacity-40 [background-size:18px_18px]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/35 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-[1440px] items-start justify-end px-8 py-7 xl:px-12">
          <ShareButton
            title={`${profile.name} — ${profile.role}`}
            text={profile.about}
          />
        </div>
      </div>

      <div className="mx-auto w-full lg:max-w-[1440px] lg:px-8 xl:px-12">
        <div className="lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-16">
          <div className="mx-auto w-full max-w-[540px] lg:hidden">
            <ProfileHeader profile={profile} />
          </div>

          <div className="hidden lg:-mt-[72px] lg:block">
            <DesktopProfileSidebar profile={profile} />
          </div>

          <section className="mx-auto w-full max-w-[540px] lg:mx-0 lg:max-w-none lg:pt-14">
            <ProfileTabs active={tab} onChange={setTab} />
            {tab === "work" ? (
              <WorkGrid projects={profile.projects} />
            ) : (
              <InfoPanel profile={profile} />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
