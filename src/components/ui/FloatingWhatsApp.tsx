import React from "react";
import { WhatsAppIcon } from "./Icons";

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl =
    "https://wa.me/916369846324?text=Hi%20AG%20ADS%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.";

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="
        fixed
        bottom-5
        right-4
        z-50
        print:hidden

        sm:bottom-6
        sm:right-6
      "
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly with AG ADS on WhatsApp"
        className="
          whatsapp-float
          group
          relative
          flex
          items-center
          justify-center
          overflow-visible

          h-14
          w-14

          sm:h-[52px]
          sm:w-auto
          sm:min-w-[158px]

          rounded-full

          border
          border-white/20

          bg-[#071A36]/95

          px-2
          sm:pl-2
          sm:pr-5

          text-white

          shadow-[0_12px_35px_rgba(3,18,43,0.35)]

          backdrop-blur-xl

          transition-all
          duration-300
          ease-out

          hover:-translate-y-1
          hover:border-[#25D366]/50
          hover:bg-[#0B2449]
          hover:shadow-[0_16px_42px_rgba(7,26,54,0.48)]

          active:translate-y-0
          active:scale-[0.96]

          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#25D366]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-white
        "
      >
        {/* ========================================================
            OUTER GREEN GLOW
        ========================================================= */}

        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -inset-1
            rounded-full
            bg-[#25D366]/10
            opacity-0
            blur-md
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        {/* ========================================================
            ICON WRAPPER
        ========================================================= */}

        <span
          aria-hidden="true"
          className="
            relative
            z-10

            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            rounded-full

            bg-[#25D366]

            shadow-[0_5px_18px_rgba(37,211,102,0.32)]

            transition-all
            duration-300

            group-hover:scale-105
            group-hover:shadow-[0_7px_24px_rgba(37,211,102,0.48)]
          "
        >
          <WhatsAppIcon
            className="
              h-[19px]
              w-[19px]
              fill-current
              text-[#071A36]

              transition-transform
              duration-300

              group-hover:rotate-[-8deg]
            "
          />

          {/* Online indicator */}

          <span
            className="
              absolute
              right-[-1px]
              top-[-1px]

              h-3
              w-3

              rounded-full

              border-2
              border-[#071A36]

              bg-[#25D366]

              shadow-[0_0_8px_rgba(37,211,102,0.75)]
            "
          />
        </span>

        {/* ========================================================
            DESKTOP TEXT
        ========================================================= */}

        <span
          className="
            relative
            z-10
            ml-2.5

            hidden
            sm:flex
            sm:flex-col

            leading-none
          "
        >
          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white/50
            "
          >
            Chat with us
          </span>

          <span
            className="
              mt-1
              font-[Manrope]
              text-[12px]
              font-extrabold
              uppercase
              tracking-[0.13em]
              text-white
            "
          >
            Quick Chat
          </span>
        </span>

        {/* ========================================================
            DESKTOP ARROW
        ========================================================= */}

        <span
          aria-hidden="true"
          className="
            relative
            z-10

            ml-auto
            hidden
            h-7
            w-7
            items-center
            justify-center

            rounded-full

            bg-white/8

            sm:flex

            transition-all
            duration-300

            group-hover:bg-[#25D366]/15
          "
        >
          <svg
            viewBox="0 0 24 24"
            className="
              h-3.5
              w-3.5
              text-white/60
              transition-all
              duration-300
              group-hover:translate-x-0.5
              group-hover:text-[#25D366]
            "
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h13" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </span>
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;