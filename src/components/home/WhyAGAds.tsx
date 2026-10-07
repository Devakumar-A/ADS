import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const cards = [
  {
    number: "01",
    title: "BUILD STRONGER",
    accent: "BRANDS",
    description:
      "Build a stronger brand presence that people remember.",
    type: "light" as const,
  },
  {
    number: "02",
    title: "REACH THE RIGHT",
    accent: "AUDIENCE",
    description:
      "Connect your brand with the people who matter most.",
    type: "dark" as const,
  },
  {
    number: "03",
    title: "MEASURE REAL",
    accent: "GROWTH",
    description:
      "Turn attention into measurable business growth.",
    type: "light" as const,
  },
];

type CardPosition = "left" | "center" | "right";

export default function WhyAGAds() {
  /*
   * The currently active/front card.
   *
   * 0 = 01
   * 1 = 02
   * 2 = 03
   */
  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * Automatic card movement.
   *
   * Every 4 seconds:
   * 01 → 02 → 03 → 01
   *
   * Because the positions are calculated from activeIndex,
   * the 03 → 01 transition remains a smooth deck rotation.
   */
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => {
        return (current + 1) % cards.length;
      });
    }, 4000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /*
   * Manual card movement.
   *
   * Useful for mobile tap interaction.
   */
  const moveForward = () => {
    setActiveIndex((current) => {
      return (current + 1) % cards.length;
    });
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        py-16
        sm:py-20
        md:py-24
        lg:py-28
      "
    >
      {/* ============================================================
          BACKGROUND ATMOSPHERE
      ============================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#1769E0]/[0.035]
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/3
          h-[300px]
          w-[300px]
          rounded-full
          bg-[#0B3B82]/[0.025]
          blur-[90px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-10
          h-[300px]
          w-[300px]
          rounded-full
          bg-[#1769E0]/[0.025]
          blur-[90px]
        "
      />

      <Container
        size="editorial"
        className="
          relative
          z-10
          px-4
          xs:px-5
          sm:px-6
          md:px-8
          lg:px-12
        "
      >
        {/* ==========================================================
            SECTION INTRO
        =========================================================== */}

        <Reveal
          delay={60}
          direction="up"
          distance={18}
        >
          <div
            className="
              mb-12
              flex
              items-end
              justify-between
              border-b
              border-[#E4EAF2]
              pb-5
              sm:mb-16
              lg:mb-20
            "
          >
            <div>
              {/* Label */}
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="
                    h-[2px]
                    w-10
                    bg-[#1769E0]
                    sm:w-14
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#1769E0]
                    sm:text-xs
                  "
                >
                  ABOUT AG ADS
                </span>
              </div>

              {/* Main heading */}
              <h2
                className="
                  max-w-[850px]
                  font-[Manrope]
                  text-[clamp(2.7rem,6vw,6rem)]
                  font-extrabold
                  uppercase
                  leading-[0.86]
                  tracking-[-0.055em]
                  text-[#0B1830]
                "
              >
                ONE BRAND.
                <br />

                EVERY CHANNEL.
                <br />

                <span className="text-[#1769E0]">
                  REAL GROWTH.
                </span>
              </h2>
            </div>

            {/* Desktop description */}
            <p
              className="
                hidden
                max-w-[300px]
                pb-1
                text-sm
                leading-6
                text-[#667085]
                lg:block
              "
            >
              AG ADS brings digital advertising, creative
              content, branding and offline media together
              around meaningful growth.
            </p>
          </div>
        </Reveal>

        {/* ==========================================================
            MOBILE DESCRIPTION
        =========================================================== */}

        <Reveal
          delay={100}
          direction="up"
          distance={18}
        >
          <p
            className="
              mb-10
              max-w-[650px]
              text-sm
              leading-6
              text-[#667085]
              sm:text-base
              sm:leading-7
              lg:hidden
            "
          >
            AG ADS is a growth-focused marketing agency
            helping businesses build stronger brands, reach
            the right audience, and turn attention into
            measurable results.
          </p>
        </Reveal>

        {/* ==========================================================
            3D CARD DECK
        =========================================================== */}

        <Reveal
          delay={160}
          direction="up"
          distance={30}
        >
          <div
            className="
              relative
              mx-auto
              h-[430px]
              w-full
              max-w-[1200px]
              cursor-pointer
              select-none
              [perspective:1800px]

              sm:h-[470px]

              md:h-[500px]
            "
            onClick={moveForward}
            role="button"
            tabIndex={0}
            aria-label="Explore AG ADS growth principles"
            onKeyDown={(event) => {
              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();
                moveForward();
              }
            }}
          >
            {cards.map((card, index) => {
              const position = getCardPosition(
                index,
                activeIndex
              );

              return (
                <div
                  key={card.number}
                  className={`
                    absolute
                    top-1/2
                    [transform-style:preserve-3d]
                    transition-all
                    duration-[1100ms]
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    ${getCardPositionClasses(position)}
                  `}
                >
                  {/* ==================================================
                      CARD
                  =================================================== */}

                  <div
                    className={`
                      relative
                      h-[350px]
                      w-full
                      overflow-hidden
                      rounded-[30px]
                      border
                      p-7
                      shadow-[0_30px_80px_rgba(11,59,130,0.18)]

                      sm:h-[390px]
                      sm:rounded-[34px]
                      sm:p-9

                      md:h-[420px]
                      md:p-10

                      ${
                        card.type === "dark"
                          ? `
                            border-[#4E8ED5]
                            bg-[#0B3B82]
                            text-white
                          `
                          : `
                            border-[#C9DCF2]
                            bg-white
                            text-[#0B1830]
                          `
                      }
                    `}
                  >
                    {/* =================================================
                        CARD GLOW
                    ================================================== */}

                    <div
                      className={`
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-64
                        w-64
                        rounded-full
                        blur-[80px]

                        ${
                          card.type === "dark"
                            ? "bg-[#4EA1FF]/30"
                            : "bg-[#1769E0]/[0.08]"
                        }
                      `}
                    />

                    {/* =================================================
                        DECORATIVE RINGS — CENTER CARD
                    ================================================== */}

                    {card.type === "dark" && (
                      <>
                        <div
                          className="
                            pointer-events-none
                            absolute
                            -right-24
                            top-[30%]
                            h-64
                            w-64
                            rounded-full
                            border
                            border-white/10
                          "
                        />

                        <div
                          className="
                            pointer-events-none
                            absolute
                            -right-10
                            top-[37%]
                            h-48
                            w-48
                            rounded-full
                            border
                            border-white/10
                          "
                        />

                        <div
                          className="
                            pointer-events-none
                            absolute
                            -right-1
                            top-[44%]
                            h-32
                            w-32
                            rounded-full
                            border
                            border-white/10
                          "
                        />
                      </>
                    )}

                    {/* =================================================
                        TOP ROW
                    ================================================== */}

                    <div
                      className="
                        relative
                        z-10
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <span
                        className={`
                          font-[Manrope]
                          text-sm
                          font-bold
                          tracking-[0.12em]

                          ${
                            card.type === "dark"
                              ? "text-white/75"
                              : "text-[#1769E0]"
                          }
                        `}
                      >
                        {card.number}
                      </span>

                      <ArrowUpRight
                        className={`
                          h-5
                          w-5

                          ${
                            card.type === "dark"
                              ? "text-white"
                              : "text-[#1769E0]"
                          }
                        `}
                        strokeWidth={1.6}
                      />
                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================== */}

                    <div
                      className="
                        relative
                        z-10
                        mt-24

                        sm:mt-28
                      "
                    >
                      {/* Center card label */}
                      {card.number === "02" && (
                        <p
                          className="
                            mb-4
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-[#8CCBFF]
                            sm:text-[10px]
                          "
                        >
                          THE RIGHT CONNECTION
                        </p>
                      )}

                      <h3
                        className={`
                          font-[Manrope]
                          text-[clamp(2rem,5vw,3.4rem)]
                          font-extrabold
                          uppercase
                          leading-[0.88]
                          tracking-[-0.05em]

                          ${
                            card.type === "dark"
                              ? "text-white"
                              : "text-[#0B1830]"
                          }
                        `}
                      >
                        {card.title}

                        <br />

                        <span
                          className={
                            card.type === "dark"
                              ? "text-[#8CCBFF]"
                              : "text-[#1769E0]"
                          }
                        >
                          {card.accent}
                        </span>
                      </h3>

                      <p
                        className={`
                          mt-6
                          max-w-[320px]
                          text-sm
                          leading-6

                          ${
                            card.type === "dark"
                              ? "text-white/65"
                              : "text-[#667085]"
                          }
                        `}
                      >
                        {card.description}
                      </p>
                    </div>

                    {/* =================================================
                        BOTTOM DETAIL
                    ================================================== */}

                    <div
                      className={`
                        absolute
                        bottom-8
                        left-8
                        right-8
                        h-px

                        ${
                          card.type === "dark"
                            ? "bg-white/15"
                            : "bg-[#D8E5F3]"
                        }
                      `}
                    />

                    <div
                      className={`
                        absolute
                        bottom-[27px]
                        right-8
                        h-2
                        w-2
                        rounded-full

                        ${
                          card.type === "dark"
                            ? `
                              bg-[#8CCBFF]
                              shadow-[0_0_20px_rgba(140,203,255,0.9)]
                            `
                            : "bg-[#1769E0]"
                        }
                      `}
                    />

                    {/* =================================================
                        SIDE CURVE
                    ================================================== */}

                    {card.type === "light" && (
                      <div
                        className="
                          pointer-events-none
                          absolute
                          -bottom-20
                          -left-10
                          h-36
                          w-[130%]
                          rounded-[50%]
                          border-t
                          border-[#1769E0]/20
                        "
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ==========================================================
            ACTIVE CARD INDICATOR
        =========================================================== */}

        <Reveal
          delay={300}
          direction="up"
          distance={15}
        >
          <div
            className="
              mt-2
              flex
              flex-col
              items-center
              justify-center
              gap-3
              sm:mt-4
            "
          >
            <div className="flex items-center gap-2">
              {cards.map((card, index) => (
                <button
                  key={card.number}
                  type="button"
                  aria-label={`Show card ${card.number}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveIndex(index);
                  }}
                  className="
                    rounded-full
                    p-1
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#1769E0]/30
                  "
                >
                  <span
                    className={`
                      block
                      h-1.5
                      rounded-full
                      transition-all
                      duration-500

                      ${
                        index === activeIndex
                          ? "w-8 bg-[#1769E0]"
                          : "w-1.5 bg-[#C7D8EA]"
                      }
                    `}
                  />
                </button>
              ))}
            </div>

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#98A2B3]
              "
            >
              TAP TO EXPLORE
            </span>
          </div>
        </Reveal>

        {/* ==========================================================
            SIGNATURE
        =========================================================== */}

      
      </Container>
    </section>
  );
}

/* ================================================================
   DETERMINE WHERE EACH CARD BELONGS IN THE DECK

   activeIndex = 0

   01 → CENTER
   02 → RIGHT
   03 → LEFT

   activeIndex = 1

   02 → CENTER
   03 → RIGHT
   01 → LEFT

   activeIndex = 2

   03 → CENTER
   01 → RIGHT
   02 → LEFT

   This is what prevents the 03 → 01 jump.
================================================================ */

function getCardPosition(
  cardIndex: number,
  activeIndex: number
): CardPosition {
  const relative =
    (cardIndex - activeIndex + cards.length) %
    cards.length;

  if (relative === 0) {
    return "center";
  }

  if (relative === 1) {
    return "right";
  }

  return "left";
}

/* ================================================================
   RESPONSIVE 3D POSITION CLASSES
================================================================ */

function getCardPositionClasses(
  position: CardPosition
) {
  switch (position) {
    /* ============================================================
       CENTER
    ============================================================ */

    case "center":
      return `
        left-1/2
        z-30
        w-[76%]
        max-w-[420px]
        -translate-x-1/2
        -translate-y-1/2
        scale-100
        rotate-y-0
        opacity-100

        sm:w-[68%]

        md:w-[39%]
        md:max-w-none
      `;

    /* ============================================================
       RIGHT
    ============================================================ */

    case "right":
      return `
        left-1/2
        z-10
        w-[76%]
        max-w-[420px]
        -translate-y-1/2
        translate-x-[8%]
        scale-[0.82]
        rotate-y-[-14deg]
        opacity-[0.88]

        sm:w-[68%]
        sm:translate-x-[12%]
        sm:scale-[0.86]

        md:left-auto
        md:right-[3%]
        md:w-[31%]
        md:max-w-none
        md:translate-x-0
        md:scale-[0.88]
      `;

    /* ============================================================
       LEFT
    ============================================================ */

    case "left":
      return `
        left-1/2
        z-10
        w-[76%]
        max-w-[420px]
        -translate-x-[108%]
        -translate-y-1/2
        scale-[0.82]
        rotate-y-[14deg]
        opacity-[0.88]

        sm:w-[68%]
        sm:-translate-x-[105%]
        sm:scale-[0.86]

        md:left-[3%]
        md:w-[31%]
        md:max-w-none
        md:translate-x-0
        md:scale-[0.88]
      `;

    default:
      return "";
  }
}