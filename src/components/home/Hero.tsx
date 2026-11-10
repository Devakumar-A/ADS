import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero: React.FC = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="
        relative isolate w-full overflow-hidden
        bg-[#F7FAFF]
        min-h-[780px]
        sm:min-h-[820px]
        md:min-h-[680px]
        lg:min-h-[720px]
        xl:min-h-[760px]
        2xl:min-h-[820px]
      "
    >
      {/* =========================================================
          DESKTOP / TABLET BACKGROUND
          ========================================================= */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-0
          hidden md:block
          overflow-hidden
        "
      >
        <img
          src="/assets/hero/AG_Desktop.webp"
          alt="AG ADS Marketing & Advertising"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="
            absolute inset-0
            h-full w-full
            object-cover
            object-center
            select-none
          "
        />

        {/* Soft readability gradient */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-white/95
            via-white/55
            to-transparent
          "
        />

        {/* Bottom blending */}
        <div
          className="
            absolute inset-x-0 bottom-0
            h-32
            bg-gradient-to-t
            from-[#F7FAFF]/90
            to-transparent
          "
        />
      </div>

      {/* =========================================================
          MOBILE BACKGROUND
          ========================================================= */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-0
          md:hidden
          overflow-hidden
        "
      >
        <img
          src="/assets/hero/AG_Mobile.webp"
          alt="AG ADS Marketing & Advertising"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="
            absolute inset-0
            h-full w-full
            object-cover
            object-center
            select-none
          "
        />

        {/* Protect the headline area */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-b
            from-white/96
            via-white/82
            via-[42%]
            to-white/10
          "
        />

        {/* Bottom visual blending */}
        <div
          className="
            absolute inset-x-0 bottom-0
            h-36
            bg-gradient-to-t
            from-[#F7FAFF]/80
            to-transparent
          "
        />
      </div>

      {/* =========================================================
          MAIN CONTENT
          ========================================================= */}
      <div
        className="
          relative z-10
          mx-auto
          flex min-h-[inherit]
          w-full max-w-[1600px]
          flex-col
          px-5
          sm:px-8
          md:px-10
          lg:px-14
          xl:px-20
          2xl:px-24
        "
      >
        {/* =======================================================
            CONTENT AREA
            ======================================================= */}
        <div
          className="
            flex flex-1
            items-start
            pt-12
            sm:pt-16
            md:pt-24
            lg:pt-28
            xl:pt-32
            2xl:pt-36
          "
        >
          <div
            className="
              w-full
              max-w-[580px]

              md:max-w-[510px]
              lg:max-w-[570px]
              xl:max-w-[630px]
              2xl:max-w-[680px]
            "
          >
            {/* =================================================
                EYEBROW
                ================================================= */}
            <div
              className="
                mb-5
                flex items-center gap-3

                sm:mb-6
                md:mb-7
                lg:mb-8
              "
            >
              <span
                className="
                  h-[2px]
                  w-8
                  shrink-0
                  bg-[#1769E0]

                  sm:w-10
                  lg:w-12
                "
              />

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#36557F]

                  sm:text-[10px]
                  md:text-[11px]
                  lg:text-xs
                "
              >
                Digital Marketing Agency
              </span>
            </div>

            {/* =================================================
                MAIN HEADING
                ================================================= */}
            <h1
              id="hero-heading"
              className="
                font-display
                font-extrabold
                uppercase
                text-[#071735]
                tracking-[-0.055em]
                leading-[0.91]

                text-[clamp(2.8rem,12vw,4.25rem)]

                sm:text-[clamp(3.4rem,9vw,5rem)]

                md:text-[clamp(3rem,5.2vw,4.4rem)]

                lg:text-[clamp(3.5rem,4.6vw,5.2rem)]

                xl:text-[clamp(4rem,4.5vw,5.8rem)]

                2xl:text-[clamp(4.5rem,4.3vw,6.3rem)]
              "
            >
              <span className="block">
                BUILD YOUR
              </span>

              <span className="block text-[#1769E0]">
                BRAND.
              </span>

              <span className="block">
                DRIVE YOUR
              </span>

              <span className="block text-[#1769E0]">
                GROWTH.
              </span>
            </h1>

            {/* =================================================
                DESCRIPTION
                ================================================= */}
            <p
              className="
                mt-6
                max-w-[440px]
                text-[14px]
                font-medium
                leading-[1.6]
                text-[#536987]

                sm:mt-7
                sm:text-[15px]

                md:mt-7
                md:text-base

                lg:mt-8
                lg:text-[17px]

                xl:text-[18px]
              "
            >
              Digital marketing that turns attention into
              measurable business growth.
            </p>

            {/* =================================================
                CTA
                ================================================= */}
            <div
              className="
                mt-7
                flex
                items-center

                sm:mt-8
                lg:mt-9
              "
            >
              <Link
                to="/contact"
                aria-label="Grow with us"
                className="
                  group
                  inline-flex
                  min-h-[52px]
                  items-center
                  justify-between
                  gap-7
                  rounded-full
                  bg-[#1769E0]
                  py-1.5
                  pl-7
                  pr-1.5
                  text-[14px]
                  font-bold
                  text-white

                  shadow-[0_10px_30px_rgba(23,105,224,0.28)]

                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#125AC4]
                  hover:shadow-[0_16px_36px_rgba(23,105,224,0.38)]
                  active:translate-y-0

                  sm:min-h-[55px]
                  sm:pl-8
                  sm:text-[15px]

                  lg:min-h-[58px]
                  lg:pl-9
                  lg:text-base
                "
              >
                <span>
                  Grow With Us
                </span>

                <span
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#1769E0]

                    sm:h-11
                    sm:w-11

                    lg:h-12
                    lg:w-12

                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                >
                  <ArrowRight
                    className="
                      h-[18px]
                      w-[18px]

                      lg:h-5
                      lg:w-5
                    "
                    strokeWidth={2.4}
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* =======================================================
            SERVICE BAR
            ======================================================= */}
        <div
          className="
            relative z-20
            grid
            w-full
            max-w-[590px]
            grid-cols-4
            border-t
            border-[#BFD0E7]/80

            py-5

            sm:py-6

            md:py-7

            lg:py-8
          "
        >
          {/* DIGITAL */}
          <div
            className="
              flex
              items-center
              justify-center
              border-r
              border-[#BFD0E7]/80
              px-1
              sm:gap-2
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                text-[#17345F]

                sm:text-xs
                lg:text-[13px]
              "
            >
              Digital
            </span>
          </div>

          {/* SOCIAL */}
          <div
            className="
              flex
              items-center
              justify-center
              border-r
              border-[#BFD0E7]/80
              px-1
              sm:gap-2
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                text-[#17345F]

                sm:text-xs
                lg:text-[13px]
              "
            >
              Social
            </span>
          </div>

          {/* PERFORMANCE */}
          <div
            className="
              flex
              items-center
              justify-center
              border-r
              border-[#BFD0E7]/80
              px-1
              sm:gap-2
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                text-[#17345F]

                sm:text-xs
                lg:text-[13px]
              "
            >
              Performance
            </span>
          </div>

          {/* BRANDING */}
          <div
            className="
              flex
              items-center
              justify-center
              px-1
              sm:gap-2
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                text-[#17345F]

                sm:text-xs
                lg:text-[13px]
              "
            >
              Branding
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;