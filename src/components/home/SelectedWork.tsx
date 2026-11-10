import React, { useState, useEffect, useCallback } from 'react';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { WorkCard } from '../work/WorkCard';
import { WorkLightbox } from '../work/WorkLightbox';
import { workItems } from '../../data/workData';

export const SelectedWork: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [videoRatios, setVideoRatios] = useState<Record<number, number>>({});
  const [activeMobileVideoId, setActiveMobileVideoId] = useState<number | null>(null);

  const openViewer = (index: number) => {
    setActiveIndex(index);
  };

  const closeViewer = () => {
    setActiveIndex(null);
  };

  const goPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === 0 ? workItems.length - 1 : current - 1;
    });
  };

  const goNext = () => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === workItems.length - 1 ? 0 : current + 1;
    });
  };

  // Track intersection ratio for each video card on mobile/touch
  const handleIntersectionRatio = useCallback((id: number, ratio: number) => {
    setVideoRatios((prev) => {
      if (prev[id] === ratio) return prev;
      return { ...prev, [id]: ratio };
    });
  }, []);

  // Determine which single video should play on mobile (~60% threshold)
  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none), (max-width: 1023px)').matches;
    if (!isTouch || activeIndex !== null) {
      setActiveMobileVideoId(null);
      return;
    }

    let dominantId: number | null = null;
    let highestRatio = 0.59; // Must be at least ~60% in view

    for (const [idStr, ratio] of Object.entries(videoRatios)) {
      const id = Number(idStr);
      if (ratio > highestRatio) {
        highestRatio = ratio;
        dominantId = id;
      }
    }

    setActiveMobileVideoId(dominantId);
  }, [videoRatios, activeIndex]);

  // Card specific desktop/tablet/mobile grid column span classes
  const getCardGridClasses = (index: number) => {
    if (index === 0) {
      // 16:9 featured video: spans 2 cols on mobile/tablet, 8 cols on desktop
      return 'col-span-2 lg:col-span-8 h-full';
    }
    if (index === 1 || index === 2) {
      // Row 1 portrait cards: 1 col on mobile/tablet, 2 cols on desktop
      return 'col-span-1 lg:col-span-2 h-full';
    }
    // Row 2 portrait cards (items 3, 4, 5, 6): 1 col on mobile/tablet, 3 cols on desktop
    return 'col-span-1 lg:col-span-3 h-full';
  };

  return (
    <>
      <section
        id="work"
        className="
          relative
          w-full
          overflow-hidden
          border-y
          border-[#CFDCED]
          bg-[#E8F0FA]
          py-10
          sm:py-12
          md:py-14
          lg:py-16
        "
        aria-labelledby="selected-work-title"
      >
        {/* Ambient subtle floating glow elements */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-24 h-[500px] w-[500px] rounded-full bg-[#1769E0]/[0.035] blur-3xl animate-float-slow"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 bottom-24 h-[440px] w-[440px] rounded-full bg-[#0B3B82]/[0.03] blur-3xl animate-float-gentle"
        />

        <Container
          size="editorial"
          className="relative z-10 px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12"
        >
          {/* ======================================================
              SECTION HEADER
          ====================================================== */}
          <Reveal delay={60} direction="up" distance={20}>
            <div
              className="
                mb-6
                flex
                flex-col
                gap-5
                border-t
                border-[#CFDCED]
                pt-4
                sm:mb-8
                sm:pt-5
                md:mb-10
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >
              <div className="min-w-0">
                <div className="mb-4 flex items-center gap-3 sm:mb-5">
                  <span className="h-px w-8 shrink-0 bg-[#1769E0]" />
                  <span
                    className="
                      font-sans
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.22em]
                      text-[#1769E0]
                      sm:text-[10px]
                    "
                  >
                    SELECTED WORK
                  </span>
                </div>

                <h2
                  id="selected-work-title"
                  className="
                    max-w-5xl
                    font-display
                    text-[clamp(2.4rem,6.4vw,6.5rem)]
                    font-extrabold
                    uppercase
                    leading-[0.88]
                    tracking-[-0.05em]
                    text-[#0B1830]
                  "
                >
                  WORK THAT
                  <br />
                  <span className="text-[#0B3B82]">
                    GETS NOTICED.
                  </span>
                </h2>
              </div>

              <div className="w-full max-w-sm lg:mb-1 lg:pb-1">
                <p
                  className="
                    font-sans
                    text-sm
                    leading-6
                    text-[#667085]
                    sm:text-base
                    sm:leading-7
                  "
                >
                  A selection of creative work and campaigns
                  created for digital and physical audiences.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ======================================================
              BENTO GRID SYSTEM
              - Mobile (<640px): 2 columns, video1 full-width (col-span-2)
              - Tablet (640-1023px): 2 columns, video1 spans 2 cols
              - Desktop (>=1024px): 12 columns bento
                Row 1: video1 (8 cols) + image1 (2 cols) + video2 (2 cols) = 12 cols
                Row 2: image2 (3 cols) + video3 (3 cols) + image3 (3 cols) + video4 (3 cols) = 12 cols
                ZERO gaps, balanced portrait/landscape ratios!
          ====================================================== */}
          <div
            className="
              grid
              w-full
              grid-cols-2
              gap-2
              xs:gap-2.5
              sm:gap-3
              md:gap-3.5
              lg:grid-cols-12
              lg:gap-3
              xl:gap-3.5
              items-stretch
            "
          >
            {workItems.map((item, index) => {
              const gridClass = getCardGridClasses(index);

              return (
                <Reveal
                  key={item.id}
                  className={gridClass}
                  delay={index * 60}
                  direction="up"
                  distance={28}
                  duration={650}
                >
                  <WorkCard
                    item={item}
                    index={index}
                    isMobileActive={activeMobileVideoId === item.id}
                    onOpen={openViewer}
                    onIntersectionRatio={handleIntersectionRatio}
                  />
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ==========================================================
          FULLSCREEN LIGHTBOX MODAL
      ========================================================== */}
      {activeIndex !== null && (
        <WorkLightbox
          items={workItems}
          activeIndex={activeIndex}
          onClose={closeViewer}
          onPrevious={goPrevious}
          onNext={goNext}
        />
      )}
    </>
  );
};

export default SelectedWork;
