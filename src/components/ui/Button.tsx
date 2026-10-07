import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "text-cta"
  | "ghost"
  | "white";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  href?: string;
  icon?: boolean | React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  to,
  href,
  icon = false,
  fullWidth = false,
  className = "",
  children,
  ...props
}) => {
  /* ================================================================
     BASE
  ================================================================ */

  const baseClasses = `
    group
    relative
    inline-flex
    items-center
    justify-center
    overflow-hidden
    select-none
    whitespace-nowrap

    rounded-full

    font-[Manrope]
    font-bold

    transition-all
    duration-300
    ease-out

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#1769E0]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-white

    disabled:pointer-events-none
    disabled:cursor-not-allowed
    disabled:opacity-50

    active:scale-[0.97]

    ${fullWidth ? "w-full" : ""}
  `;

  /* ================================================================
     SIZE
  ================================================================ */

  const sizeClasses = {
    sm: `
      min-h-[42px]
      px-5
      py-2.5
      text-[11px]
      tracking-[0.12em]
      gap-3
    `,

    md: `
      min-h-[50px]
      px-6
      py-3
      text-xs
      tracking-[0.1em]
      gap-3
      sm:min-h-[52px]
      sm:px-7
    `,

    lg: `
      min-h-[56px]
      px-7
      py-3.5
      text-sm
      tracking-[0.08em]
      gap-3.5
      sm:min-h-[60px]
      sm:px-8
    `,
  }[size];

  /* ================================================================
     VARIANTS
  ================================================================ */

  const variantClasses: Record<ButtonVariant, string> = {
    /* --------------------------------------------------------------
       PRIMARY
       AG ADS blue CTA
    -------------------------------------------------------------- */

    primary: `
      border
      border-[#1769E0]

      bg-[#1769E0]
      text-white

      shadow-[0_8px_24px_rgba(23,105,224,0.22)]

      hover:-translate-y-0.5
      hover:border-[#2478F0]
      hover:bg-[#2478F0]
      hover:shadow-[0_14px_34px_rgba(23,105,224,0.32)]
    `,

    /* --------------------------------------------------------------
       SECONDARY
    -------------------------------------------------------------- */

    secondary: `
      border
      border-[#0B3B82]

      bg-white
      text-[#0B3B82]

      shadow-[0_5px_18px_rgba(11,59,130,0.08)]

      hover:-translate-y-0.5
      hover:bg-[#F5F8FC]
      hover:border-[#1769E0]
      hover:text-[#1769E0]
      hover:shadow-[0_10px_28px_rgba(11,59,130,0.14)]
    `,

    /* --------------------------------------------------------------
       OUTLINE
    -------------------------------------------------------------- */

    outline: `
      border
      border-[#D8E1EE]

      bg-white
      text-[#101828]

      hover:-translate-y-0.5
      hover:border-[#1769E0]
      hover:text-[#0B3B82]
      hover:shadow-[0_8px_24px_rgba(11,59,130,0.08)]
    `,

    /* --------------------------------------------------------------
       WHITE
       For dark/blue backgrounds
    -------------------------------------------------------------- */

    white: `
      border
      border-white

      bg-white
      text-[#0B3B82]

      shadow-[0_8px_24px_rgba(0,0,0,0.12)]

      hover:-translate-y-0.5
      hover:bg-[#F5F8FC]
      hover:shadow-[0_14px_32px_rgba(0,0,0,0.18)]
    `,

    /* --------------------------------------------------------------
       TEXT CTA
    -------------------------------------------------------------- */

    "text-cta": `
      min-h-0
      rounded-none
      border-0

      bg-transparent
      px-0
      py-0

      text-[#0B3B82]

      hover:text-[#1769E0]

      focus-visible:ring-offset-4
    `,

    /* --------------------------------------------------------------
       GHOST
    -------------------------------------------------------------- */

    ghost: `
      border
      border-transparent

      bg-transparent
      text-[#475467]

      hover:border-[#E4EAF2]
      hover:bg-[#F5F8FC]
      hover:text-[#0B3B82]
    `,
  };

  /* ================================================================
     SHINE EFFECT
     Only for real buttons
  ================================================================ */

  const showShine =
    variant === "primary" ||
    variant === "secondary" ||
    variant === "white";

  /* ================================================================
     ARROW
  ================================================================ */

  const renderIcon = () => {
    if (icon === true) {
      return (
        <span
          className="
            relative
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-full
            bg-white/15
            transition-all
            duration-300

            group-hover:bg-white/20
            group-hover:translate-x-0.5

            group-active:translate-x-0
          "
        >
          <ArrowRight
            className="
              h-3.5
              w-3.5
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
      );
    }

    if (icon) {
      return (
        <span className="shrink-0">
          {icon}
        </span>
      );
    }

    return null;
  };

  /* ================================================================
     CONTENT
  ================================================================ */

  const content = (
    <>
      {/* Shine */}

      {showShine && (
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            -left-[80%]
            w-[55%]
            skew-x-[-20deg]
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            transition-all
            duration-700
            ease-out

            group-hover:left-[130%]
          "
        />
      )}

      {/* Inner border */}

      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-[2px]
            rounded-full
            border
            border-white/[0.08]
          "
        />
      )}

      {/* Main content */}

      <span
        className="
          relative
          z-10
          flex
          items-center
          justify-center
          gap-3
        "
      >
        <span>{children}</span>

        {renderIcon()}
      </span>
    </>
  );

  /* ================================================================
     CLASSES
  ================================================================ */

  const combinedClasses = `
    ${baseClasses}

    ${variant !== "text-cta" ? sizeClasses : ""}

    ${variantClasses[variant]}

    ${className}
  `
    .replace(/\s+/g, " ")
    .trim();

  /* ================================================================
     INTERNAL ROUTE
  ================================================================ */

  if (to) {
    return (
      <Link
        to={to}
        className={combinedClasses}
      >
        {content}
      </Link>
    );
  }

  /* ================================================================
     EXTERNAL URL
  ================================================================ */

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  /* ================================================================
     BUTTON
  ================================================================ */

  return (
    <button
      type={props.type ?? "button"}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;