import React, { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  scrollByPx?: number;
};

const HorizontalScroller = ({ children, className = "", scrollByPx }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const updateButtons = () => {
    const el = containerRef.current;
    if (!el) return;
    const overflow = el.scrollWidth > el.clientWidth + 1;
    setIsOverflowing(overflow);
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth + 1 < el.scrollWidth);
  };

  useEffect(() => {
    // measure after layout using rAF to ensure children sizes are applied
    const measure = () => {
      updateButtons();
    };
    const raf = requestAnimationFrame(measure);

    const el = containerRef.current;
    if (!el) {
      cancelAnimationFrame(raf);
      return;
    }

    const onScroll = () => updateButtons();
    const onResize = () => updateButtons();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // also re-measure when images/fonts load in case width changes
    const imgs = Array.from(el.querySelectorAll("img"));
    const imgListeners: Array<() => void> = [];
    imgs.forEach((img) => {
      // if already loaded, skip
      if ((img as HTMLImageElement).complete) return;
      const onLoad = () => requestAnimationFrame(updateButtons);
      img.addEventListener("load", onLoad);
      imgListeners.push(() => img.removeEventListener("load", onLoad));
    });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      imgListeners.forEach((rm) => rm());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doScroll = (dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = scrollByPx ?? Math.round(el.clientWidth * 0.7);
    const target = dir === "left" ? el.scrollLeft - amount : el.scrollLeft + amount;
    el.scrollTo({ left: target, behavior: "smooth" });
    // optimistic measurement after scroll starts
    requestAnimationFrame(updateButtons);
  };

  if (!children) return null;

  return (
    <div className="relative w-full group">
      {/* Vignette overlays only when there's overflow */}
      {isOverflowing && (
        <>
          
      {/* Left vignette: appears only when left scroll is possible */}
      {canScrollLeft && (
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10">
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(17,24,39,0.94) 0%, rgba(17,24,39,0.6) 30%, rgba(17,24,39,0.2) 60%, transparent 100%)",
            }}
          />
        </div>
      )}

      {/* Right vignette: appears only when right scroll is possible */}
      {canScrollRight && (
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10">
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(270deg, rgba(17,24,39,0.94) 0%, rgba(17,24,39,0.6) 30%, rgba(17,24,39,0.2) 60%, transparent 100%)",
            }}
          />
        </div>
      )}
        </>
      )}

      {/* Left arrow - appears only when hovering and when left scroll is possible */}
      <button
        aria-hidden={!canScrollLeft}
        onClick={() => doScroll("left")}
        title="Scroll left"
        className={
          "absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 bg-gray-800/60 hover:bg-gray-700 hover:scale-110 active:scale-90 " +
          (canScrollLeft ? "opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto" : "opacity-0 pointer-events-none")
        }
      >
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 6 L9 12 L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        aria-hidden={!canScrollRight}
        onClick={() => doScroll("right")}
        title="Scroll right"
        className={
          "absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 bg-gray-800/60 hover:bg-gray-700 hover:scale-110 active:scale-90 " +
          (canScrollRight ? "opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto" : "opacity-0 pointer-events-none")
        }
      >
        <svg className="w-4 h-4 text-white rotate-180" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 6 L9 12 L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Scrollable area (native scrollbar hidden via CSS class) */}
      <div
        ref={containerRef}
        className={`overflow-x-auto overflow-y-hidden hide-scrollbar ${className}`}
        style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none" }}
      >
        <div className="flex items-start gap-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroller;