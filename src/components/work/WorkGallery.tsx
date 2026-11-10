import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { WorkItem, WorkCategory, workCategories, authenticWorkItems } from '../../data/work';
import { WorkGalleryGrid } from './WorkGalleryGrid';
import { MediaViewer } from './MediaViewer';
import { Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../common/SEO';

export const WorkGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory>('ALL');
  const [activeMediaItem, setActiveMediaItem] = useState<WorkItem | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Filter logic: when selectedCategory is 'ALL', return all items, otherwise match category
  const filteredItems =
    selectedCategory === 'ALL'
      ? authenticWorkItems
      : authenticWorkItems.filter((item) => item.category === selectedCategory);

  const hasItems = filteredItems.length > 0;

  const handleOpenItem = (item: WorkItem) => {
    setActiveMediaItem(item);
    setIsViewerOpen(true);
  };

  const handleCloseItem = () => {
    setIsViewerOpen(false);
    setActiveMediaItem(null);
  };

  return (
    <div className="w-full bg-white text-text-primary">
      <SEO
        title="Our Work & Client Portfolio"
        description="Explore campaign showcases, commercial videos, brand identities, and outdoor marketing campaigns executed by AG ADS across Puducherry and Chennai."
        canonicalPath="/work"
      />
      {/* ========================================================
          1. COMPACT EDITORIAL PAGE INTRO (WHITE FIRST)
          ======================================================== */}
      <section className="pt-6 pb-6 xs:pt-7 sm:pt-8 md:pt-10 md:pb-7 lg:pt-12 lg:pb-8 bg-white border-b border-surface-border">
        <Container size="editorial">
          <div className="max-w-3xl">
            {/* Small Eyebrow */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
              <span className="font-sans text-xs uppercase tracking-wider font-bold text-brand-primary">
                OUR WORK
              </span>
            </div>

            {/* Main Headline in Manrope 800 */}
            <Heading level="h1" className="text-brand-deep uppercase mb-2 leading-tight font-extrabold text-2xl sm:text-3xl md:text-4xl">
              REAL CAMPAIGNS. REAL EXECUTION.
            </Heading>

            {/* Concise One-Line Supporting Copy */}
            <Text variant="body-base" tone="secondary" className="max-w-2xl text-balance">
              A selection of work created across digital and outdoor marketing.
            </Text>
          </div>
        </Container>
      </section>

      {/* ========================================================
          2. STICKY FILTER BAR (COOL-WHITE #F5F8FC CANVAS LINK)
          ======================================================== */}
      <div className="sticky top-[68px] sm:top-[72px] lg:top-[76px] z-30 bg-[#F5F8FC]/95 backdrop-blur-md border-b border-surface-border py-2.5 sm:py-3">
        <Container size="editorial">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            {/* Minimal Typography-Driven Tabs */}
            <div
              role="tablist"
              aria-label="Filter gallery by capability"
              className="flex items-center gap-5 sm:gap-8 min-w-max"
            >
              {workCategories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative py-1.5 text-xs sm:text-sm font-sans uppercase tracking-wider font-bold transition-all focus-visible:outline-none focus-visible:text-brand-primary ${
                      isActive
                        ? 'text-brand-primary'
                        : 'text-text-secondary hover:text-brand-deep'
                    }`}
                  >
                    <span>{category}</span>
                    {/* Active Underline Indicator */}
                    {isActive && (
                      <span
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-brand-primary"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Counter Badge */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-text-muted shrink-0">
              <span>SHOWING:</span>
              <span className="font-bold text-brand-primary">{filteredItems.length}</span>
              <span>ITEMS</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ========================================================
          3. DEDICATED COOL-WHITE (#F5F8FC) GALLERY CANVAS
          ======================================================== */}
      <section className="w-full bg-[#F5F8FC] py-6 sm:py-8 md:py-10 border-b border-surface-border">
        <Container size="editorial" className="px-3.5 xs:px-4 sm:px-6 md:px-8 lg:px-12">
          {hasItems ? (
            /* Controlled Editorial Collage Grid */
            <WorkGalleryGrid
              items={filteredItems}
              onOpenItem={handleOpenItem}
            />
          ) : (
            /* Professional Editorial Archive Placeholder */
            <div className="border border-surface-border rounded-sm bg-white p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center max-w-3xl mx-auto shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-primary" />

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-subtle border border-surface-border rounded-sm text-xs font-sans font-bold uppercase tracking-wider text-brand-primary mb-6">
                <Layers className="w-3.5 h-3.5 text-brand-primary" />
                <span>ARCHIVE UPDATE IN PROGRESS</span>
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-deep uppercase tracking-tight mb-4">
                AUTHENTIC AG ADS CREATIVES<br />
                <span className="text-brand-primary">PREPARING FOR DISPLAY.</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl mx-auto mb-8">
                In strict accordance with our authenticity policy, this gallery showcases verified AG ADS client deliverables across Meta Ads, Google campaigns, branding architectures, and regional outdoor media.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-brand-primary hover:bg-brand-deep text-white font-sans text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors shadow-sm min-h-[44px] flex items-center justify-center"
                >
                  Request Campaign Samples
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('ALL')}
                  className="px-6 py-3 bg-white hover:bg-surface-subtle text-brand-primary border border-surface-border rounded-sm font-sans text-xs uppercase tracking-wider font-semibold transition-colors min-h-[44px] flex items-center justify-center"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* ========================================================
          4. LIGHTBOX / MEDIA VIEWER MODAL
          ======================================================== */}
      <MediaViewer
        item={activeMediaItem}
        items={filteredItems}
        isOpen={isViewerOpen}
        onClose={handleCloseItem}
        onSelect={(item) => setActiveMediaItem(item)}
      />
    </div>
  );
};
