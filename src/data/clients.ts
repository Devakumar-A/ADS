export interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  alt: string;
  category?: 'DIGITAL' | 'OUTDOOR' | 'BRANDING' | 'WEB';
}

/**
 * Authentic AG ADS Client & Brand Logos.
 * 
 * In accordance with the project authenticity doctrine:
 * Only verified client and brand logos supplied by AG ADS will appear here.
 * No fake brand names, invented partnerships, or unconfirmed company logos are used.
 * When authentic client assets are supplied, add them directly to this collection.
 */
export const authenticClientLogos: ClientLogo[] = [];
