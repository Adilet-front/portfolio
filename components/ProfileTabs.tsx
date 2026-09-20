"use client";

import { LayoutGrid, User } from "lucide-react";

export type TabId = "work" | "info";

type ProfileTabsProps = {
  active: TabId;
  onChange: (tab: TabId) => void;
};

export function ProfileTabs({ active, onChange }: ProfileTabsProps) {
  const tabs = [
    { id: "work" as const, label: "Работы", icon: LayoutGrid },
    { id: "info" as const, label: "Обо мне", icon: User },
  ];

  return (
    <div className="sticky top-0 z-20 flex items-center justify-center gap-8 border-b border-line bg-background/85 px-4 backdrop-blur-md lg:justify-start lg:gap-10 lg:px-0">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 px-3 py-3.5 text-[15px] font-semibold transition-colors lg:px-0 lg:py-4 ${
              isActive
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            <Icon size={16} className={`lg:hidden ${isActive ? "text-foreground" : "text-muted"}`} />
            <span>{tab.label}</span>
            {isActive && (
              <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-foreground transition-all" />
            )}
          </button>
        );
      })}
    </div>
  );
}
