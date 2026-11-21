import { type CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MarqueeTextProps {
  text: string;
  containerClassName?: string;
  textClassName?: string;
}

const MARQUEE_PIXELS_PER_SECOND = 28;
const MIN_MARQUEE_DURATION_SECONDS = 3.5;

/**
 * Texto em linha única que aplica fade na borda direita e desliza no hover/focus do container `.group` quando excede a largura.
 */
export function MarqueeText({
  text,
  containerClassName,
  textClassName,
}: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [overflowDistance, setOverflowDistance] = useState(0);

  /**
   * Mede o excesso horizontal do texto para ativar fade e marquee apenas quando necessário.
   */
  useEffect(() => {
    const containerElement = containerRef.current;
    const textElement = textRef.current;
    if (!containerElement || !textElement) return;

    const updateOverflow = () => {
      const distance = Math.max(
        0,
        textElement.scrollWidth - containerElement.clientWidth,
      );
      setOverflowDistance(distance);
    };

    updateOverflow();

    const resizeObserver = new ResizeObserver(updateOverflow);
    resizeObserver.observe(containerElement);
    resizeObserver.observe(textElement);

    return () => resizeObserver.disconnect();
  }, [text]);

  const hasOverflow = overflowDistance > 0;
  const marqueeDuration = Math.max(
    MIN_MARQUEE_DURATION_SECONDS,
    (overflowDistance / MARQUEE_PIXELS_PER_SECOND) * 2 + 1.5,
  );
  const marqueeStyle = hasOverflow
    ? ({
        "--marquee-distance": `-${overflowDistance + 6}px`,
        "--marquee-duration": `${marqueeDuration.toFixed(2)}s`,
      } as CSSProperties)
    : undefined;

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", containerClassName)}
      style={
        hasOverflow
          ? {
              maskImage:
                "linear-gradient(to right, black 72%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 72%, transparent 100%)",
            }
          : undefined
      }
    >
      <span
        ref={textRef}
        style={marqueeStyle}
        className={cn(
          "inline-block whitespace-nowrap",
          hasOverflow && "folder-marquee-active",
          textClassName,
        )}
      >
        {text}
      </span>
    </div>
  );
}
