import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  MoveUpRight,
  Phone,
  Sparkles,
  X,
} from 'lucide-react';

import { InstagramIcon, WhatsAppIcon } from '../ui/Icons';
import { Container } from '../ui/Container';

interface CapabilityItem {
  name: string;
}

interface CoreService {
  id: 'digital' | 'outdoor';
  index: string;
  name: string;
  tag: string;
  title: string;
  subtitle: string;
  path: string;
  capabilities: CapabilityItem[];
}

const OFFICIAL_SERVICES: CoreService[] = [
  {
    id: 'digital',
    index: '01',
    name: 'DIGITAL MARKETING',
    tag: 'PERFORMANCE',
    title: 'COMPLETE DIGITAL MARKETING SERVICES',
    subtitle:
      'Performance-driven digital marketing designed to help businesses build presence and drive enquiries.',
    path: '/services/digital-marketing',
    capabilities: [
      { name: 'Meta Ads' },
      { name: 'Google Ads' },
      { name: 'Social Media Management' },
      { name: 'Graphic Design' },
      { name: 'Video Production' },
      { name: 'Video Editing' },
      { name: 'Branding' },
      { name: 'Website Development' },
    ],
  },
  {
    id: 'outdoor',
    index: '02',
    name: 'OUTDOOR MARKETING',
    tag: 'MASS REACH',
    title: 'COMPLETE OUTDOOR MARKETING & ADVERTISING SERVICES',
    subtitle:
      'High-visibility traditional and physical advertising solutions connecting with audiences offline.',
    path: '/services/outdoor-marketing',
    capabilities: [
      { name: 'Radio Advertising' },
      { name: 'TV Advertising' },
      { name: 'Newspaper Advertising' },
      { name: 'Sun-Pack Advertising' },
      { name: 'LED Van Advertising' },
      { name: 'Mall Advertising' },
    ],
  },
];

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
];

