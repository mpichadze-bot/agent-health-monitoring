"use client";

import { Play, SkipBack, SkipForward, Volume2, ChevronDown } from "lucide-react";

export const AudioPlayer = () => {
  return (
    <div className="bg-[#032D60] rounded-lg p-3 mt-2">
      <div className="flex items-center gap-2 mb-2">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 rounded-sm"
            style={{
              height: `${Math.random() * 20 + 4}px`,
              backgroundColor:
                i < 5
                  ? "#0176D3"
                  : i < 10
                  ? "#4BCA81"
                  : "#94A3B8",
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="text-white hover:text-gray-300" aria-label="Play" tabIndex={0}>
            <Play size={18} fill="white" />
          </button>
          <button className="text-white/70 hover:text-white text-xs" aria-label="Back 15 seconds" tabIndex={0}>
            15s
            <SkipBack size={10} className="inline ml-0.5" />
          </button>
          <button className="text-white/70 hover:text-white text-xs" aria-label="Forward 15 seconds" tabIndex={0}>
            <SkipForward size={10} className="inline mr-0.5" />
            15s
          </button>
        </div>
        <div className="flex items-center gap-3 text-white/70 text-xs">
          <span>00:00/03:24</span>
          <span className="flex items-center gap-0.5">
            1x <ChevronDown size={10} />
          </span>
          <button aria-label="Volume" tabIndex={0}>
            <Volume2 size={14} className="text-white/70" />
          </button>
        </div>
      </div>
    </div>
  );
};
