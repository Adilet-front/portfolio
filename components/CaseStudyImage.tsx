"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, ImageOff } from "lucide-react";
import type { ProjectImage } from "@/content/profile";

type CaseStudyImageProps = {
  image: ProjectImage;
  eager?: boolean;
};

export function CaseStudyImage({ image, eager = false }: CaseStudyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [useRawSource, setUseRawSource] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    setLoaded(false);

    if (!useRawSource) {
      setUseRawSource(true);
      return;
    }

    setFailed(true);
  };

  if (failed) {
    return (
      <div
        className="flex min-h-56 flex-col items-center justify-center gap-3 bg-surface p-6 text-center text-muted"
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
        role="status"
      >
        <ImageOff size={24} />
        <p className="text-[13px]">Не удалось загрузить изображение</p>
        <a
          href={image.src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-blue-400 hover:text-blue-300"
        >
          Открыть оригинал
          <ExternalLink size={13} />
        </a>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden bg-surface-strong"
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-surface via-surface-strong to-surface" />
      )}
      <Image
        key={useRawSource ? "raw" : "optimized"}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 767px) calc(100vw - 32px), 672px"
        loading={eager ? "eager" : "lazy"}
        unoptimized={useRawSource}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`block h-auto w-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
