import React, { useState } from 'react';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Heading } from '../../components/ui/Heading';
import { Text } from '../../components/ui/Text';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ArrowRight, ArrowUpRight, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InstagramIcon, WhatsAppIcon } from '../../components/ui/Icons';

/* =========================================================================
   1. SERVICES OVERVIEW PAGE (/services)
   ========================================================================= */
export const ServicesPage: React.FC = () => {
  return (
    <div className="w-full bg-white text-text-primary">
      {/* Hero */}
      <Section spacing="hero" surface="ground" border="bottom">
        <Container size="editorial">
          <div className="max-w-4xl">
            <Badge variant="blue" withDot className="mb-4">
              OFFICIAL SERVICE OFFERINGS
            </Badge>

            <div className="space-y-1 mb-6">
              <Heading level="display-2xl" uppercase className="text-brand-deep leading-none">
                MARKETING
              </Heading>
              <Heading level="display-2xl" uppercase className="text-brand-deep leading-none">
                THAT MOVES
              </Heading>
              <Heading level="display-2xl" uppercase className="text-brand-primary leading-none">
                YOUR BUSINESS.
              </Heading>
            </div>

            <Text variant="body-lg" tone="secondary" className="max-w-2xl mb-8 text-balance">
              AG ADS brings digital marketing and outdoor advertising together to help businesses build visibility, connect with their audience, and grow.
            </Text>

            <div className="flex flex-wrap items-center gap-4">
              <Button to="/contact" variant="primary" size="lg" icon={true}>
                Let's Grow
              </Button>
              <Button to="/work" variant="secondary" size="lg">
                View Our Work
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* The Two Core Services Breakdown */}
      <Section spacing="default" surface="subtle" border="bottom">
        <Container size="editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 01 DIGITAL MARKETING */}
            <div className="bg-white p-8 sm:p-10 border border-surface-border rounded-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-extrabold text-2xl text-brand-primary">01</span>
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-text-muted bg-surface-subtle px-2.5 py-1 border border-surface-border rounded-sm">
                    Core Offering
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-deep mb-2">
                  DIGITAL MARKETING
                </h2>
                <p className="font-sans text-sm font-semibold text-brand-primary mb-4">
                  Complete Digital Marketing Services
                </p>

                <Text variant="body-base" tone="secondary" className="mb-6">
                  Complete digital marketing services designed to help businesses build their online presence, reach the right audience, and generate meaningful enquiries.
                </Text>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                  {[
                    'Meta Ads',
                    'Google Ads',
                    'Social Media Management',
                    'Graphic Design',
                    'Video Production',
                    'Video Editing',
                    'Branding',
                    'Website Development',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs font-sans text-text-secondary">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border">
                <Button to="/services/digital-marketing" variant="primary" size="md" icon={true} fullWidth>
                  Explore Digital Marketing
                </Button>
              </div>
            </div>

            {/* 02 OUTDOOR MARKETING */}
            <div className="bg-white p-8 sm:p-10 border border-surface-border rounded-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-extrabold text-2xl text-brand-primary">02</span>
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-text-muted bg-surface-subtle px-2.5 py-1 border border-surface-border rounded-sm">
                    Core Offering
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-deep mb-2">
                  OUTDOOR MARKETING
                </h2>
                <p className="font-sans text-sm font-semibold text-brand-primary mb-4">
                  Complete Outdoor Marketing &amp; Advertising Services
                </p>

                <Text variant="body-base" tone="secondary" className="mb-6">
                  Complete outdoor and traditional advertising solutions designed to put your brand in front of audiences across high-visibility media.
                </Text>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                  {[
                    'Radio Advertising',
                    'TV Advertising',
                    'Newspaper Advertising',
                    'Sun-Pack Advertising',
                    'LED Van Advertising',
                    'Mall Advertising',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs font-sans text-text-secondary">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border">
                <Button to="/services/outdoor-marketing" variant="primary" size="md" icon={true} fullWidth>
                  Explore Outdoor Marketing
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

/* =========================================================================
   2. DIGITAL MARKETING SERVICE PAGE (/services/digital-marketing)
   ========================================================================= */
export const DigitalMarketingPage: React.FC = () => {
  const capabilities = [
    {
      num: '01',
      name: 'Meta Ads',
      desc: 'Facebook and Instagram advertising structured around precise demographic targeting, retargeting, and measurable lead generation.',
    },
    {
      num: '02',
      name: 'Google Ads',
      desc: 'Google advertising and paid search campaigns targeting high-intent keywords to capture active buyers when they need your service.',
    },
    {
      num: '03',
      name: 'Social Media Management',
      desc: 'Managing and maintaining the brand\'s social media presence with regular content, audience interaction, and brand consistency.',
    },
    {
      num: '04',
      name: 'Graphic Design',
      desc: 'Creative visual designs for marketing, social media campaigns, print, and advertising collateral that reinforce corporate credibility.',
    },
    {
      num: '05',
      name: 'Video Production',
      desc: 'Marketing and promotional video production tailored to communicate your value proposition clearly and memorably.',
    },
    {
      num: '06',
      name: 'Video Editing',
      desc: 'Editing promotional videos, social media content, advertisements, and related marketing content for high audience retention.',
    },
    {
      num: '07',
      name: 'Branding',
      desc: 'Brand identity, typography, visual voice, and corporate brand communication systems that set you apart in your marketplace.',
    },
    {
      num: '08',
      name: 'Website Development',
      desc: 'Professional websites for businesses and brands engineered for speed, search optimization, conversion fidelity, and mobile responsiveness.',
    },
  ];

  return (
    <div className="w-full bg-white text-text-primary">
      <Section spacing="hero" surface="ground" border="bottom">
        <div className="relative overflow-hidden">
          {/* Hero background image */}
          <img
            src="/assets/hero/desktop-view.png"
            alt=""
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
              opacity-[0.22]
              blur-[0.5px]
            "
          />
          {/* Gradient scrim — keeps text fully readable */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-r
              from-white/95
              via-white/80
              to-white/30
            "
          />
          {/* Content */}
          <Container size="editorial">
            <div className="relative z-10 max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <Link to="/services" className="text-xs font-sans font-semibold text-brand-primary hover:underline">
                  Services
                </Link>
                <span className="text-text-muted text-xs">&gt;</span>
                <Badge variant="blue">01 &mdash; DIGITAL MARKETING</Badge>
              </div>

              <div className="space-y-1 mb-6">
                <Heading level="display-2xl" uppercase className="text-brand-deep leading-none">
                  DIGITAL MARKETING
                </Heading>
                <Heading level="display-2xl" uppercase className="text-brand-deep leading-none">
                  BUILT AROUND
                </Heading>
                <Heading level="display-2xl" uppercase className="text-brand-primary leading-none">
                  YOUR GROWTH.
                </Heading>
              </div>

              <Text variant="body-lg" tone="secondary" className="max-w-2xl mb-8 text-balance">
                Complete digital marketing services designed to help businesses build their online presence, reach the right audience, and generate meaningful enquiries.
              </Text>

              <div className="flex flex-wrap gap-4">
                <Button to="/contact" variant="primary" size="lg" icon={true}>
                  Let's Grow
                </Button>
                <Button to="/services/outdoor-marketing" variant="secondary" size="lg">
                  View Outdoor Marketing &rarr;
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </Section>

      {/* Capabilities List */}
      <Section spacing="default" surface="subtle" border="bottom">
        <Container size="editorial">
          <div className="mb-8">
            <span className="font-sans text-xs uppercase tracking-wider font-bold text-brand-primary block mb-2">
              CORE CAPABILITIES
            </span>
            <Heading level="h2">
              Everything Under Digital Marketing
            </Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((item) => (
              <div key={item.num} className="p-6 sm:p-7 bg-white border border-surface-border rounded-sm shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-extrabold text-sm text-brand-primary">
                    /{item.num}
                  </span>
                  <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-text-muted">
                    Digital Service
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-brand-deep mb-2">
                  {item.name}
                </h3>
                <Text variant="body-sm" tone="secondary">
                  {item.desc}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

/* =========================================================================
   3. OUTDOOR MARKETING SERVICE PAGE (/services/outdoor-marketing)
   ========================================================================= */
export const OutdoorMarketingPage: React.FC = () => {
  const capabilities = [
    {
      num: '01',
      name: 'Radio Advertising',
      desc: 'Advertising campaigns through radio media across major regional stations with targeted daypart placements.',
    },
    {
      num: '02',
      name: 'TV Advertising',
      desc: 'Television advertising campaigns delivering mass visual awareness during prime family and news viewing hours.',
    },
    {
      num: '03',
      name: 'Newspaper Advertising',
      desc: 'Newspaper advertising and promotional print insertions in leading regional and national daily publications.',
    },
    {
      num: '04',
      name: 'Sun-Pack Advertising',
      desc: 'Sun-pack advertising for localized, street-level brand visibility installed strategically across residential and commercial nodes.',
    },
    {
      num: '05',
      name: 'LED Van Advertising',
      desc: 'Mobile LED van advertising campaigns providing dynamic digital video displays across high-footfall routes and events.',
    },
    {
      num: '06',
      name: 'Mall Advertising',
      desc: 'Advertising and promotional visibility within premier shopping mall environments targeting active weekend shoppers.',
    },
  ];

  return (
    <div className="w-full bg-white text-text-primary">
      <Section spacing="hero" surface="ground" border="bottom">
        <Container size="editorial">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Link to="/services" className="text-xs font-sans font-semibold text-brand-primary hover:underline">
                Services
              </Link>
              <span className="text-text-muted text-xs">&gt;</span>
              <Badge variant="blue">02 &mdash; OUTDOOR MARKETING</Badge>
            </div>

            <div className="space-y-1 mb-6">
              <Heading level="display-2xl" uppercase className="text-brand-deep leading-none">
                YOUR BRAND
              </Heading>
              <Heading level="display-2xl" uppercase className="text-brand-primary leading-none">
                BEYOND THE SCREEN.
              </Heading>
            </div>

            <Text variant="body-lg" tone="secondary" className="max-w-2xl mb-8 text-balance">
              Complete outdoor and traditional advertising solutions designed to put your brand in front of audiences across high-visibility media.
            </Text>

            <div className="flex flex-wrap gap-4">
              <Button to="/contact" variant="primary" size="lg" icon={true}>
                Let's Grow
              </Button>
              <Button to="/services/digital-marketing" variant="secondary" size="lg">
                View Digital Marketing &rarr;
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Capabilities List */}
      <Section spacing="default" surface="subtle" border="bottom">
        <Container size="editorial">
          <div className="mb-8">
            <span className="font-sans text-xs uppercase tracking-wider font-bold text-brand-primary block mb-2">
              OUTDOOR CHANNELS
            </span>
            <Heading level="h2">
              Everything Under Outdoor Marketing
            </Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item) => (
              <div key={item.num} className="p-6 sm:p-7 bg-white border border-surface-border rounded-sm shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-extrabold text-sm text-brand-primary">
                    /{item.num}
                  </span>
                  <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-text-muted">
                    Outdoor Media
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-brand-deep mb-2">
                  {item.name}
                </h3>
                <Text variant="body-sm" tone="secondary">
                  {item.desc}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

/* =========================================================================
   4. ABOUT PAGE (/about)
   ========================================================================= */
export const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-white text-text-primary">
      <Section spacing="hero" surface="ground" border="bottom">
        <Container size="editorial">
          <div className="max-w-3xl">
            <Badge variant="blue" className="mb-4">ABOUT AG ADS</Badge>
            <Heading level="display-xl" uppercase className="text-brand-deep mb-6">
              A GROWTH-FOCUSED MARKETING AGENCY.
            </Heading>
            <p className="font-display font-semibold text-lg text-brand-primary mb-6">
              Serving businesses across Puducherry and Chennai.
            </p>

            <div className="space-y-4 text-text-secondary text-base leading-relaxed mb-8">
              <p>
                AG ADS is a growth-focused marketing agency helping businesses build stronger brands, reach the right audience, and turn attention into measurable results.
              </p>
              <p>
                We combine digital advertising, creative content, branding, and offline media to create marketing strategies that work across every stage of the customer journey — from first impression to conversion.
              </p>
              <p>
                Our expertise spans Meta Ads, Google Ads, social media management, graphic design, video production, video editing, branding, website development, and outdoor advertising.
              </p>
              <p>
                Whether you're a startup looking to establish your presence or an established business ready to scale, AG ADS builds campaigns around one goal: meaningful growth that can be measured.
              </p>
            </div>

            <div className="p-6 bg-surface-subtle border border-surface-border rounded-sm mb-8">
              <h3 className="font-display font-bold text-base text-brand-deep mb-2">
                Our Two Core Capabilities:
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary font-sans">
                <li>&bull; <strong className="text-text-primary">Digital Marketing:</strong> Complete digital marketing services.</li>
                <li>&bull; <strong className="text-text-primary">Outdoor Marketing:</strong> Complete outdoor marketing and advertising services.</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button to="/contact" variant="primary" size="md" icon={true}>
                Let's Grow
              </Button>
              <Button to="/services" variant="secondary" size="md">
                Explore Services
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

/* =========================================================================
   5. OUR WORK PAGE (/work)
   ========================================================================= */
export { WorkGallery as WorkPage } from '../../components/work/WorkGallery';

/* =========================================================================
   6. CONTACT PAGE (/contact)
   ========================================================================= */
export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business: '',
    service: 'Digital Marketing',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    const messageText = [
      `*New Client Inquiry — AG ADS*`,
      `━━━━━━━━━━━━━━━━━━`,
      `*Name:* ${formData.name.trim()}`,
      `*Phone:* ${formData.phone.trim()}`,
      formData.business.trim() ? `*Business:* ${formData.business.trim()}` : null,
      `*Service Required:* ${formData.service}`,
      formData.message.trim() ? `*Message:* ${formData.message.trim()}` : null,
      `━━━━━━━━━━━━━━━━━━`,
      `_Sent from AG ADS Website_`,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/916369846324?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white text-text-primary">
      {/* Header */}
      <Section spacing="hero" surface="ground" border="bottom" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0B3B82 1px, transparent 1px),
              linear-gradient(to bottom, #0B3B82 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        <Container size="editorial" className="relative z-10">
          <div className="max-w-3xl">
            <Badge variant="blue" withDot className="mb-4">
              START A CONVERSATION
            </Badge>

            <Heading level="display-xl" uppercase className="text-brand-deep mb-4 leading-tight">
              LET'S TALK ABOUT <span className="text-brand-primary">YOUR GROWTH.</span>
            </Heading>

            <Text variant="body-lg" tone="secondary" className="max-w-2xl leading-relaxed">
              Connect with our team in Puducherry or Chennai. Fill out your details below to start a conversation directly with us on WhatsApp, or reach us via phone.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Main Form & Contact Info Section */}
      <Section spacing="default" surface="subtle" border="bottom">
        <Container size="editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left: Interactive Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-surface-border rounded-sm shadow-sm">
              <div className="mb-8 border-b border-surface-border pb-6">
                <span className="font-sans text-xs uppercase font-bold tracking-wider text-brand-primary block mb-1">
                  INQUIRY FORM
                </span>
                <h2 className="font-display text-2xl font-bold text-brand-deep">
                  Connect Directly via WhatsApp
                </h2>
                <p className="font-sans text-xs text-text-secondary mt-1">
                  Fill in your details. Submitting will open WhatsApp with your pre-filled inquiry.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="contact-name" className="block font-sans text-xs font-bold uppercase tracking-wider text-text-primary mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full h-12 px-4 bg-white border border-surface-border rounded-none text-sm font-sans text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
                  />
                </div>

                {/* Phone / WhatsApp Number */}
                <div>
                  <label htmlFor="contact-phone" className="block font-sans text-xs font-bold uppercase tracking-wider text-text-primary mb-2">
                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 6369846324"
                    className="w-full h-12 px-4 bg-white border border-surface-border rounded-none text-sm font-sans text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
                  />
                </div>

                {/* Business / Brand Name */}
                <div>
                  <label htmlFor="contact-business" className="block font-sans text-xs font-bold uppercase tracking-wider text-text-primary mb-2">
                    Business / Brand Name <span className="text-text-muted font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="contact-business"
                    type="text"
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    placeholder="e.g. Brand or Business Name"
                    className="w-full h-12 px-4 bg-white border border-surface-border rounded-none text-sm font-sans text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
                  />
                </div>

                {/* Service Needed */}
                <div>
                  <label htmlFor="contact-service" className="block font-sans text-xs font-bold uppercase tracking-wider text-text-primary mb-2">
                    Service Required
                  </label>
                  <select
                    id="contact-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full h-12 px-4 bg-white border border-surface-border rounded-none text-sm font-sans text-text-primary focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors cursor-pointer"
                  >
                    <option value="Digital Marketing">Digital Marketing (Meta Ads, Google Ads, SEO, Social)</option>
                    <option value="Outdoor Marketing">Outdoor Marketing (Billboards, Bus/Van Ads, Print)</option>
                    <option value="Both (Full Growth Partnership)">Both Channels (Full Growth Partnership)</option>
                    <option value="Branding & Creative Direction">Branding, Video Production &amp; Design</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block font-sans text-xs font-bold uppercase tracking-wider text-text-primary mb-2">
                    Tell Us About Your Goals <span className="text-text-muted font-normal lowercase">(optional)</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe what you're looking to achieve..."
                    className="w-full p-4 bg-white border border-surface-border rounded-none text-sm font-sans text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-13 sm:h-14 inline-flex items-center justify-center gap-3 bg-[#0B3B82] hover:bg-[#072A5E] active:scale-[0.99] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] shadow-[0_4px_20px_rgba(11,59,130,0.22)] transition-all duration-200 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current text-[#25D366]" />
                  <span>Connect on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {submitted && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-sm text-xs font-sans text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>WhatsApp opened! If the chat didn't launch automatically, <a href={`https://wa.me/916369846324?text=${encodeURIComponent(formData.name ? `Hi AG ADS, I am ${formData.name}.` : 'Hi AG ADS')}`} target="_blank" rel="noreferrer" className="font-bold underline">click here to open WhatsApp</a>.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Right: Direct Touchpoints */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct WhatsApp Quick Chat Box */}
              <div className="p-7 bg-[#071A36] text-white rounded-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                    <WhatsAppIcon className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-widest text-[#93C5FD] font-bold block">
                      DIRECT CHAT
                    </span>
                    <h3 className="font-display font-bold text-lg text-white">
                      Instant WhatsApp
                    </h3>
                  </div>
                </div>
                <p className="text-xs font-sans text-white/70 mb-5 leading-relaxed">
                  Prefer chatting immediately without filling in the form? Start a direct WhatsApp conversation with our growth strategists.
                </p>
                <a
                  href="https://wa.me/916369846324?text=Hi%20AG%20ADS%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#20bd5a] text-[#071A36] font-sans text-xs font-bold uppercase tracking-wider transition-colors rounded-none"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>

              {/* Direct Phone Call */}
              <a
                href="tel:6369846324"
                className="p-7 bg-white border border-surface-border rounded-sm hover:border-brand-primary transition-all duration-200 block group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5 text-xs font-sans uppercase font-bold text-brand-primary">
                    <Phone className="w-4 h-4" />
                    <span>Direct Phone Call</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div className="font-display font-extrabold text-2xl text-brand-deep mb-1">
                  6369846324
                </div>
                <div className="text-xs text-text-secondary">
                  Available Mon – Sat for new client inquiries &amp; consultations.
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/ag.ads.pondy"
                target="_blank"
                rel="noreferrer"
                className="p-7 bg-white border border-surface-border rounded-sm hover:border-brand-primary transition-all duration-200 block group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5 text-xs font-sans uppercase font-bold text-brand-primary">
                    <InstagramIcon className="w-4 h-4" />
                    <span>Instagram Profile</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div className="font-display font-bold text-xl text-brand-deep mb-1">
                  @ag.ads.pondy
                </div>
                <div className="text-xs text-text-secondary">
                  Explore campaign footage, reels, billboard visuals, and stories.
                </div>
              </a>

              {/* Regional Office Footprint */}
              <div className="p-6 bg-surface-subtle border border-surface-border rounded-sm text-xs font-sans text-text-secondary">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-brand-deep mb-1.5">
                  <MapPin className="w-4 h-4 text-brand-primary" />
                  <span>Offices &amp; Locations</span>
                </div>
                <p className="leading-relaxed">
                  Offices and media networks serving <strong className="text-text-primary">Puducherry</strong>, <strong className="text-text-primary">Chennai</strong>, and pan-South India businesses.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
