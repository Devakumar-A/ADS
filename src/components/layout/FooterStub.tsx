import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '../ui/Icons';
import { Container } from '../ui/Container';
import { Text } from '../ui/Text';

export const FooterStub: React.FC = () => {
  return (
    <footer className="w-full bg-brand-deep text-white border-t border-brand-dark-border py-14 xs:py-16">
      <Container size="editorial">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Company Brand Block */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-white text-brand-deep flex items-center justify-center font-display font-extrabold text-sm rounded-sm">
                AG
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white leading-none">
                  AG ADS
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-brand-accent-subtle mt-0.5 font-semibold">
                  ADVANCED GROWTH
                </span>
              </div>
            </div>

            <p className="font-display font-semibold text-base text-white mb-2">
              One Brand. Every Channel. Real Growth.
            </p>
            <Text variant="body-sm" tone="white-muted" className="max-w-sm mb-6">
              Complete Digital Marketing &amp; Outdoor Marketing agency helping businesses build stronger brands, reach the right audience, and turn attention into measurable results.
            </Text>
          </div>

          {/* COMPANY Column */}
          <div className="lg:col-span-2">
            <span className="font-sans text-xs uppercase tracking-wider text-white font-bold mb-4 block">
              COMPANY
            </span>
            <ul className="space-y-2.5 text-xs font-sans text-text-white-muted">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-white transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SERVICES Column (Two Core Categories) */}
          <div className="lg:col-span-3">
            <span className="font-sans text-xs uppercase tracking-wider text-white font-bold mb-4 block">
              SERVICES
            </span>
            <ul className="space-y-2.5 text-xs font-sans text-text-white-muted">
              <li>
                <Link to="/services/digital-marketing" className="hover:text-white transition-colors font-medium">
                  Digital Marketing
                </Link>
                <div className="text-[11px] text-white/60 mt-0.5">
                  Meta, Google, SMM, Design, Video &amp; Web
                </div>
              </li>
              <li className="pt-1">
                <Link to="/services/outdoor-marketing" className="hover:text-white transition-colors font-medium">
                  Outdoor Marketing
                </Link>
                <div className="text-[11px] text-white/60 mt-0.5">
                  Radio, TV, Newspaper, Sun-Pack, LED Van &amp; Mall
                </div>
              </li>
            </ul>
          </div>

          {/* CONTACT & LOCATIONS Column */}
          <div className="lg:col-span-3">
            <span className="font-sans text-xs uppercase tracking-wider text-white font-bold mb-4 block">
              CONTACT
            </span>
            <div className="space-y-3 text-xs font-sans text-text-white-muted">
              <a
                href="tel:6369846324"
                className="flex items-center gap-2.5 hover:text-white transition-colors p-2.5 bg-white/5 rounded-sm border border-white/10"
              >
                <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                <span className="font-semibold text-white">6369846324</span>
              </a>

              <a
                href="https://instagram.com/ag.ads.pondy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors p-2.5 bg-white/5 rounded-sm border border-white/10"
              >
                <InstagramIcon className="w-4 h-4 text-brand-accent shrink-0" />
                <span className="text-white">@ag.ads.pondy</span>
                <ArrowUpRight className="w-3 h-3 ml-auto opacity-70" />
              </a>

              <div className="pt-2">
                <span className="font-sans text-[11px] uppercase tracking-wider text-white font-bold mb-1.5 block">
                  LOCATIONS
                </span>
                <div className="flex items-center gap-2 text-xs font-sans text-brand-accent-subtle">
                  <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                  <span>Puducherry &bull; Chennai</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-text-white-muted">
          <span>&copy; {new Date().getFullYear()} AG ADS &mdash; Advanced Growth. All rights reserved.</span>
          <span className="tracking-wider uppercase text-[11px] text-brand-accent-subtle">
            Digital Marketing &bull; Outdoor Marketing
          </span>
        </div>
      </Container>
    </footer>
  );
};
