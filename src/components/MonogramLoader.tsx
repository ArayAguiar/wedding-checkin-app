//src/components/MonogramLoader.tsx

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MonogramLoaderProps {
  size?: number;
  className?: string;
  onComplete?: () => void;
  strokeDuration?: number;
  staggerDelay?: number;
  fillDuration?: number;
  fillDelay?: number;
  glowIntensity?: number;
  loop?: boolean;
  loopDelay?: number;
  autoPlay?: boolean;
  showFill?: boolean;
  isPlaying?: boolean;
}

export function MonogramLoader({
  size = 64,
  className,
  onComplete,
  strokeDuration = 800,
  staggerDelay = 150,
  fillDuration = 400,
  fillDelay = 100,
  glowIntensity = 0.3,
  loop = false,
  loopDelay = 800,
  autoPlay = true,
  showFill = true,
  isPlaying: externalPlaying,
}: MonogramLoaderProps) {
  const [phase, setPhase] = useState<"idle" | "drawing" | "filling" | "complete">("idle");
  const [internalPlaying, setInternalPlaying] = useState(autoPlay);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Use ref to always access latest startAnimation in loop timeout
  const startAnimationRef = useRef<() => void>();

  const isPlaying = externalPlaying !== undefined ? externalPlaying : internalPlaying;

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const startAnimation = useCallback(() => {
    clearAllTimers();
    setPhase("drawing");

    const drawTimer = setTimeout(() => {
      setPhase("filling");
      const fillTimer = setTimeout(() => {
        setPhase("complete");
        onComplete?.();

        if (loop && isPlaying) {
          const loopTimer = setTimeout(() => {
            startAnimationRef.current?.();
          }, loopDelay);
          timersRef.current.push(loopTimer);
        }
      }, fillDuration + fillDelay);
      timersRef.current.push(fillTimer);
    }, strokeDuration);

    timersRef.current.push(drawTimer);
  }, [strokeDuration, fillDuration, fillDelay, loop, loopDelay, isPlaying, onComplete, clearAllTimers]);

  // Keep ref in sync
  useEffect(() => {
    startAnimationRef.current = startAnimation;
  }, [startAnimation]);

  // Handle play/pause
  useEffect(() => {
    if (!isPlaying) {
      clearAllTimers();
      setPhase("idle");
      return;
    }
    startAnimation();
    return () => clearAllTimers();
  }, [isPlaying, startAnimation, clearAllTimers]);

  // Restart when params change
  useEffect(() => {
    if (isPlaying) {
      clearAllTimers();
      setPhase("idle");
      const restartTimer = setTimeout(() => startAnimationRef.current?.(), 50);
      return () => clearTimeout(restartTimer);
    }
  }, [strokeDuration, staggerDelay, fillDuration, fillDelay, glowIntensity, showFill, loop, loopDelay, isPlaying]);

  const pathC = "M244.009 96.5001C257.684 96.5001 271.56 98.4228 285.638 102.268C299.916 105.911 311.781 110.87 321.233 117.144L327.266 159.948H324.551C320.328 142.948 310.574 129.692 295.291 120.179C280.007 110.465 263.013 105.608 244.311 105.608C217.564 105.608 195.242 115.221 177.343 134.448C159.646 153.472 150.798 177.455 150.798 206.397C150.798 235.338 159.948 259.625 178.249 279.256C191.459 293.129 207.54 302.048 226.491 306.015V315.954C212.021 313.818 198.554 309.479 186.091 302.935C167.791 293.221 153.513 279.964 143.257 263.166C133.202 246.368 128.174 227.647 128.174 207.004C128.174 186.158 133.202 167.336 143.257 150.538C153.312 133.74 167.188 120.584 184.885 111.072C202.582 101.357 222.29 96.5001 244.009 96.5001Z";

  const pathF = "M380.818 329.613C380.818 325.538 379.415 322.074 376.607 319.221C374.001 316.369 370.692 314.84 366.681 314.637H270.431V393.188C270.431 398.486 272.336 403.07 276.146 406.942C279.956 410.61 284.467 412.443 289.681 412.443H293.591V415.5H227.72V412.443H231.63C236.843 412.443 241.255 410.61 244.864 406.942C248.674 403.07 250.679 398.486 250.88 393.188V222.026C250.88 217.136 248.875 213.06 244.864 209.8C241.054 206.336 236.643 204.604 231.63 204.604H228.021L227.72 201.548H315.849C324.472 201.548 332.091 200.834 338.709 199.408C345.326 197.982 349.637 196.861 351.642 196.046V230.584H348.634V225.999C348.634 221.924 347.231 218.46 344.424 215.607C341.616 212.551 338.107 211.023 333.896 211.023H270.431V305.467H366.381C370.391 305.264 373.8 303.735 376.607 300.883C379.415 298.03 380.818 294.464 380.818 290.185V285.906H383.826V334.198H380.818V329.613Z";

  const isDrawing = phase === "drawing";
  const isFilling = phase === "filling" || phase === "complete";
  const isComplete = phase === "complete";
  const glowOpacity = isComplete && showFill ? glowIntensity : 0;

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "transition-all duration-500",
          glowOpacity > 0 && "drop-shadow-[0_0_12px_hsl(var(--foreground)/0.08)]",
          "dark:drop-shadow-[0_0_12px_hsl(var(--foreground)/0.06)]"
        )}
      >
        <rect width="512" height="512" rx="256" className="fill-transparent" />
        <path
          d={pathC}
          className={cn(
            "transition-all duration-300",
            isFilling && showFill ? "fill-foreground" : "fill-transparent"
          )}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: isDrawing ? "1200" : "0",
            strokeDashoffset: isDrawing ? "0" : "1200",
            transition: `stroke-dashoffset ${strokeDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), fill-opacity ${fillDuration}ms ease ${fillDelay}ms`,
            fillOpacity: isFilling && showFill ? 1 : 0,
            filter: glowOpacity > 0 ? `drop-shadow(0 0 ${8 + glowIntensity * 12}px color-mix(in srgb, hsl(var(--foreground)) ${Math.round(glowOpacity * 15)}%, transparent))` : undefined,
          }}
        />
        <path
          d={pathF}
          className={cn(
            "transition-all duration-300",
            isFilling && showFill ? "fill-foreground" : "fill-transparent"
          )}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: isDrawing ? "1200" : "0",
            strokeDashoffset: isDrawing ? "0" : "1200",
            transition: `stroke-dashoffset ${strokeDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${staggerDelay}ms, fill-opacity ${fillDuration}ms ease ${fillDelay + staggerDelay}ms`,
            fillOpacity: isFilling && showFill ? 1 : 0,
            filter: glowOpacity > 0 ? `drop-shadow(0 0 ${8 + glowIntensity * 12}px color-mix(in srgb, hsl(var(--foreground)) ${Math.round(glowOpacity * 15)}%, transparent))` : undefined,
          }}
        />
      </svg>
    </div>
  );
}

export function FullScreenLoader({
  onComplete,
  minimumDuration = 1200,
}: {
  onComplete?: () => void;
  minimumDuration?: number;
}) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      const fadeTimer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 500);
      return () => clearTimeout(fadeTimer);
    }, minimumDuration);

    return () => clearTimeout(timer);
  }, [minimumDuration, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500",
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <MonogramLoader size={80} autoPlay onComplete={() => {}} />
    </div>
  );
}