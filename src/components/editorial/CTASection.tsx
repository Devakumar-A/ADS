import React from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export interface CTASectionProps {
  title?: string;
  subtitle?: string;
  statement?: string;
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "ONE BRAND. EVERY CHANNEL. REAL GROWTH.",
  subtitle = "PUDUCHERRY & CHENNAI",
  statement = "Partner with AG ADS to build marketing campaigns that connect your brand with the right audience and turn attention into meaningful growth.",
  className = "",
}) => {
  return (
    <section
      className={`
        relative
        overflow-hidden
        bg-[#061B3D]
        py-16
        sm:py-20
        md:py-24
        lg:py-28
        text-white
        ${className}
      `}
    >
      {/* ============================================================
          BACKGROUND GRID
      ============================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              #ffffff 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              #ffffff 1px,
              transparent 1px
            )
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ============================================================
          AMBIENT GLOW
      ============================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[180px]
          -top-[180px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#1769E0]/20
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[220px]
          bottom-[-220px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#1769E0]/10
          blur-[120px]
        "
      />

      <Container
        size="default"
        className="
          relative
          z-10
          px-5
          sm:px-8
          md:px-10
          lg:px-12
        "
      >
        {/* ==========================================================
            TOP LABEL
        =========================================================== */}

        <Reveal
          delay={50}
          direction="up"
          distance={20}
        >
          <div
            className="
              mb-8
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span
              className="
                h-px
                w-8
                bg-[#4EA1FF]
                sm:w-12
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.24em]
                text-[#8CCBFF]
                sm:text-xs
              "
            >
              LET&apos;S GROW TOGETHER
            </span>

            <span
              className="
                h-px
                w-8
                bg-[#4EA1FF]
                sm:w-12
              "
            />
          </div>
        </Reveal>

        {/* ==========================================================
            MAIN HEADING
        =========================================================== */}

        <Reveal
          delay={120}
          direction="up"
          distance={35}
        >
          <div className="mx-auto max-w-[1100px] text-center">
            <h2
              className="
                font-[Manrope]
                text-[clamp(3rem,8vw,7.5rem)]
                font-extrabold
                uppercase
                leading-[0.86]
                tracking-[-0.065em]
                text-white
              "
            >
              {title}
            </h2>
          </div>
        </Reveal>

        {/* ==========================================================
            STATEMENT
        =========================================================== */}

        <Reveal
          delay={200}
          direction="up"
          distance={25}
        >
          <p
            className="
              mx-auto
              mt-7
              max-w-[680px]
              text-center
              text-sm
              leading-6
              text-white/55

              sm:mt-8
              sm:text-base
              sm:leading-7

              md:text-lg
              md:leading-8
            "
          >
            {statement}
          </p>
        </Reveal>

        {/* ==========================================================
            ACTIONS
        =========================================================== */}

        <Reveal
          delay={280}
          direction="up"
          distance={25}
        >
          <div
            className="
              mt-9
              flex
              flex-col
              items-center
              justify-center
              gap-3

              sm:mt-10
              sm:flex-row
              sm:gap-4
            "
          >
            <Button
              to="/contact"
              variant="white"
              size="lg"
              icon={true}
              className="
                w-full
                sm:w-auto
                !border-white
              "
            >
              Start a Project
            </Button>

            <Button
              to="/work"
              variant="outline"
              size="lg"
              className="
                w-full
                sm:w-auto
                !border-white/25
                !bg-transparent
                !text-white
                hover:!border-white
                hover:!bg-white/10
                hover:!text-white
              "
            >
              Explore Our Work
            </Button>
          </div>
        </Reveal>

        {/* ==========================================================
            LOCATION STRIP
        =========================================================== */}

        <Reveal
          delay={350}
          direction="up"
          distance={25}
        >
          <div
            className="
              mx-auto
              mt-14
              max-w-[1000px]
              border-t
              border-white/10
              pt-7

              sm:mt-16
              sm:pt-8
            "
          >
            <div
              className="
                grid
                grid-cols-1
                gap-5

                sm:grid-cols-2
                sm:gap-0
              "
            >
              {/* Puducherry */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  text-center

                  sm:border-r
                  sm:border-white/10
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/[0.06]
                  "
                >
                  <MapPin
                    className="h-4 w-4 text-[#8CCBFF]"
                    strokeWidth={1.6}
                  />
                </span>

                <div className="text-left">
                  <span
                    className="
                      block
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-white/35
                    "
                  >
                    Based In
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    Puducherry
                  </span>
                </div>
              </div>

              {/* Chennai */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  text-center
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/[0.06]
                  "
                >
                  <MapPin
                    className="h-4 w-4 text-[#8CCBFF]"
                    strokeWidth={1.6}
                  />
                </span>

                <div className="text-left">
                  <span
                    className="
                      block
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-white/35
                    "
                  >
                    Also In
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    Chennai
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ==========================================================
            CONTACT ROW
        =========================================================== */}

        <Reveal
          delay={420}
          direction="up"
          distance={20}
        >
          <div
            className="
              mt-7
              flex
              flex-col
              items-center
              justify-center
              gap-3
              text-center

              sm:flex-row
              sm:gap-6
            "
          >
            <a
              href="tel:6369846324"
              className="
                group
                inline-flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-white/45
                transition-colors
                duration-200
                hover:text-white
              "
            >
              <span>6369846324</span>

              <ArrowUpRight
                className="
                  h-3.5
                  w-3.5
                  text-[#4EA1FF]
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
                strokeWidth={1.6}
              />
            </a>

            <span
              className="
                hidden
                text-white/15
                sm:block
              "
            >
              •
            </span>

            <a
              href="https://instagram.com/ag.ads.pondy"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-white/45
                transition-colors
                duration-200
                hover:text-white
              "
            >
              <span>@ag.ads.pondy</span>

              <ArrowUpRight
                className="
                  h-3.5
                  w-3.5
                  text-[#4EA1FF]
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
                strokeWidth={1.6}
              />
            </a>
          </div>
        </Reveal>

        {/* ==========================================================
            BOTTOM ACCENT
        =========================================================== */}

        <Reveal
          delay={500}
          direction="up"
          distance={20}
        >
          <div
            aria-hidden="true"
            className="
              mx-auto
              mt-12
              h-px
              w-16
              bg-gradient-to-r
              from-transparent
              via-[#4EA1FF]
              to-transparent

              sm:mt-14
            "
          />
        </Reveal>
      </Container>
    </section>
  );
};

export default CTASection;