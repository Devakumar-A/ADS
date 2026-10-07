import React from 'react';
import { WorkItem } from '../../data/work';
import { WorkGalleryGridItem, CollageSlotLayout } from './WorkGalleryGridItem';

export interface WorkGalleryGridProps {
  items: WorkItem[];
  onOpenItem: (item: WorkItem) => void;
  className?: string;
}

/**
 * 12-Column Desktop, 6-Column Tablet, and 2-Column Mobile Collage Grid
 * 
 * Desktop Editorial Structure:
 * GROUP 1:
 * - Item 0: Large Landscape / Video (8 cols)
 * - Item 1: Portrait Photo (2 cols)
 * - Item 2: Square Photo (2 cols)
 * 
 * GROUP 2:
 * - Item 3: Portrait Photo (2 cols)
 * - Item 4: Large Landscape Photo (8 cols)
 * - Item 5: Portrait Video (2 cols) -> GENUINE 9:16 / 3:4 VERTICAL ANCHOR
 * 
 * GROUP 3:
 * - Item 6: Large Portrait (4 cols)
 * - Item 7: Square (4 cols)
 * - Item 8: Large Landscape Video (4 cols)
 * 
 * Mobile 2-Column Structure (Gap: 5-7px, alternating 1-col and 2-col spans):
 * - Item 0 (Landscape): 2 cols (full width)
 * - Item 1 (Portrait): 1 col (half width)
 * - Item 2 (Square): 1 col (half width)
 * - Item 3 (Portrait): 1 col (half width)
 * - Item 4 (Landscape): 2 cols (full width)
 * - Item 5 (Portrait Video): 1 col (9:16 vertical)
 * - Item 6 (Square): 1 col (half width)
 * - Item 7 (Landscape): 2 cols (full width)
 */
function getSlotLayout(item: WorkItem, index: number): CollageSlotLayout {
  const cycleIndex = index % 9;

  // Desktop spans
  let desktopSpan = 'lg:col-span-4';
  let tabletSpan = 'md:col-span-3';
  let mobileSpan = 'col-span-1';
  let heightClass = 'h-[200px] xs:h-[240px] sm:h-[280px] md:h-[340px] lg:h-[440px]';
  let aspectClass = '';

  // Specific Group Definitions
  if (cycleIndex === 0) {
    // Group 1, Item 0: Large Landscape Video/Image
    desktopSpan = 'lg:col-span-8';
    tabletSpan = 'md:col-span-4';
    mobileSpan = 'col-span-2';
    heightClass = 'h-[200px] xs:h-[230px] sm:h-[280px] md:h-[350px] lg:h-[440px]';
  } else if (cycleIndex === 1) {
    // Group 1, Item 1: Portrait Photo
    desktopSpan = 'lg:col-span-2';
    tabletSpan = 'md:col-span-2';
    mobileSpan = 'col-span-1';
    heightClass = 'h-[200px] xs:h-[240px] sm:h-[280px] md:h-[350px] lg:h-[440px]';
  } else if (cycleIndex === 2) {
    // Group 1, Item 2: Square Photo
    desktopSpan = 'lg:col-span-2';
    tabletSpan = 'md:col-span-2';
    mobileSpan = 'col-span-1';
    heightClass = 'h-[200px] xs:h-[240px] sm:h-[280px] md:h-[350px] lg:h-[440px]';
  } else if (cycleIndex === 3) {
    // Group 2, Item 3: Portrait Photo
    desktopSpan = 'lg:col-span-2';
    tabletSpan = 'md:col-span-2';
    mobileSpan = 'col-span-1';
    heightClass = 'h-[200px] xs:h-[240px] sm:h-[280px] md:h-[350px] lg:h-[440px]';
  } else if (cycleIndex === 4) {
    // Group 2, Item 4: Large Landscape Photo/Video
    desktopSpan = 'lg:col-span-8';
    tabletSpan = 'md:col-span-4';
    mobileSpan = 'col-span-2';
    heightClass = 'h-[200px] xs:h-[230px] sm:h-[280px] md:h-[350px] lg:h-[440px]';
  } else if (cycleIndex === 5) {
    // Group 2, Item 5: Portrait Video (Vertical Anchor)
    desktopSpan = 'lg:col-span-2';
    tabletSpan = 'md:col-span-2';
    mobileSpan = 'col-span-1';
    heightClass = 'h-[220px] xs:h-[260px] sm:h-[300px] md:h-[350px] lg:h-[440px]';
  } else if (cycleIndex === 6) {
    // Group 3, Item 6: Large Portrait
    desktopSpan = 'lg:col-span-4';
    tabletSpan = 'md:col-span-3';
    mobileSpan = 'col-span-1';
    heightClass = 'h-[210px] xs:h-[250px] sm:h-[290px] md:h-[360px] lg:h-[440px]';
  } else if (cycleIndex === 7) {
    // Group 3, Item 7: Square
    desktopSpan = 'lg:col-span-4';
    tabletSpan = 'md:col-span-3';
    mobileSpan = 'col-span-1';
    heightClass = 'h-[210px] xs:h-[250px] sm:h-[290px] md:h-[360px] lg:h-[440px]';
  } else if (cycleIndex === 8) {
    // Group 3, Item 8: Large Landscape Video
    desktopSpan = 'lg:col-span-4';
    tabletSpan = 'md:col-span-6';
    mobileSpan = 'col-span-2';
    heightClass = 'h-[200px] xs:h-[230px] sm:h-[280px] md:h-[350px] lg:h-[440px]';
  }

  // Preserve dedicated orientation rules on mobile:
  // If an item is explicitly a landscape video or featured landscape, guarantee it spans both columns on mobile
  if ((item.orientation === 'landscape' && item.type === 'video') || (item.orientation === 'landscape' && item.featured)) {
    mobileSpan = 'col-span-2';
  } else if (item.orientation === 'portrait') {
    mobileSpan = 'col-span-1';
  } else if (item.orientation === 'square') {
    mobileSpan = 'col-span-1';
  }

  return {
    desktopSpan,
    tabletSpan,
    mobileSpan,
    heightClass,
    aspectClass,
    fitMode: 'cover',
  };
}

export const WorkGalleryGrid: React.FC<WorkGalleryGridProps> = ({
  items,
  onOpenItem,
  className = '',
}) => {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 [grid-auto-flow:dense] transition-all duration-300 ${className}`}
    >
      {items.map((item, index) => {
        const slotLayout = getSlotLayout(item, index);
        return (
          <WorkGalleryGridItem
            key={item.id}
            item={item}
            slotLayout={slotLayout}
            onClick={onOpenItem}
          />
        );
      })}
    </div>
  );
};
