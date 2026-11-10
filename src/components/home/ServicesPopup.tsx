import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WhatsAppIcon } from '../ui/Icons';

const SESSION_KEY = 'ag_ads_services_popup_dismissed';

export const ServicesPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [dragOffset, setDragOffset] = useState(0);

  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const currentDragY = useRef<number>(0);

  /* Check session dismissal state */
  const isDismissed = useCallback((): boolean => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  }, []);

  const markDismissed = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // ignore
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(true);
    setDragOffset(0);
    markDismissed();
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [markDismissed]);

  const handleOpenManually = useCallback(() => {
    setIsMinimized(false);
    setIsOpen(true);
  }, []);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
    navigate('/contact');
  };

  /* Listen for manual trigger events from Header navigation */
  useEffect(() => {
    const handleEvent = () => {
      handleOpenManually();
    };

    window.addEventListener('ag-open-services-popup', handleEvent);
    return () => {
      window.removeEventListener('ag-open-services-popup', handleEvent);
    };
  }, [handleOpenManually]);

  /* Intelligent engagement trigger:
     Opens when user is actively reading (after 8s or scrolled >= 28% down page)
     unless another modal is currently active. */
  useEffect(() => {
    if (isDismissed()) return;

    let triggered = false;

    const tryOpen = () => {
      if (triggered || isDismissed()) return;

      const activeDialog = document.querySelector('[role="dialog"]');
      if (activeDialog) {
        setTimeout(tryOpen, 1500);
        return;
      }

      triggered = true;
      setIsOpen(true);
    };

    const timer = setTimeout(tryOpen, 8000);

    const handleScroll = () => {
      if (triggered || isDismissed()) return;
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollPos / docHeight >= 0.28) {
        tryOpen();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDismissed]);

  /* Autoplay video when popup opens */
  useEffect(() => {
    if (!isOpen) return;

    const playTimer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              setIsPlaying(false);
            });
        }
      }
    }, 100);

    return () => clearTimeout(playTimer);
  }, [isOpen]);

  /* Video playback synchronization */
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  /* Focus trap & Escape key */
  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const list = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!list || list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, handleClose]);

  /* Lock body scroll */
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  /* Mobile touch gestures for bottom drawer */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diff = e.touches[0].clientY - touchStartY.current;
    if (diff > 0) {
      currentDragY.current = diff;
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (currentDragY.current > 75) {
      handleClose();
    } else {
      setDragOffset(0);
    }
    touchStartY.current = null;
    currentDragY.current = 0;
  };

  return (
    <>
      <style>{`
        /* ===================================================================
           AG ADS PRODUCTION STUDIO POPUP — PIXEL-PERFECT MOCKUP SPEC
           =================================================================== */

        .svc-pop-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(10, 8, 24, 0.74);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          animation: svc-pop-fade 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes svc-pop-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Desktop Modal Card */
        .svc-pop-modal {
          position: relative;
          width: 100%;
          max-width: 890px;
          background: #ffffff;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.85);
          box-shadow:
            0 32px 85px -15px rgba(28, 14, 66, 0.35),
            0 0 0 1px rgba(79, 38, 184, 0.08);
          overflow: hidden;
          padding: 26px;
          display: grid;
          grid-template-columns: 1.08fr 1fr;
          gap: 26px;
          align-items: center;
          animation: svc-pop-rise 320ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: transform 150ms ease-out;
        }

        @keyframes svc-pop-rise {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Close Button Top Right */
        .svc-pop-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          min-width: 44px;
          min-height: 44px;
          border-radius: 9999px;
          background: #F1F4F9;
          border: 1px solid #E2E8F0;
          color: #475569;
          cursor: pointer;
          transition: all 180ms ease;
        }
        .svc-pop-close-btn:hover {
          background: #E2E8F0;
          color: #0F172A;
          transform: scale(1.08);
        }

        /* -------------------------------------------------------------
           LEFT: 16:9 MARKETING COMMERCIAL VIDEO PLAYER
           ------------------------------------------------------------- */
        .svc-pop-video-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 18px;
          overflow: hidden;
          background: #000000;
          box-shadow: 0 14px 32px -6px rgba(0, 0, 0, 0.4);
          cursor: pointer;
        }

        .svc-pop-video-el {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Top Overlay: AG Production • Brand Campaign */
        .svc-pop-video-header-bar {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
          pointer-events: none;
        }

        .svc-pop-brand-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 4px 10px;
          border-radius: 9999px;
          background: rgba(10, 8, 20, 0.65);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .svc-pop-brand-logo-text {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: -0.01em;
          background: linear-gradient(135deg, #A78BFA 0%, #C084FC 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .svc-pop-brand-title {
          font-size: 9px;
          font-weight: 700;
          color: #E2E8F0;
          letter-spacing: 0.02em;
        }

        .svc-pop-fullscreen-btn {
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          background: rgba(10, 8, 20, 0.6);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          transition: transform 150ms ease;
        }
        .svc-pop-fullscreen-btn:hover {
          transform: scale(1.1);
        }

        /* Center Play Button Overlay */
        .svc-pop-center-play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 52px;
          height: 52px;
          border-radius: 9999px;
          background: rgba(15, 12, 28, 0.78);
          backdrop-filter: blur(8px);
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 200ms ease;
          z-index: 8;
        }
        .svc-pop-center-play:hover {
          transform: translate(-50%, -50%) scale(1.1);
          background: rgba(79, 38, 184, 0.88);
          border-color: #C084FC;
        }

        /* Bottom Controls Bar */
        .svc-pop-controls-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 8px 12px;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.75) 100%);
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 10;
        }

        .svc-pop-ctrl-btn {
          background: transparent;
          border: none;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 2px;
          transition: transform 150ms ease;
        }
        .svc-pop-ctrl-btn:hover {
          transform: scale(1.15);
        }

        .svc-pop-time-text {
          font-family: ui-monospace, monospace;
          font-size: 9px;
          font-weight: 700;
          color: #E2E8F0;
          white-space: nowrap;
        }

        .svc-pop-timeline-slider {
          flex: 1;
          height: 3px;
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 9999px;
          outline: none;
          cursor: pointer;
        }
        .svc-pop-timeline-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: #A855F7;
          cursor: pointer;
          border: 1.5px solid #ffffff;
        }

        /* -------------------------------------------------------------
           RIGHT: CONTENT PANE (MATCHES MOCKUP EXACTLY)
           ------------------------------------------------------------- */
        .svc-pop-content-pane {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .svc-pop-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #581C87;
          margin-bottom: 8px;
        }

        .svc-pop-spark-icon {
          color: #6B21A8;
        }

        .svc-pop-heading-desktop {
          font-family: inherit;
          font-size: 27px;
          font-weight: 900;
          line-height: 1.18;
          letter-spacing: -0.03em;
          color: #0F172A;
          margin: 0;
        }

        .svc-pop-heading-highlight {
          color: #4C1D95;
        }

        .svc-pop-heading-mobile {
          display: none;
        }

        /* 4 Service Pills (2x2 Grid) */
        .svc-pop-pills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin: 18px 0 14px;
        }

        .svc-pop-service-pill {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 14px;
          border-radius: 14px;
          background: #F8F6FE;
          border: 1px solid #E9E1FA;
          color: #1E1B4B;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: -0.01em;
          transition: all 180ms ease;
        }
        .svc-pop-service-pill:hover {
          background: #FFFFFF;
          border-color: #C084FC;
          box-shadow: 0 6px 16px -4px rgba(79, 38, 184, 0.15);
          transform: translateY(-1px);
        }

        .svc-pop-pill-icon {
          color: #581C87;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Subtitle Line */
        .svc-pop-subtitle-line {
          font-size: 11.5px;
          line-height: 1.45;
          color: #64748B;
          margin: 0 0 18px;
        }

        /* Action Buttons Row */
        .svc-pop-action-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .svc-pop-cta-purple {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          height: 48px;
          padding: 0 24px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #431E8C 0%, #5B21B6 100%);
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          text-decoration: none;
          box-shadow: 0 10px 24px -4px rgba(67, 30, 140, 0.38);
          transition: all 180ms ease;
          cursor: pointer;
        }
        .svc-pop-cta-purple:hover {
          background: linear-gradient(135deg, #371775 0%, #4C1D95 100%);
          transform: translateY(-1px);
          box-shadow: 0 14px 28px -4px rgba(67, 30, 140, 0.48);
        }

        .svc-pop-cta-green {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 48px;
          padding: 0 22px;
          border-radius: 9999px;
          background: #EDFDF2;
          border: 1px solid #BBF7D0;
          color: #16A34A;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: all 180ms ease;
          cursor: pointer;
        }
        .svc-pop-cta-green:hover {
          background: #22C55E;
          border-color: #22C55E;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 10px 22px -4px rgba(34, 197, 94, 0.35);
        }

        .svc-pop-maybe-later-btn {
          display: none;
        }

        /* -------------------------------------------------------------
           FLOATING MINIMIZED PILL (BOTTOM-LEFT)
           ------------------------------------------------------------- */
        .svc-pop-floating-pill {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 90;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 8px 16px 8px 10px;
          border-radius: 9999px;
          background: #1C1236;
          border: 1px solid rgba(167, 139, 250, 0.3);
          box-shadow: 0 16px 36px -8px rgba(28, 14, 66, 0.5);
          color: #ffffff;
          cursor: pointer;
          transition: all 260ms cubic-bezier(0.16, 1, 0.3, 1);
          animation: svc-pop-pill-in 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes svc-pop-pill-in {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .svc-pop-floating-pill:hover {
          background: #2E1B5B;
          border-color: #C084FC;
          transform: translateY(-2px);
          box-shadow: 0 20px 42px -6px rgba(46, 27, 91, 0.6);
        }

        .svc-pop-pill-badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          background: #6D28D9;
          color: #ffffff;
        }

        .svc-pop-pill-text-col {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .svc-pop-pill-title-txt {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .svc-pop-pill-sub-txt {
          font-size: 9px;
          color: #C4B5FD;
          font-weight: 600;
        }

        /* -------------------------------------------------------------
           MOBILE VIEW (<768px) — MATCHES IMAGE 2 EXACTLY
           ------------------------------------------------------------- */
        @media (max-width: 767px) {
          .svc-pop-overlay {
            padding: 14px;
            align-items: center;
          }

          .svc-pop-modal {
            grid-template-columns: 1fr;
            padding: 22px 18px 20px;
            border-radius: 28px;
            gap: 14px;
            max-height: 92dvh;
            overflow-y: auto;
            text-align: left;
          }

          .svc-pop-heading-desktop {
            display: none;
          }

          .svc-pop-heading-mobile {
            display: block;
            font-family: inherit;
            font-size: 26px;
            font-weight: 900;
            line-height: 1.15;
            letter-spacing: -0.03em;
            color: #0F172A;
            margin: 0;
          }

          .svc-pop-heading-mobile-gradient {
            color: #5B21B6;
            display: block;
            background: linear-gradient(135deg, #4A1FB8 0%, #7C3AED 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .svc-pop-video-wrap {
            order: 2;
            margin: 2px 0 6px;
          }

          .svc-pop-content-pane {
            order: 1;
          }

          .svc-pop-pills-grid {
            order: 3;
            margin: 10px 0 14px;
            gap: 8px;
          }

          .svc-pop-service-pill {
            padding: 9px 12px;
            font-size: 11.5px;
          }

          .svc-pop-subtitle-line {
            order: 2;
            margin: 6px 0 8px;
            font-size: 11.5px;
          }

          .svc-pop-action-row {
            order: 4;
            flex-direction: column;
            width: 100%;
            gap: 10px;
          }

          .svc-pop-cta-purple {
            width: 100%;
            height: 48px;
          }

          .svc-pop-cta-green {
            width: 100%;
            height: 48px;
            background: #ffffff;
            border: 1.5px solid #22C55E;
            color: #16A34A;
          }

          .svc-pop-maybe-later-btn {
            order: 5;
            display: inline-block;
            margin-top: 4px;
            background: transparent;
            border: none;
            font-size: 11.5px;
            font-weight: 600;
            color: #64748B;
            text-decoration: underline;
            text-underline-offset: 3px;
            cursor: pointer;
            align-self: center;
          }

          .svc-pop-floating-pill {
            bottom: 84px;
            left: 16px;
            padding: 6px 14px 6px 8px;
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .svc-pop-overlay,
          .svc-pop-modal,
          .svc-pop-floating-pill {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* =========================================================
          POPOVER MODAL
          ========================================================== */}
      {isOpen && (
        <div
          className="svc-pop-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
          aria-hidden="false"
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="svc-pop-title"
            className="svc-pop-modal"
            style={{
              transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button Top Right */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close dialog"
              className="svc-pop-close-btn"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* ---------------------------------------------------
                LEFT: 16:9 MARKETING AD/SHOOT VIDEO PLAYER
                --------------------------------------------------- */}
            <div
              ref={videoContainerRef}
              className="svc-pop-video-wrap"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                className="svc-pop-video-el"
                poster="/assets/work/commercial_reel_poster.webp"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="/assets/work/commercial_reel.mp4" type="video/mp4" />
                <source src="/assets/work/commercial_reel.webm" type="video/webm" />
                <source
                  src="https://upload.wikimedia.org/wikipedia/commons/transcoded/3/31/GQ_x_FOSSILS_with_Shruti_Hassan.webm/GQ_x_FOSSILS_with_Shruti_Hassan.webm.720p.vp9.webm"
                  type="video/webm"
                />
              </video>

              {/* Brand Top Overlay */}
              <div className="svc-pop-video-header-bar">
                <div className="svc-pop-brand-badge">
                  <span className="svc-pop-brand-logo-text">AG</span>
                  <span className="svc-pop-brand-title">AG PRODUCTION • Brand Campaign</span>
                </div>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="svc-pop-fullscreen-btn"
                  aria-label="Fullscreen"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </button>
              </div>

              {/* Center Play Button Overlay */}
              {!isPlaying && (
                <div className="svc-pop-center-play" aria-label="Play video">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              )}

              {/* Video Bottom Control Bar */}
              <div className="svc-pop-controls-bar" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="svc-pop-ctrl-btn"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>

                <span className="svc-pop-time-text">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <input
                  type="range"
                  min="0"
                  max={duration || 30}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="svc-pop-timeline-slider"
                  aria-label="Video timeline"
                />

                <button
                  type="button"
                  onClick={toggleMute}
                  className="svc-pop-ctrl-btn"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="1" y1="1" x2="23" y2="23" />
                      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* ---------------------------------------------------
                RIGHT: EDITORIAL CONTENT & 4 SERVICE PILLS
                --------------------------------------------------- */}
            <div className="svc-pop-content-pane">
              {/* Eyebrow */}
              <div className="svc-pop-eyebrow">
                <span className="svc-pop-spark-icon">✦</span>
                AG PRODUCTION STUDIO
              </div>

              {/* Desktop Headline */}
              <h2 id="svc-pop-title" className="svc-pop-heading-desktop">
                Bring Your Brand to Life <span className="svc-pop-heading-highlight">with Powerful Content.</span>
              </h2>

              {/* Mobile Headline (matches Image 2) */}
              <h2 className="svc-pop-heading-mobile">
                Professional
                <span className="svc-pop-heading-mobile-gradient">Media Production</span>
              </h2>

              {/* 4 Core Service Pills */}
              <div className="svc-pop-pills-grid">
                {/* 1. Content Shooting */}
                <div className="svc-pop-service-pill">
                  <span className="svc-pop-pill-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </span>
                  <span>Content Shooting</span>
                </div>

                {/* 2. Content Creation */}
                <div className="svc-pop-service-pill">
                  <span className="svc-pop-pill-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </span>
                  <span>Content Creation</span>
                </div>

                {/* 3. Videography */}
                <div className="svc-pop-service-pill">
                  <span className="svc-pop-pill-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect width="14" height="14" x="1" y="5" rx="2" ry="2" />
                    </svg>
                  </span>
                  <span>Videography</span>
                </div>

                {/* 4. Video Editing */}
                <div className="svc-pop-service-pill">
                  <span className="svc-pop-pill-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="6" rx="2" />
                      <path d="m6 6 3 5" />
                      <path d="m11 6 3 5" />
                      <path d="m16 6 3 5" />
                      <path d="M2 11h20" />
                    </svg>
                  </span>
                  <span>Video Editing</span>
                </div>
              </div>

              {/* Subtitle Line */}
              <p className="svc-pop-subtitle-line">
                End-to-end content production for ads, social media, and brand campaigns.
              </p>

              {/* Action Buttons */}
              <div className="svc-pop-action-row">
                <a
                  href="/contact"
                  onClick={handleCtaClick}
                  className="svc-pop-cta-purple"
                >
                  <span className="hidden sm:inline">Plan Your Shoot</span>
                  <span className="sm:hidden">PLAN YOUR NEXT PROJECT</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>

                <a
                  href="https://wa.me/916369846324?text=Hi%20AG%20ADS%2C%20I'd%20like%20to%20plan%20a%20shoot%20for%20my%20brand."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="svc-pop-cta-green"
                >
                  <WhatsAppIcon className="w-[18px] h-[18px] shrink-0 fill-current sm:w-[18px] sm:h-[18px]" />
                  <span className="hidden sm:inline">WhatsApp</span>
                  <span className="sm:hidden">WHATSAPP</span>
                </a>

                {/* Mobile Maybe Later */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="svc-pop-maybe-later-btn"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MINIMIZED STUDIO LAUNCHER PILL (BOTTOM-LEFT)
          ========================================================== */}
      {isMinimized && !isOpen && (
        <button
          type="button"
          onClick={handleOpenManually}
          className="svc-pop-floating-pill"
          aria-label="Open AG Production Studio Reel"
        >
          <div className="svc-pop-pill-badge-icon">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect width="14" height="14" x="1" y="5" rx="2" ry="2" />
            </svg>
          </div>
          <div className="svc-pop-pill-text-col">
            <span className="svc-pop-pill-title-txt">Production Studio</span>
            <span className="svc-pop-pill-sub-txt">Watch Ad Reel</span>
          </div>
        </button>
      )}
    </>
  );
};

export default ServicesPopup;
