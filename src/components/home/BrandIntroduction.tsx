import React from 'react';
import {
  ArrowUpRight,
  Check,
  Globe2,
  MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

const digitalServices = [
  'Meta Ads',
  'Google Ads',
  'Social Media Management',
  'Video Production',
  'Graphic Design',
  'Video Editing',
  'Branding',
  'Website Development',
];

const outdoorServices = [
  'Radio Advertising',
  'TV Advertising',
  'Newspaper Advertising',
  'Sun-Pack Advertising',
  'LED Van Advertising',
  'Mall Advertising',
];

export const BrandIntroduction: React.FC = () => {
  return (
    <section
      id="our-approach"
      aria-labelledby="brand-introduction-title"
      className="relative w-full overflow-hidden bg-white text-[#101828]"
    >
      {/* ============================================================
          SECTION BACKGROUND
          Desktop -> Brand_Background.png
          Mobile  -> Brand_Background_M.png
      ============================================================ */}
      <picture className="pointer-events-none absolute inset-0 h-full w-full">
        <source
          media="(max-width: 767px)"
          srcSet="/assets/section/Brand_Background_M.png"
        />

        <img
          src="/assets/section/Brand_Background.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
      </picture>

      {/* Section readability */}
      <div
        className="pointer-events-none absolute inset-0 bg-white/35"
        aria-hidden="true"
      />

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}
      <Container
        size="editorial"
        className="relative z-10 px-4 py-12 xs:px-5 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24"
      >
        {/* ============================================================
            SECTION HEADER
        ============================================================ */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          {/* Heading */}
          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-[#1769E0] sm:w-14" />

                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#1769E0] sm:text-[11px]">
                  OUR SERVICES &amp; APPROACH
                </span>
              </div>

              <h2
                id="brand-introduction-title"
                className="
                  max-w-[950px]
                  font-display
                  text-[clamp(3rem,8vw,8rem)]
                  font-extrabold
                  uppercase
                  leading-[0.84]
                  tracking-[-0.055em]
                  text-[#0B1830]
                "
              >
                EVERY
                <br />
                CHANNEL.
                <br />
                <span className="text-[#1769E0]">
                  ONE PARTNER.
                </span>
              </h2>
            </Reveal>
          </div>

          {/* Description */}
          <div className="lg:col-span-4">
            <Reveal delay={220}>
              <div className="max-w-lg lg:ml-auto lg:pb-2">
                <div className="mb-5 h-[2px] w-12 bg-[#1769E0]" />

                <p
                  className="
                    font-sans
                    text-sm
                    font-medium
                    leading-6
                    text-[#344054]
                    sm:text-base
                    sm:leading-7
                  "
                >
                  AG ADS combines digital marketing and outdoor advertising
                  to help businesses build stronger brands, command attention,
                  and scale their reach.
                </p>

                <Link
                  to="/services"
                  className="
                    group
                    mt-6
                    inline-flex
                    items-center
                    gap-3
                    border-b-2
                    border-[#0B3B82]
                    pb-2
                    font-sans
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-[#0B3B82]
                    transition-colors
                    hover:text-[#1769E0]
                    sm:text-xs
                  "
                >
                  <span>Explore All Services</span>

                  <ArrowUpRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                    "
                    strokeWidth={2}
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ============================================================
            SERVICE CARDS
        ============================================================ */}
        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-6
            sm:mt-14
            lg:mt-16
            lg:grid-cols-2
            lg:gap-7
          "
        >
          {/* ==========================================================
              DIGITAL MARKETING
          ========================================================== */}
          <Reveal delay={150} direction="up" distance={25}>
            <Link
              to="/services/digital-marketing"
              className="
                group
                relative
                block
                aspect-square
                w-full
                overflow-hidden
                rounded-[24px]
                border
                border-[#C7DCF5]
                bg-[#EAF3FF]
                shadow-[0_20px_60px_rgba(11,59,130,0.14)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_30px_80px_rgba(11,59,130,0.20)]
              "
            >
              {/* ======================================================
                  FULL CARD IMAGE
                  The image covers the complete card.
                  Because both are square, there is no unwanted crop.
              ======================================================= */}
              <img
                src="/assets/section/AG_Desktop.png"
                alt=""
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-center
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.015]
                "
                loading="lazy"
                decoding="async"
              />

              {/* ======================================================
                  LEFT WHITE FADE

                  This is intentionally limited to the text area.
                  The right side keeps the original image visible.
              ======================================================= */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  z-[1]
                  w-[78%]
                  bg-gradient-to-r
                  from-white
                  via-white/95
                  via-[42%]
                  to-transparent
                  sm:w-[72%]
                  lg:w-[70%]
                "
                aria-hidden="true"
              />

              {/* Subtle bottom readability */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-[1]
                  h-[28%]
                  bg-gradient-to-t
                  from-white/20
                  to-transparent
                "
                aria-hidden="true"
              />

              {/* ======================================================
                  CONTENT OVER IMAGE
              ======================================================= */}
              <div
                className="
                  absolute
                  inset-0
                  z-10
                  flex
                  flex-col
                  p-5
                  sm:p-7
                  md:p-8
                  lg:p-8
                  xl:p-10
                "
              >
                {/* ----------------------------------------------------
                    NUMBER
                ----------------------------------------------------- */}
                <div className="flex items-center gap-3">
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
                      border-[#BBD7F8]
                      bg-white/90
                      text-[#1769E0]
                      shadow-sm
                      backdrop-blur-sm
                      sm:h-12
                      sm:w-12
                    "
                  >
                    <Globe2
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      strokeWidth={1.8}
                    />
                  </div>

                  <span
                    className="
                      font-sans
                      text-lg
                      font-bold
                      text-[#1769E0]
                      sm:text-xl
                    "
                  >
                    01
                  </span>

                  <span className="h-[2px] w-14 bg-[#1769E0] sm:w-20" />
                </div>

                {/* ----------------------------------------------------
                    TITLE + DESCRIPTION
                ----------------------------------------------------- */}
                <div
                  className="
                    mt-5
                    max-w-[68%]
                    sm:mt-6
                    sm:max-w-[65%]
                    lg:max-w-[60%]
                  "
                >
                  <h3
                    className="
                      font-display
                      text-[clamp(2rem,3.7vw,3.3rem)]
                      font-extrabold
                      uppercase
                      leading-[0.9]
                      tracking-[-0.045em]
                      text-[#071637]
                    "
                  >
                    Digital
                    <br />
                    Marketing
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-[430px]
                      font-sans
                      text-xs
                      font-medium
                      leading-5
                      text-[#344563]
                      sm:mt-4
                      sm:text-sm
                      sm:leading-6
                    "
                  >
                    Performance-driven digital marketing designed to help
                    businesses build presence and drive enquiries.
                  </p>
                </div>

                {/* ----------------------------------------------------
                    DESKTOP SERVICE LIST
                    Completely hidden on mobile/tablet.
                ----------------------------------------------------- */}
                <div
                  className="
                    mt-5
                    hidden
                    max-w-[64%]
                    grid-cols-2
                    gap-2
                    lg:grid
                  "
                >
                  {digitalServices.map((service) => (
                    <div
                      key={service}
                      className="
                        flex
                        min-h-[35px]
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-[#C8DDF7]
                        bg-white/88
                        px-2.5
                        shadow-sm
                        backdrop-blur-md
                      "
                    >
                      <span
                        className="
                          flex
                          h-5
                          w-5
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#1769E0]
                          text-white
                        "
                      >
                        <Check
                          className="h-3 w-3"
                          strokeWidth={3}
                        />
                      </span>

                      <span
                        className="
                          font-sans
                          text-[10px]
                          font-semibold
                          leading-4
                          text-[#253858]
                          xl:text-[11px]
                        "
                      >
                        {service}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ----------------------------------------------------
                    CTA
                    It is INSIDE the image/card.
                ----------------------------------------------------- */}
                <div className="mt-auto pt-5">
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-3
                      rounded-full
                      bg-[#1769E0]
                      px-5
                      py-3
                      font-sans
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-white
                      shadow-[0_10px_25px_rgba(23,105,224,0.28)]
                      transition-all
                      duration-300
                      group-hover:bg-[#0B3B82]
                      sm:px-6
                      sm:py-3.5
                      sm:text-[11px]
                    "
                  >
                    <span>Explore Service</span>

                    <ArrowUpRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                      strokeWidth={2.3}
                    />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* ==========================================================
              OUTDOOR MARKETING
          ========================================================== */}
          <Reveal delay={280} direction="up" distance={25}>
            <Link
              to="/services/outdoor-marketing"
              className="
                group
                relative
                block
                aspect-square
                w-full
                overflow-hidden
                rounded-[24px]
                border
                border-[#C7DCF5]
                bg-[#EAF3FF]
                shadow-[0_20px_60px_rgba(11,59,130,0.14)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_30px_80px_rgba(11,59,130,0.20)]
              "
            >
              {/* FULL OUTDOOR IMAGE */}
              <img
                src="/assets/section/Outdoor.png"
                alt=""
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-center
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.015]
                "
                loading="lazy"
                decoding="async"
              />

              {/* LEFT WHITE FADE */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  z-[1]
                  w-[78%]
                  bg-gradient-to-r
                  from-white
                  via-white/95
                  via-[42%]
                  to-transparent
                  sm:w-[72%]
                  lg:w-[70%]
                "
                aria-hidden="true"
              />

              {/* Bottom readability */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-[1]
                  h-[28%]
                  bg-gradient-to-t
                  from-white/20
                  to-transparent
                "
                aria-hidden="true"
              />

              {/* CONTENT */}
              <div
                className="
                  absolute
                  inset-0
                  z-10
                  flex
                  flex-col
                  p-5
                  sm:p-7
                  md:p-8
                  lg:p-8
                  xl:p-10
                "
              >
                {/* ----------------------------------------------------
                    NUMBER
                ----------------------------------------------------- */}
                <div className="flex items-center gap-3">
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
                      border-[#BBD7F8]
                      bg-white/90
                      text-[#1769E0]
                      shadow-sm
                      backdrop-blur-sm
                      sm:h-12
                      sm:w-12
                    "
                  >
                    <MapPin
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      strokeWidth={1.8}
                    />
                  </div>

                  <span
                    className="
                      font-sans
                      text-lg
                      font-bold
                      text-[#1769E0]
                      sm:text-xl
                    "
                  >
                    02
                  </span>

                  <span className="h-[2px] w-14 bg-[#1769E0] sm:w-20" />
                </div>

                {/* ----------------------------------------------------
                    TITLE + DESCRIPTION
                ----------------------------------------------------- */}
                <div
                  className="
                    mt-5
                    max-w-[70%]
                    sm:mt-6
                    sm:max-w-[67%]
                    lg:max-w-[63%]
                  "
                >
                  <h3
                    className="
                      font-display
                      text-[clamp(2rem,3.7vw,3.3rem)]
                      font-extrabold
                      uppercase
                      leading-[0.9]
                      tracking-[-0.045em]
                      text-[#071637]
                    "
                  >
                    Outdoor
                    <br />
                    Advertising
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-[430px]
                      font-sans
                      text-xs
                      font-medium
                      leading-5
                      text-[#344563]
                      sm:mt-4
                      sm:text-sm
                      sm:leading-6
                    "
                  >
                    High-visibility traditional and physical advertising
                    solutions connecting with audiences offline.
                  </p>
                </div>

                {/* ----------------------------------------------------
                    DESKTOP SERVICES
                ----------------------------------------------------- */}
                <div
                  className="
                    mt-5
                    hidden
                    max-w-[65%]
                    grid-cols-2
                    gap-2
                    lg:grid
                  "
                >
                  {outdoorServices.map((service) => (
                    <div
                      key={service}
                      className="
                        flex
                        min-h-[35px]
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-[#C8DDF7]
                        bg-white/88
                        px-2.5
                        shadow-sm
                        backdrop-blur-md
                      "
                    >
                      <span
                        className="
                          flex
                          h-5
                          w-5
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#1769E0]
                          text-white
                        "
                      >
                        <Check
                          className="h-3 w-3"
                          strokeWidth={3}
                        />
                      </span>

                      <span
                        className="
                          font-sans
                          text-[10px]
                          font-semibold
                          leading-4
                          text-[#253858]
                          xl:text-[11px]
                        "
                      >
                        {service}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ----------------------------------------------------
                    CTA
                ----------------------------------------------------- */}
                <div className="mt-auto pt-5">
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-3
                      rounded-full
                      bg-[#1769E0]
                      px-5
                      py-3
                      font-sans
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-white
                      shadow-[0_10px_25px_rgba(23,105,224,0.28)]
                      transition-all
                      duration-300
                      group-hover:bg-[#0B3B82]
                      sm:px-6
                      sm:py-3.5
                      sm:text-[11px]
                    "
                  >
                    <span>Explore Service</span>

                    <ArrowUpRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                      strokeWidth={2.3}
                    />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>

        {/* ============================================================
            BOTTOM BRAND STRIP
        ============================================================ */}
        <Reveal delay={420}>
          <div
            className="
              mt-8
              flex
              flex-col
              gap-3
              border-t
              border-[#C9D6E5]/80
              pt-5
              sm:mt-10
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#1769E0]" />

              <span
                className="
                  font-sans
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#475467]
                  sm:text-xs
                "
              >
                Digital + Outdoor
              </span>
            </div>

            <span
              className="
                font-sans
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#98A2B3]
                sm:text-xs
              "
            >
              Puducherry · Chennai
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};