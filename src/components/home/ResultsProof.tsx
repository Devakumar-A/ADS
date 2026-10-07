import React, { useEffect, useRef, useState } from 'react';
import {
  Users,
  BarChart3,
  Megaphone,
} from 'lucide-react';

type AnimatedCounterProps = {
  target: number;
  suffix?: string;
  start: boolean;
  duration?: number;
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  start,
  duration = 1600,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      setValue(0);
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const easeOut = (progress: number) =>
      1 - Math.pow(1 - progress, 3);

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setValue(
        Math.floor(target * easeOut(progress))
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [start, target, duration]);

  return (
    <>
      {value.toLocaleString()}
      {suffix}
    </>
  );
};

export const ResultsProof: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -5% 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="AG ADS results"
      className="
        w-full
        overflow-hidden
        bg-white
      "
    >
      {/* ============================================================
          STATS CONTAINER
      ============================================================ */}
      <div
        className="
          mx-auto
          w-full
          max-w-[1700px]
          px-3
          py-5
          sm:px-5
          sm:py-6
          md:px-8
          lg:px-10
          lg:py-8
        "
      >
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[#D7E4F2]
            bg-white
            shadow-[0_10px_35px_rgba(11,59,130,0.07)]
          "
        >
          {/* ========================================================
              DESKTOP
          ======================================================== */}
          <div
            className="
              hidden
              divide-x
              divide-[#D7E4F2]
              lg:grid
              lg:grid-cols-3
            "
          >
            {/* CLIENTS */}
            <div
              className="
                flex
                items-center
                justify-center
                gap-4
                px-6
                py-5
                xl:px-10
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#C8DDF7]
                  bg-[#F7FBFF]
                  text-[#1769E0]
                "
              >
                <Users
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <div
                  className="
                    font-display
                    text-3xl
                    font-extrabold
                    leading-none
                    tracking-[-0.045em]
                    text-[#0B55C7]
                    xl:text-4xl
                  "
                >
                  <AnimatedCounter
                    target={25}
                    suffix="+"
                    start={hasEntered}
                  />
                </div>

                <div
                  className="
                    mt-1.5
                    font-sans
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#475467]
                  "
                >
                  Clients
                </div>
              </div>
            </div>

            {/* LEADS */}
            <div
              className="
                flex
                items-center
                justify-center
                gap-4
                px-6
                py-5
                xl:px-10
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#C8DDF7]
                  bg-[#F7FBFF]
                  text-[#1769E0]
                "
              >
                <BarChart3
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <div
                  className="
                    whitespace-nowrap
                    font-display
                    text-3xl
                    font-extrabold
                    leading-none
                    tracking-[-0.045em]
                    text-[#0B55C7]
                    xl:text-4xl
                  "
                >
                  <AnimatedCounter
                    target={1000}
                    suffix="+"
                    start={hasEntered}
                  />
                </div>

                <div
                  className="
                    mt-1.5
                    font-sans
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.17em]
                    text-[#475467]
                  "
                >
                  Leads Generated
                </div>
              </div>
            </div>

            {/* DIGITAL + OUTDOOR */}
            <div
              className="
                flex
                items-center
                justify-center
                gap-4
                px-6
                py-5
                xl:px-10
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#C8DDF7]
                  bg-[#F7FBFF]
                  text-[#1769E0]
                "
              >
                <Megaphone
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <div
                  className="
                    whitespace-nowrap
                    font-display
                    text-xl
                    font-extrabold
                    uppercase
                    leading-none
                    tracking-[-0.025em]
                    text-[#0B3B82]
                    xl:text-2xl
                  "
                >
                  Digital + Outdoor
                </div>

                <div
                  className="
                    mt-1.5
                    font-sans
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#475467]
                  "
                >
                  Marketing
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              MOBILE / TABLET
              SINGLE COLUMN
          ======================================================== */}
          <div
            className="
              divide-y
              divide-[#D7E4F2]
              lg:hidden
            "
          >
            {/* CLIENTS */}
            <div
              className="
                flex
                min-h-[82px]
                items-center
                gap-4
                px-5
                py-4
                sm:min-h-[92px]
                sm:px-7
                sm:py-5
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#C8DDF7]
                  bg-[#F7FBFF]
                  text-[#1769E0]
                  sm:h-12
                  sm:w-12
                "
              >
                <Users
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <div
                  className="
                    font-display
                    text-3xl
                    font-extrabold
                    leading-none
                    tracking-[-0.045em]
                    text-[#0B55C7]
                    sm:text-4xl
                  "
                >
                  <AnimatedCounter
                    target={25}
                    suffix="+"
                    start={hasEntered}
                  />
                </div>

                <div
                  className="
                    mt-1.5
                    font-sans
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#475467]
                    sm:text-[10px]
                  "
                >
                  Clients
                </div>
              </div>
            </div>

            {/* LEADS */}
            <div
              className="
                flex
                min-h-[82px]
                items-center
                gap-4
                px-5
                py-4
                sm:min-h-[92px]
                sm:px-7
                sm:py-5
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#C8DDF7]
                  bg-[#F7FBFF]
                  text-[#1769E0]
                  sm:h-12
                  sm:w-12
                "
              >
                <BarChart3
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <div
                  className="
                    whitespace-nowrap
                    font-display
                    text-3xl
                    font-extrabold
                    leading-none
                    tracking-[-0.045em]
                    text-[#0B55C7]
                    sm:text-4xl
                  "
                >
                  <AnimatedCounter
                    target={1000}
                    suffix="+"
                    start={hasEntered}
                  />
                </div>

                <div
                  className="
                    mt-1.5
                    font-sans
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.17em]
                    text-[#475467]
                    sm:text-[10px]
                  "
                >
                  Leads Generated
                </div>
              </div>
            </div>

            {/* DIGITAL + OUTDOOR */}
            <div
              className="
                flex
                min-h-[82px]
                items-center
                gap-4
                px-5
                py-4
                sm:min-h-[92px]
                sm:px-7
                sm:py-5
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#C8DDF7]
                  bg-[#F7FBFF]
                  text-[#1769E0]
                  sm:h-12
                  sm:w-12
                "
              >
                <Megaphone
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <div
                  className="
                    font-display
                    text-2xl
                    font-extrabold
                    uppercase
                    leading-none
                    tracking-[-0.025em]
                    text-[#0B3B82]
                    sm:text-3xl
                  "
                >
                  Digital + Outdoor
                </div>

                <div
                  className="
                    mt-1.5
                    font-sans
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#475467]
                    sm:text-[10px]
                  "
                >
                  Marketing
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              BOTTOM ACCENT
          ======================================================== */}
          <div
            className="
              h-[3px]
              w-full
              bg-gradient-to-r
              from-[#0B3B82]
              via-[#1769E0]
              to-[#8CCBFF]
            "
          />
        </div>
      </div>
    </section>
  );
};

export default ResultsProof;