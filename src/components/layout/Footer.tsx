import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  MapPin,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

import { InstagramIcon } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const services = [
  {
    number: "01",
    title: "Digital Marketing",
    href: "/services/digital-marketing",
    description:
      "Meta Ads, Google Ads, Social Media, Design, Video & Web",
  },
  {
    number: "02",
    title: "Outdoor Marketing",
    href: "/services/outdoor-marketing",
    description:
      "Radio, TV, Newspaper, Sun-Pack, LED Van & Mall",
  },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        relative
        w-full
        overflow-hidden
        bg-[#061B3D]
        text-white
      "
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
          backgroundSize: "90px 90px",
        }}
      />

      {/* Top-right glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[180px]
          -top-[180px]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#1769E0]/20
          blur-[120px]
        "
      />

      {/* Bottom-left glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[220px]
          bottom-[-220px]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#1769E0]/10
          blur-[120px]
        "
      />

      {/* ============================================================
          WIDE FOOTER WRAPPER

          IMPORTANT:
          Do not use the narrow editorial Container here.
      ============================================================ */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1600px]
          px-5
          sm:px-8
          md:px-10
          lg:px-14
          xl:px-16
        "
      >
        {/* ==========================================================
            HERO CTA
        =========================================================== */}

        <Reveal
          delay={50}
          direction="up"
          distance={30}
        >
          <section
            className="
              border-b
              border-white/10
              py-16
              sm:py-20
              md:py-24
              lg:py-28
            "
          >
            {/* Label */}

            <div
              className="
                mb-7
                flex
                items-center
                justify-center
                gap-3

                lg:justify-start
              "
            >
              <span
                className="
                  h-[2px]
                  w-10
                  bg-[#4EA1FF]
                  sm:w-14
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#8CCBFF]
                  sm:text-xs
                "
              >
                LET&apos;S BUILD SOMETHING
              </span>
            </div>

            <div
              className="
                flex
                flex-col
                items-center
                gap-9
                text-center

                lg:flex-row
                lg:items-end
                lg:justify-between
                lg:text-left
              "
            >
              {/* Main heading */}

              <h2
                className="
                  max-w-[950px]
                  font-[Manrope]
                  text-[clamp(3rem,8vw,8rem)]
                  font-extrabold
                  uppercase
                  leading-[0.84]
                  tracking-[-0.065em]
                  text-white
                "
              >
                READY TO MAKE
                <br />

                <span className="text-[#4EA1FF]">
                  YOUR BRAND
                </span>

                <br />

                GROW?
              </h2>

              {/* CTA */}

              <Link
                to="/contact"
                className="
                  group
                  inline-flex
                  shrink-0
                  items-center
                  gap-4
                  rounded-full
                  border
                  border-[#4EA1FF]
                  bg-[#1769E0]
                  px-6
                  py-4
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-white
                  shadow-[0_15px_40px_rgba(23,105,224,0.28)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#2478F0]
                  hover:shadow-[0_20px_55px_rgba(23,105,224,0.4)]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#8CCBFF]
                  focus:ring-offset-2
                  focus:ring-offset-[#061B3D]
                "
              >
                <span>Start a Project</span>

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#0B3B82]
                    transition-transform
                    duration-300
                    group-hover:rotate-45
                  "
                >
                  <ArrowUpRight
                    className="h-4 w-4"
                    strokeWidth={2}
                  />
                </span>
              </Link>
            </div>

            <p
              className="
                mx-auto
                mt-8
                max-w-[680px]
                text-center
                text-sm
                leading-6
                text-white/55

                lg:mx-0
                lg:text-left
                sm:text-base
                sm:leading-7
              "
            >
              Digital marketing and outdoor advertising
              working together to build stronger brands,
              reach the right audience, and create meaningful
              growth.
            </p>
          </section>
        </Reveal>

        {/* ==========================================================
            MAIN FOOTER GRID
        =========================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-12
            py-14

            sm:grid-cols-2
            sm:gap-12
            sm:py-16

            lg:grid-cols-[1.6fr_0.75fr_1.2fr_1fr]
            lg:items-start
            lg:gap-12
            lg:py-20

            xl:grid-cols-[1.6fr_0.75fr_1.25fr_1fr]
            xl:gap-16
          "
        >
          {/* ========================================================
              BRAND
          ========================================================= */}

          <Reveal
            delay={100}
            direction="up"
            distance={25}
          >
            <div
              className="
                text-center

                lg:text-left
              "
            >
              {/* Logo */}

              <Link
                to="/"
                className="
                  group
                  inline-flex
                  items-center
                  gap-4
                "
                aria-label="AG ADS Home"
              >
                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/15
                    bg-white
                    shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                    transition-transform
                    duration-300
                    group-hover:rotate-3
                    group-hover:scale-105
                    p-1.5
                  "
                >
                  <img
                    src="/assets/brand/AG_logo.png"
                    alt="AG ADS Logo"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="flex flex-col text-left">
                  <span
                    className="
                      font-[Manrope]
                      text-2xl
                      font-extrabold
                      leading-none
                      tracking-[-0.04em]
                    "
                  >
                    AG ADS
                  </span>

                  <span
                    className="
                      mt-1
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-[#8CCBFF]
                    "
                  >
                    Advanced Growth
                  </span>
                </div>
              </Link>

              {/* Brand statement */}

              <p
                className="
                  mx-auto
                  mt-7
                  max-w-[380px]
                  font-[Manrope]
                  text-lg
                  font-semibold
                  leading-7
                  tracking-[-0.02em]
                  text-white

                  lg:mx-0
                "
              >
                One Brand.
                <br />
                Every Channel.
                <br />

                <span className="text-[#4EA1FF]">
                  Real Growth.
                </span>
              </p>

              {/* Description */}

              <p
                className="
                  mx-auto
                  mt-5
                  max-w-[400px]
                  text-sm
                  leading-6
                  text-white/50

                  lg:mx-0
                "
              >
                AG ADS is a growth-focused marketing agency
                helping businesses build stronger brands, reach
                the right audience, and turn attention into
                measurable results.
              </p>

              {/* Locations */}

              <div
                className="
                  mt-7
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#8CCBFF]

                  lg:justify-start
                "
              >
                <MapPin
                  className="h-4 w-4"
                  strokeWidth={1.7}
                />

                <span>Puducherry</span>

                <span className="text-white/25">
                  /
                </span>

                <span>Chennai</span>
              </div>
            </div>
          </Reveal>

          {/* ========================================================
              COMPANY
          ========================================================= */}

          <Reveal
            delay={150}
            direction="up"
            distance={25}
          >
            <div className="text-center lg:text-left">
              <FooterHeading>
                Company
              </FooterHeading>

              <nav aria-label="Company navigation">
                <ul className="space-y-3">
                  {companyLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className="
                          group
                          inline-flex
                          items-center
                          gap-1.5
                          text-sm
                          text-white/55
                          transition-colors
                          duration-200
                          hover:text-white
                          focus:text-white
                          focus:outline-none
                        "
                      >
                        <span>{item.label}</span>

                        <ChevronRight
                          className="
                            h-3.5
                            w-3.5
                            -translate-x-1
                            opacity-0
                            transition-all
                            duration-200
                            group-hover:translate-x-0
                            group-hover:opacity-100
                          "
                          strokeWidth={1.7}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Reveal>

          {/* ========================================================
              SERVICES
          ========================================================= */}

          <Reveal
            delay={200}
            direction="up"
            distance={25}
          >
            <div className="text-center lg:text-left">
              <FooterHeading>
                Services
              </FooterHeading>

              <div className="space-y-4">
                {services.map((service) => (
                  <Link
                    key={service.number}
                    to={service.href}
                    className="
                      group
                      block
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.025]
                      p-4
                      text-left
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#4EA1FF]/40
                      hover:bg-white/[0.05]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#4EA1FF]
                    "
                  >
                    <div
                      className="
                        mb-3
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <span
                        className="
                          text-[10px]
                          font-bold
                          tracking-[0.16em]
                          text-[#4EA1FF]
                        "
                      >
                        {service.number}
                      </span>

                      <ArrowUpRight
                        className="
                          h-4
                          w-4
                          text-white/35
                          transition-all
                          duration-300
                          group-hover:-translate-y-1
                          group-hover:translate-x-1
                          group-hover:text-[#8CCBFF]
                        "
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3
                      className="
                        font-[Manrope]
                        text-base
                        font-bold
                        text-white
                      "
                    >
                      {service.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-[11px]
                        leading-5
                        text-white/40
                      "
                    >
                      {service.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ========================================================
              CONTACT
          ========================================================= */}

          <Reveal
            delay={250}
            direction="up"
            distance={25}
          >
            <div className="text-center lg:text-left">
              <FooterHeading>
                Get In Touch
              </FooterHeading>

              <div className="space-y-3">
                {/* Phone */}

                <a
                  href="tel:6369846324"
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    p-4
                    text-left
                    transition-all
                    duration-300
                    hover:border-[#4EA1FF]/40
                    hover:bg-white/[0.05]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#4EA1FF]
                  "
                  aria-label="Call AG ADS at 6369846324"
                >
                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#1769E0]/15
                      text-[#8CCBFF]
                    "
                  >
                    <Phone
                      className="h-4 w-4"
                      strokeWidth={1.7}
                    />
                  </span>

                  <div className="min-w-0">
                    <span
                      className="
                        block
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-white/35
                      "
                    >
                      Call Us
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
                      6369846324
                    </span>
                  </div>

                  <ArrowUpRight
                    className="
                      ml-auto
                      h-4
                      w-4
                      text-white/25
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-[#8CCBFF]
                    "
                    strokeWidth={1.5}
                  />
                </a>

                {/* Instagram */}

                <a
                  href="https://instagram.com/ag.ads.pondy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    p-4
                    text-left
                    transition-all
                    duration-300
                    hover:border-[#4EA1FF]/40
                    hover:bg-white/[0.05]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#4EA1FF]
                  "
                  aria-label="Visit AG ADS on Instagram @ag.ads.pondy"
                >
                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#1769E0]/15
                      text-[#8CCBFF]
                    "
                  >
                    <InstagramIcon
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </span>

                  <div className="min-w-0">
                    <span
                      className="
                        block
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-white/35
                      "
                    >
                      Instagram
                    </span>

                    <span
                      className="
                        mt-1
                        block
                        truncate
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      @ag.ads.pondy
                    </span>
                  </div>

                  <ArrowUpRight
                    className="
                      ml-auto
                      h-4
                      w-4
                      text-white/25
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-[#8CCBFF]
                    "
                    strokeWidth={1.5}
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ==========================================================
            GIANT AG ADS SIGNATURE
            CENTERED ON ALL DEVICES
        =========================================================== */}

        <Reveal
          delay={100}
          direction="up"
          distance={45}
        >
          <div
            className="
              relative
              flex
              w-full
              items-center
              justify-center
              overflow-hidden
              border-t
              border-white/10
              pt-8
            "
          >
            {/* Signature glow */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-[-80px]
                left-1/2
                h-[220px]
                w-[70%]
                -translate-x-1/2
                rounded-full
                bg-[#1769E0]/10
                blur-[90px]
              "
            />

            {/* AG ADS */}

            <div
              aria-hidden="true"
              className="
                relative
                z-10
                w-full
                select-none
                text-center
                font-[Manrope]
                text-[clamp(4rem,15vw,14rem)]
                font-extrabold
                uppercase
                leading-[0.72]
                tracking-[-0.09em]
                text-white/[0.045]
              "
            >
              AG ADS
            </div>
          </div>
        </Reveal>

        {/* ==========================================================
            BOTTOM BAR
        =========================================================== */}

        <Reveal
          delay={180}
          direction="up"
          distance={20}
        >
          <div
            className="
              border-t
              border-white/10
              py-6
              text-center
              space-y-1.5
            "
          >
            <p
              className="
                text-[10px]
                sm:text-[11px]
                font-medium
                tracking-[0.06em]
                text-white/40
              "
            >
              © {year} AG ADS — Advanced Growth. All rights reserved.
            </p>
            <p
              className="
                text-[10px]
                sm:text-[11px]
                font-medium
                tracking-[0.06em]
                text-white/40
              "
            >
              Website by{' '}
              <a
                href="https://cognolynx.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  font-semibold
                  text-white/75
                  transition-colors
                  duration-200
                  hover:text-[#4EA1FF]
                  hover:underline
                  underline-offset-2
                "
              >
                Cognolynx
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

/* ================================================================
   FOOTER HEADING
================================================================ */

function FooterHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <span
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.2em]
          text-[#8CCBFF]
        "
      >
        {children}
      </span>

      <div
        className="
          mx-auto
          mt-3
          h-px
          w-8
          bg-[#1769E0]

          lg:mx-0
        "
      />
    </div>
  );
}