export const Header: React.FC = () => {
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeService, setActiveService] = useState<'digital' | 'outdoor'>('digital');
  const [mobileServiceOpen, setMobileServiceOpen] = useState<
    'digital' | 'outdoor' | null
  >(null);

  const servicesRef = useRef<HTMLDivElement | null>(null);

  const currentService =
    OFFICIAL_SERVICES.find((service) => service.id === activeService) ??
    OFFICIAL_SERVICES[0];

  const isServicesActive = location.pathname.startsWith('/services');

  /* -------------------------------------------------------
     SCROLL STATE
  ------------------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* -------------------------------------------------------
     CLOSE MENUS ON ROUTE CHANGE
  ------------------------------------------------------- */
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setMobileServiceOpen(null);
  }, [location.pathname]);

  /* -------------------------------------------------------
     BODY SCROLL LOCK FOR MOBILE MENU
  ------------------------------------------------------- */
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  /* -------------------------------------------------------
     ESCAPE + OUTSIDE CLICK
  ------------------------------------------------------- */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
        setMobileMenuOpen(false);
        setMobileServiceOpen(null);
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  /* -------------------------------------------------------
     HELPERS
  ------------------------------------------------------- */
  const isPathActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(path);
  };

  const closeEverything = () => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    setMobileServiceOpen(null);
  };

  const toggleMobileService = (id: 'digital' | 'outdoor') => {
    setMobileServiceOpen((previous) =>
      previous === id ? null : id
    );
  };

  return (
    <>
      {/* =====================================================
          DESKTOP / MOBILE HEADER
      ====================================================== */}
      <header
        className={`
          fixed inset-x-0 top-0 z-[80]
          transition-all duration-300 ease-out
          ${
            isScrolled
              ? 'py-2'
              : 'py-0'
          }
        `}
      >
        <div
          className={`
            mx-auto
            transition-all duration-300
            ${
              isScrolled
                ? 'max-w-[1460px] px-3 sm:px-5 lg:px-7'
                : 'w-full'
            }
          `}
        >
          <div
            className={`
              relative
              border
              transition-all duration-300
              ${
                isScrolled
                  ? `
                    rounded-2xl
                    border-[#DDE7F3]
                    bg-white/95
                    shadow-[0_16px_45px_rgba(7,42,94,0.10)]
                    backdrop-blur-xl
                  `
                  : `
                    rounded-none
                    border-transparent
                    bg-white
                    shadow-[0_1px_4px_rgba(7,26,54,0.04)]
                  `
              }
            `}
          >
            <Container
              size="editorial"
              className="
                px-4
                sm:px-6
                md:px-8
                lg:px-10
                xl:px-12
              "
            >
              {/* =================================================
                  MAIN HEADER ROW
              ================================================== */}
              <div
                className="
                  flex
                  h-[68px]
                  items-center
                  justify-between
                  gap-3
                  sm:h-[72px]
                  lg:h-[76px]
                "
              >
                {/* =================================================
                    LOGO
                ================================================== */}
                <Link
                  to="/"
                  onClick={closeEverything}
                  aria-label="AG ADS — Advanced Growth Home"
                  className="
                    group
                    flex
                    shrink-0
                    items-center
                    gap-2.5
                    select-none
                    focus-visible:outline-none
                  "
                >
                  <div
                    className="
                      relative
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      sm:h-10
                      sm:w-10
                      lg:h-11
                      lg:w-11
                    "
                  >
                    <img
                      src="/assets/brand/AG_logo.webp"
                      alt="AG ADS Logo"
                      className="
                        h-full
                        w-full
                        object-contain
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:scale-[1.06]
                      "
                      loading="eager"
                    />

                    <span
                      className="
                        pointer-events-none
                        absolute
                        -inset-1
                        rounded-full
                        bg-[#1769E0]/10
                        opacity-0
                        blur-md
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    />
                  </div>

                  <div className="flex min-w-0 flex-col justify-center">
                    <span
                      className="
                        font-display
                        text-[18px]
                        font-black
                        leading-none
                        tracking-[-0.03em]
                        text-[#071A36]
                        transition-colors
                        duration-200
                        group-hover:text-[#0B3B82]
                        sm:text-[20px]
                        lg:text-[22px]
                      "
                    >
                      AG ADS
                    </span>

                    <span
                      className="
                        mt-1
                        hidden
                        text-[8px]
                        font-bold
                        uppercase
                        leading-none
                        tracking-[0.22em]
                        text-[#0B3B82]
                        sm:block
                        lg:text-[9px]
                      "
                    >
                      ADVANCED GROWTH
                    </span>
                  </div>
                </Link>

                {/* =================================================
                    DESKTOP NAVIGATION
                    lg+
                ================================================== */}
                <nav
                  className="
                    hidden
                    items-center
                    gap-1
                    lg:flex
                    xl:gap-2
                  "
                  aria-label="Primary Navigation"
                >
                  {NAV_ITEMS.slice(0, 2).map((item) => {
                    const active = isPathActive(item.path);

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`
                          group
                          relative
                          flex
                          h-10
                          items-center
                          px-3.5
                          text-[12px]
                          font-bold
                          uppercase
                          tracking-[0.07em]
                          transition-colors
                          duration-200
                          xl:px-4
                          xl:text-[13px]
                          ${
                            active
                              ? 'text-[#0B3B82]'
                              : 'text-[#344054] hover:text-[#0B3B82]'
                          }
                        `}
                      >
                        {item.label}

                        <span
                          className={`
                            absolute
                            bottom-1
                            left-1/2
                            h-[2px]
                            -translate-x-1/2
                            rounded-full
                            bg-[#1769E0]
                            transition-all
                            duration-300
                            ${
                              active
                                ? 'w-5'
                                : 'w-0 group-hover:w-5'
                            }
                          `}
                        />
                      </Link>
                    );
                  })}

                  {/* =================================================
                      SERVICES
                  ================================================== */}
                  <div
                    ref={servicesRef}
                    className="relative"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setServicesOpen((previous) => !previous)
                      }
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      aria-controls="ag-services-menu"
                      className={`
                        group
                        relative
                        flex
                        h-10
                        items-center
                        gap-1.5
                        px-3.5
                        text-[12px]
                        font-bold
                        uppercase
                        tracking-[0.07em]
                        transition-colors
                        duration-200
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#1769E0]/30
                        xl:px-4
                        xl:text-[13px]
                        ${
                          servicesOpen || isServicesActive
                            ? 'text-[#0B3B82]'
                            : 'text-[#344054] hover:text-[#0B3B82]'
                        }
                      `}
                    >
                      <span>SERVICES</span>

                      <ChevronDown
                        className={`
                          h-3.5
                          w-3.5
                          transition-transform
                          duration-300
                          ${
                            servicesOpen
                              ? 'rotate-180 text-[#1769E0]'
                              : 'text-[#667085] group-hover:text-[#0B3B82]'
                          }
                        `}
                      />

                      <span
                        className={`
                          absolute
                          bottom-1
                          left-1/2
                          h-[2px]
                          -translate-x-1/2
                          rounded-full
                          bg-[#1769E0]
                          transition-all
                          duration-300
                          ${
                            servicesOpen || isServicesActive
                              ? 'w-5'
                              : 'w-0 group-hover:w-5'
                          }
                        `}
                      />
                    </button>

                    {/* =================================================
                        PREMIUM SERVICES MEGA MENU
                    ================================================== */}
                    {servicesOpen && (
                      <div
                        id="ag-services-menu"
                        role="menu"
                        aria-label="AG ADS Services"
                        className="
                          absolute
                          left-1/2
                          top-[calc(100%+12px)]
                          z-[100]
                          w-[min(760px,calc(100vw-32px))]
                          -translate-x-1/2
                        "
                      >
                        <div
                          className="
                            overflow-hidden
                            rounded-[22px]
                            border
                            border-[#D9E5F2]
                            bg-white
                            shadow-[0_30px_80px_rgba(7,42,94,0.16)]
                          "
                        >
                          {/* TOP LABEL */}
                          <div
                            className="
                              flex
                              items-center
                              justify-between
                              border-b
                              border-[#E8EEF6]
                              px-6
                              py-4
                              sm:px-7
                            "
                          >
                            <div>
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  text-[9px]
                                  font-bold
                                  uppercase
                                  tracking-[0.2em]
                                  text-[#1769E0]
                                "
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-[#1769E0]" />
                                OUR CAPABILITIES
                              </div>

                              <p
                                className="
                                  mt-1
                                  text-[11px]
                                  font-medium
                                  text-[#667085]
                                "
                              >
                                One brand. Every channel.
                              </p>
                            </div>

                            <Link
                              to="/services"
                              onClick={closeEverything}
                              className="
                                hidden
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-[#D6E2F0]
                                px-3.5
                                py-2
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                text-[#0B3B82]
                                transition-all
                                duration-200
                                hover:border-[#0B3B82]
                                hover:bg-[#F3F7FC]
                                sm:inline-flex
                              "
                            >
                              View All
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>

                          {/* MAIN MENU */}
                          <div className="grid grid-cols-[220px_1fr]">
                            {/* LEFT SERVICE SELECTOR */}
                            <div
                              className="
                                border-r
                                border-[#E8EEF6]
                                bg-[#F8FAFD]
                                p-3
                              "
                            >
                              {OFFICIAL_SERVICES.map((service) => {
                                const selected =
                                  activeService === service.id;

                                return (
                                  <button
                                    key={service.id}
                                    type="button"
                                    onClick={() =>
                                      setActiveService(service.id)
                                    }
                                    className={`
                                      group
                                      relative
                                      mb-2
                                      w-full
                                      overflow-hidden
                                      rounded-2xl
                                      border
                                      p-4
                                      text-left
                                      transition-all
                                      duration-300
                                      last:mb-0
                                      ${
                                        selected
                                          ? `
                                            border-[#BFD4EE]
                                            bg-white
                                            shadow-[0_10px_28px_rgba(11,59,130,0.09)]
                                          `
                                          : `
                                            border-transparent
                                            bg-transparent
                                            hover:border-[#D8E4F1]
                                            hover:bg-white
                                          `
                                      }
                                    `}
                                  >
                                    {selected && (
                                      <span
                                        className="
                                          absolute
                                          bottom-0
                                          left-0
                                          top-0
                                          w-[3px]
                                          bg-[#1769E0]
                                        "
                                      />
                                    )}

                                    <div
                                      className="
                                        flex
                                        items-center
                                        justify-between
                                      "
                                    >
                                      <span
                                        className={`
                                          text-[10px]
                                          font-black
                                          tracking-[0.15em]
                                          ${
                                            selected
                                              ? 'text-[#1769E0]'
                                              : 'text-[#98A2B3]'
                                          }
                                        `}
                                      >
                                        {service.index}
                                      </span>

                                      <span
                                        className={`
                                          rounded-full
                                          px-2
                                          py-1
                                          text-[8px]
                                          font-bold
                                          uppercase
                                          tracking-[0.1em]
                                          ${
                                            selected
                                              ? 'bg-[#EAF2FD] text-[#0B3B82]'
                                              : 'bg-[#EEF2F6] text-[#667085]'
                                          }
                                        `}
                                      >
                                        {service.tag}
                                      </span>
                                    </div>

                                    <div
                                      className={`
                                        mt-4
                                        text-[12px]
                                        font-black
                                        uppercase
                                        tracking-[0.04em]
                                        ${
                                          selected
                                            ? 'text-[#071A36]'
                                            : 'text-[#475467]'
                                        }
                                      `}
                                    >
                                      {service.name}
                                    </div>

                                    <div
                                      className={`
                                        mt-2
                                        flex
                                        items-center
                                        gap-1.5
                                        text-[9px]
                                        font-semibold
                                        ${
                                          selected
                                            ? 'text-[#1769E0]'
                                            : 'text-[#98A2B3]'
                                        }
                                      `}
                                    >
                                      Explore
                                      <ArrowRight
                                        className={`
                                          h-3
                                          w-3
                                          transition-transform
                                          duration-200
                                          ${
                                            selected
                                              ? 'translate-x-0.5'
                                              : 'group-hover:translate-x-0.5'
                                          }
                                        `}
                                      />
                                    </div>
                                  </button>
                                );
                              })}

                              {/* PRODUCTION SERVICES POPUP TRIGGER */}
                              <button
                                type="button"
                                onClick={() => {
                                  closeEverything();
                                  window.dispatchEvent(
                                    new CustomEvent('ag-open-services-popup')
                                  );
                                }}
                                className="
                                  group
                                  relative
                                  mt-2
                                  w-full
                                  overflow-hidden
                                  rounded-2xl
                                  border
                                  border-dashed
                                  border-[#BFD4EE]
                                  bg-[#F0F6FF]/70
                                  p-4
                                  text-left
                                  transition-all
                                  duration-300
                                  hover:border-[#1769E0]
                                  hover:bg-white
                                  hover:shadow-[0_10px_28px_rgba(11,59,130,0.12)]
                                "
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-black tracking-[0.15em] text-[#1769E0]">
                                    03
                                  </span>

                                  <span className="rounded-full bg-[#EAF2FD] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#0B3B82]">
                                    STUDIO
                                  </span>
                                </div>

                                <div className="mt-4 text-[12px] font-black uppercase tracking-[0.04em] text-[#071A36] transition-colors group-hover:text-[#0B3B82]">
                                  PRODUCTION SERVICES
                                </div>

                                <div className="mt-2 flex items-center gap-1.5 text-[9px] font-semibold text-[#1769E0]">
                                  Launch Studio
                                  <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                                </div>
                              </button>
                            </div>

                            {/* RIGHT SERVICE CONTENT */}
                            <div className="p-6 sm:p-7">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <div
                                    className="
                                      text-[10px]
                                      font-bold
                                      uppercase
                                      tracking-[0.18em]
                                      text-[#1769E0]
                                    "
                                  >
                                    {currentService.index} /{' '}
                                    {currentService.tag}
                                  </div>

                                  <h3
                                    className="
                                      mt-2
                                      max-w-[390px]
                                      font-display
                                      text-[22px]
                                      font-black
                                      leading-[1.05]
                                      tracking-[-0.025em]
                                      text-[#071A36]
                                    "
                                  >
                                    {currentService.name}
                                  </h3>
                                </div>

                                <div
                                  className="
                                    hidden
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[#F0F6FF]
                                    text-[#1769E0]
                                    sm:flex
                                  "
                                >
                                  <MoveUpRight className="h-5 w-5" />
                                </div>
                              </div>

                              <p
                                className="
                                  mt-3
                                  max-w-[520px]
                                  text-[12px]
                                  leading-[1.65]
                                  text-[#667085]
                                "
                              >
                                {currentService.subtitle}
                              </p>

                              {/* CAPABILITIES */}
                              <div className="mt-6">
                                <div
                                  className="
                                    mb-3
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#98A2B3]
                                  "
                                >
                                  WHAT WE DO
                                </div>

                                <div
                                  className="
                                    grid
                                    grid-cols-2
                                    gap-2
                                  "
                                >
                                  {currentService.capabilities.map(
                                    (capability) => (
                                      <Link
                                        key={capability.name}
                                        to={currentService.path}
                                        onClick={closeEverything}
                                        className="
                                          group
                                          flex
                                          items-center
                                          gap-2
                                          rounded-xl
                                          border
                                          border-[#E8EEF6]
                                          bg-white
                                          px-3
                                          py-2.5
                                          transition-all
                                          duration-200
                                          hover:border-[#BFD4EE]
                                          hover:bg-[#F7FAFE]
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
                                            bg-[#EDF4FD]
                                            text-[#1769E0]
                                          "
                                        >
                                          <Check className="h-3 w-3" />
                                        </span>

                                        <span
                                          className="
                                            truncate
                                            text-[10px]
                                            font-semibold
                                            text-[#475467]
                                            transition-colors
                                            group-hover:text-[#0B3B82]
                                          "
                                        >
                                          {capability.name}
                                        </span>
                                      </Link>
                                    )
                                  )}
                                </div>
                              </div>

                              {/* EXPLORE CTA */}
                              <Link
                                to={currentService.path}
                                onClick={closeEverything}
                                className="
                                  group
                                  mt-6
                                  inline-flex
                                  items-center
                                  gap-2
                                  rounded-full
                                  bg-[#0B3B82]
                                  px-4
                                  py-2.5
                                  text-[10px]
                                  font-bold
                                  uppercase
                                  tracking-[0.12em]
                                  text-white
                                  shadow-[0_8px_20px_rgba(11,59,130,0.18)]
                                  transition-all
                                  duration-200
                                  hover:bg-[#072A5E]
                                  hover:shadow-[0_12px_28px_rgba(11,59,130,0.24)]
                                "
                              >
                                Explore{' '}
                                {activeService === 'digital'
                                  ? 'Digital'
                                  : 'Outdoor'}
                                <ArrowRight
                                  className="
                                    h-3.5
                                    w-3.5
                                    transition-transform
                                    duration-200
                                    group-hover:translate-x-1
                                  "
                                />
                              </Link>
                            </div>
                          </div>

                          {/* BOTTOM GROWTH STRIP */}
                          <div
                            className="
                              flex
                              flex-col
                              gap-3
                              border-t
                              border-[#E8EEF6]
                              bg-[#F7FAFE]
                              px-6
                              py-3.5
                              sm:flex-row
                              sm:items-center
                              sm:justify-between
                              sm:px-7
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[0.13em]
                                text-[#667085]
                              "
                            >
                              <Sparkles className="h-3.5 w-3.5 text-[#1769E0]" />
                              Puducherry • Chennai • Pan-South India
                            </div>

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                text-[#0B3B82]
                              "
                            >
                              <span>ATTENTION</span>
                              <span className="text-[#A8B6C7]">→</span>
                              <span>ENGAGEMENT</span>
                              <span className="text-[#A8B6C7]">→</span>
                              <span>LEADS</span>
                              <span className="text-[#A8B6C7]">→</span>
                              <span>GROWTH</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ABOUT */}
                  <Link
                    to="/about"
                    className={`
                      group
                      relative
                      flex
                      h-10
                      items-center
                      px-3.5
                      text-[12px]
                      font-bold
                      uppercase
                      tracking-[0.07em]
                      transition-colors
                      duration-200
                      xl:px-4
                      xl:text-[13px]
                      ${
                        isPathActive('/about')
                          ? 'text-[#0B3B82]'
                          : 'text-[#344054] hover:text-[#0B3B82]'
                      }
                    `}
                  >
                    ABOUT

                    <span
                      className={`
                        absolute
                        bottom-1
                        left-1/2
                        h-[2px]
                        -translate-x-1/2
                        rounded-full
                        bg-[#1769E0]
                        transition-all
                        duration-300
                        ${
                          isPathActive('/about')
                            ? 'w-5'
                            : 'w-0 group-hover:w-5'
                        }
                      `}
                    />
                  </Link>
                </nav>

                {/* =================================================
                    DESKTOP CONTACT
                ================================================== */}
                <div className="hidden shrink-0 lg:flex">
                  <Link
                    to="/contact"
                    className="
                      group
                      inline-flex
                      h-10
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      border
                      border-[#B8CAE0]
                      bg-white
                      px-4
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.1em]
                      text-[#0B3B82]
                      shadow-[0_2px_5px_rgba(7,26,54,0.03)]
                      transition-all
                      duration-200
                      hover:border-[#0B3B82]
                      hover:bg-[#0B3B82]
                      hover:text-white
                      hover:shadow-[0_8px_20px_rgba(11,59,130,0.16)]
                      active:scale-[0.98]
                      xl:h-11
                      xl:px-5
                    "
                  >
                    Contact

                    <ArrowRight
                      className="
                        h-3.5
                        w-3.5
                        transition-transform
                        duration-200
                        group-hover:translate-x-1
                      "
                    />
                  </Link>
                </div>

                {/* =================================================
                    TABLET / MOBILE ACTIONS
                ================================================== */}
                <div className="flex shrink-0 items-center gap-2 lg:hidden">
                  <Link
                    to="/contact"
                    className="
                      inline-flex
                      h-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#C9D6E5]
                      bg-white
                      px-3
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.1em]
                      text-[#0B3B82]
                      transition-all
                      duration-200
                      hover:border-[#0B3B82]
                      hover:bg-[#F5F8FC]
                      sm:h-10
                      sm:px-4
                      sm:text-[11px]
                    "
                  >
                    Contact
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      setMobileMenuOpen((previous) => !previous)
                    }
                    aria-expanded={mobileMenuOpen}
                    aria-label={
                      mobileMenuOpen
                        ? 'Close navigation menu'
                        : 'Open navigation menu'
                    }
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#C9D6E5]
                      bg-[#F6F9FD]
                      text-[#071A36]
                      transition-all
                      duration-200
                      hover:border-[#0B3B82]
                      hover:bg-[#EDF4FD]
                      hover:text-[#0B3B82]
                      active:scale-95
                      sm:h-10
                      sm:w-10
                    "
                  >
                    {mobileMenuOpen ? (
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </header>

      {/* =========================================================
          MOBILE / TABLET FULL SCREEN MENU
      ========================================================== */}
      {mobileMenuOpen && (
        <div
          className="
            fixed
            inset-0
            z-[70]
            flex
            flex-col
            bg-white
            pt-[68px]
            sm:pt-[72px]
            lg:hidden
          "
        >
          {/* subtle background glow */}
          <div
            className="
              pointer-events-none
              absolute
              right-[-100px]
              top-[90px]
              h-[280px]
              w-[280px]
              rounded-full
              bg-[#1769E0]/[0.06]
              blur-3xl
            "
          />

          <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto">
            {/* MENU INTRO */}
            <div
              className="
                border-b
                border-[#E8EEF6]
                px-5
                pb-5
                pt-6
                sm:px-8
                sm:pt-8
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#1769E0]
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#1769E0]" />
                AG ADS
              </div>

              <h2
                className="
                  mt-2
                  max-w-[430px]
                  font-display
                  text-[28px]
                  font-black
                  leading-[1.02]
                  tracking-[-0.035em]
                  text-[#071A36]
                  sm:text-[34px]
                "
              >
                BUILD YOUR BRAND.
                <br />
                DRIVE YOUR GROWTH.
              </h2>
            </div>

            {/* NAVIGATION */}
            <nav
              className="px-5 py-3 sm:px-8"
              aria-label="Mobile Navigation"
            >
              {/* HOME */}
              <Link
                to="/"
                onClick={closeEverything}
                className={`
                  group
                  flex
                  min-h-[60px]
                  items-center
                  justify-between
                  border-b
                  border-[#E8EEF6]
                  ${
                    isPathActive('/')
                      ? 'text-[#0B3B82]'
                      : 'text-[#071A36]'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="
                      text-[9px]
                      font-bold
                      tracking-[0.15em]
                      text-[#A3AFBE]
                    "
                  >
                    01
                  </span>

                  <span
                    className="
                      font-display
                      text-[18px]
                      font-black
                      uppercase
                      tracking-[-0.01em]
                    "
                  >
                    Home
                  </span>
                </div>

                <ArrowRight
                  className="
                    h-4
                    w-4
                    text-[#98A2B3]
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                    group-hover:text-[#1769E0]
                  "
                />
              </Link>

              {/* WORK */}
              <Link
                to="/work"
                onClick={closeEverything}
                className={`
                  group
                  flex
                  min-h-[60px]
                  items-center
                  justify-between
                  border-b
                  border-[#E8EEF6]
                  ${
                    isPathActive('/work')
                      ? 'text-[#0B3B82]'
                      : 'text-[#071A36]'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="
                      text-[9px]
                      font-bold
                      tracking-[0.15em]
                      text-[#A3AFBE]
                    "
                  >
                    02
                  </span>

                  <span
                    className="
                      font-display
                      text-[18px]
                      font-black
                      uppercase
                    "
                  >
                    Work
                  </span>
                </div>

                <ArrowRight
                  className="
                    h-4
                    w-4
                    text-[#98A2B3]
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                    group-hover:text-[#1769E0]
                  "
                />
              </Link>

              {/* =================================================
                  MOBILE SERVICES
              ================================================== */}
              <div className="border-b border-[#E8EEF6]">
                <div className="flex min-h-[60px] items-center justify-between">
                  <Link
                    to="/services"
                    onClick={closeEverything}
                    className={`
                      flex
                      items-center
                      gap-3
                      ${
                        isServicesActive
                          ? 'text-[#0B3B82]'
                          : 'text-[#071A36]'
                      }
                    `}
                  >
                    <span
                      className="
                        text-[9px]
                        font-bold
                        tracking-[0.15em]
                        text-[#A3AFBE]
                      "
                    >
                      03
                    </span>

                    <span
                      className="
                        font-display
                        text-[18px]
                        font-black
                        uppercase
                      "
                    >
                      Services
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      setMobileServiceOpen((previous) =>
                        previous ? null : 'digital'
                      )
                    }
                    aria-expanded={mobileServiceOpen !== null}
                    aria-label="Expand services"
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#DCE6F1]
                      bg-[#F7FAFD]
                      text-[#667085]
                      transition-all
                      duration-200
                      hover:border-[#BFD1E5]
                      hover:text-[#0B3B82]
                    "
                  >
                    <ChevronDown
                      className={`
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        ${
                          mobileServiceOpen
                            ? 'rotate-180 text-[#1769E0]'
                            : ''
                        }
                      `}
                    />
                  </button>
                </div>

                {/* SERVICE ACCORDION */}
                <div
                  className={`
                    grid
                    transition-[grid-template-rows,opacity]
                    duration-300
                    ${
                      mobileServiceOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-2 pb-4">
                      {OFFICIAL_SERVICES.map((service) => {
                        const expanded =
                          mobileServiceOpen === service.id;

                        return (
                          <div
                            key={service.id}
                            className="
                              overflow-hidden
                              rounded-2xl
                              border
                              border-[#E1EAF4]
                              bg-[#F8FAFD]
                            "
                          >
                            <div className="flex items-center">
                              <Link
                                to={service.path}
                                onClick={closeEverything}
                                className="
                                  flex
                                  min-h-[52px]
                                  flex-1
                                  items-center
                                  gap-3
                                  px-4
                                "
                              >
                                <span
                                  className="
                                    text-[9px]
                                    font-black
                                    tracking-[0.15em]
                                    text-[#1769E0]
                                  "
                                >
                                  {service.index}
                                </span>

                                <span
                                  className="
                                    text-[11px]
                                    font-black
                                    uppercase
                                    tracking-[0.04em]
                                    text-[#071A36]
                                  "
                                >
                                  {service.name}
                                </span>
                              </Link>

                              <button
                                type="button"
                                onClick={() =>
                                  setMobileServiceOpen(
                                    expanded
                                      ? null
                                      : service.id
                                  )
                                }
                                aria-expanded={expanded}
                                aria-label={`Expand ${service.name}`}
                                className="
                                  flex
                                  h-[52px]
                                  w-12
                                  items-center
                                  justify-center
                                  border-l
                                  border-[#E1EAF4]
                                  text-[#667085]
                                "
                              >
                                <ChevronDown
                                  className={`
                                    h-4
                                    w-4
                                    transition-transform
                                    duration-300
                                    ${
                                      expanded
                                        ? 'rotate-180 text-[#1769E0]'
                                        : ''
                                    }
                                  `}
                                />
                              </button>
                            </div>

                            <div
                              className={`
                                grid
                                transition-[grid-template-rows,opacity]
                                duration-300
                                ${
                                  expanded
                                    ? 'grid-rows-[1fr] opacity-100'
                                    : 'grid-rows-[0fr] opacity-0'
                                }
                              `}
                            >
                              <div className="overflow-hidden">
                                <div
                                  className="
                                    border-t
                                    border-[#E1EAF4]
                                    bg-white
                                    px-4
                                    py-3
                                  "
                                >
                                  <p
                                    className="
                                      mb-3
                                      text-[10px]
                                      leading-relaxed
                                      text-[#667085]
                                    "
                                  >
                                    {service.subtitle}
                                  </p>

                                  <div className="grid grid-cols-1 gap-1.5">
                                    {service.capabilities.map(
                                      (capability) => (
                                        <Link
                                          key={capability.name}
                                          to={service.path}
                                          onClick={closeEverything}
                                          className="
                                            flex
                                            items-center
                                            gap-2
                                            rounded-lg
                                            px-2
                                            py-1.5
                                            text-[10px]
                                            font-semibold
                                            text-[#475467]
                                            transition-colors
                                            hover:bg-[#F4F8FD]
                                            hover:text-[#0B3B82]
                                          "
                                        >
                                          <span
                                            className="
                                              h-1.5
                                              w-1.5
                                              shrink-0
                                              rounded-full
                                              bg-[#1769E0]/50
                                            "
                                          />
                                          {capability.name}
                                        </Link>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* PRODUCTION SERVICES MOBILE TRIGGER */}
                      <button
                        type="button"
                        onClick={() => {
                          closeEverything();
                          window.dispatchEvent(
                            new CustomEvent('ag-open-services-popup')
                          );
                        }}
                        className="
                          flex
                          min-h-[52px]
                          w-full
                          items-center
                          justify-between
                          rounded-2xl
                          border
                          border-dashed
                          border-[#BFD4EE]
                          bg-[#F0F6FF]
                          px-4
                          text-left
                          transition-all
                          duration-200
                          hover:border-[#1769E0]
                          hover:bg-white
                        "
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-black tracking-[0.15em] text-[#1769E0]">
                            03
                          </span>

                          <span className="text-[11px] font-black uppercase tracking-[0.04em] text-[#071A36]">
                            Production Services
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#1769E0]">
                          <span>Studio</span>
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ABOUT */}
              <Link
                to="/about"
                onClick={closeEverything}
                className={`
                  group
                  flex
                  min-h-[60px]
                  items-center
                  justify-between
                  border-b
                  border-[#E8EEF6]
                  ${
                    isPathActive('/about')
                      ? 'text-[#0B3B82]'
                      : 'text-[#071A36]'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="
                      text-[9px]
                      font-bold
                      tracking-[0.15em]
                      text-[#A3AFBE]
                    "
                  >
                    04
                  </span>

                  <span
                    className="
                      font-display
                      text-[18px]
                      font-black
                      uppercase
                    "
                  >
                    About
                  </span>
                </div>

                <ArrowRight
                  className="
                    h-4
                    w-4
                    text-[#98A2B3]
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                    group-hover:text-[#1769E0]
                  "
                />
              </Link>

              {/* CONTACT */}
              <Link
                to="/contact"
                onClick={closeEverything}
                className="
                  group
                  flex
                  min-h-[60px]
                  items-center
                  justify-between
                  border-b
                  border-[#E8EEF6]
                  text-[#071A36]
                "
              >
                <div className="flex items-center gap-3">
                  <span
                    className="
                      text-[9px]
                      font-bold
                      tracking-[0.15em]
                      text-[#A3AFBE]
                    "
                  >
                    05
                  </span>

                  <span
                    className="
                      font-display
                      text-[18px]
                      font-black
                      uppercase
                    "
                  >
                    Contact
                  </span>
                </div>

                <ArrowRight
                  className="
                    h-4
                    w-4
                    text-[#98A2B3]
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                    group-hover:text-[#1769E0]
                  "
                />
              </Link>
            </nav>

            {/* =================================================
                MOBILE CONVERSION AREA
            ================================================== */}
            <div className="mt-auto border-t border-[#E5ECF4] bg-[#F7FAFD] px-5 py-5 sm:px-8">
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  to="/contact"
                  onClick={closeEverything}
                  className="
                    flex
                    h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#0B3B82]
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.1em]
                    text-white
                    shadow-[0_8px_20px_rgba(11,59,130,0.18)]
                    transition-all
                    duration-200
                    hover:bg-[#072A5E]
                  "
                >
                  Let's Grow
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <a
                  href="https://wa.me/916369846324"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex
                    h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#25D366]
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.1em]
                    text-white
                    transition-all
                    duration-200
                    hover:bg-[#20BA59]
                  "
                >
                  <WhatsAppIcon className="h-4 w-4 fill-current" />
                  WhatsApp
                </a>
              </div>

              <div
                className="
                  mt-4
                  flex
                  flex-col
                  gap-2
                  border-t
                  border-[#E1EAF4]
                  pt-4
                  text-[10px]
                  font-semibold
                  text-[#667085]
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <a
                  href="tel:6369846324"
                  className="
                    flex
                    items-center
                    gap-2
                    text-[#071A36]
                    transition-colors
                    hover:text-[#0B3B82]
                  "
                >
                  <Phone className="h-3.5 w-3.5 text-[#1769E0]" />
                  6369846324
                </a>

                <a
                  href="https://instagram.com/ag.ads.pondy"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex
                    items-center
                    gap-2
                    text-[#071A36]
                    transition-colors
                    hover:text-[#0B3B82]
                  "
                >
                  <InstagramIcon className="h-3.5 w-3.5 text-[#1769E0]" />
                  @ag.ads.pondy
                </a>
              </div>

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  border-t
                  border-[#E1EAF4]
                  pt-3
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#98A2B3]
                "
              >
                <span>ONE BRAND. EVERY CHANNEL.</span>
                <span>PUDUCHERRY • CHENNAI</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          DOCUMENT SPACER
      ========================================================== */}
      <div
        className="h-[68px] sm:h-[72px] lg:h-[76px]"
        aria-hidden="true"
      />
    </>
  );
};

export default Header;