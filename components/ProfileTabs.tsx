"use client";

import { LayoutGrid, User } from "lucide-react";

export type TabId = "work" | "info";

type ProfileTabsProps = {
  active: TabId;
  onChange: (tab: TabId) => void;
};

export function ProfileTabs({ active, onChange }: ProfileTabsProps) {
  const tabs = [
    { id: "work" as const, label: "Work", icon: LayoutGrid },
    { id: "info" as const, label: "Info", icon: User },
  ];

  return (
    <div className="sticky top-0 z-20 flex items-center justify-center gap-8 border-b border-zinc-900 bg-black/80 px-4 backdrop-blur-md">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 px-3 py-3.5 text-[15px] font-semibold transition-colors ${
              isActive
                ? "text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Icon size={16} className={isActive ? "text-white" : "text-zinc-500"} />
            <span>{tab.label}</span>
            {isActive && (
              <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-white transition-all" />
            )}
          </button>
        );
      })}
    </div>
  );
}
