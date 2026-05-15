export type ListingStatus = 'pending' | 'active' | 'rejected' | 'sold';

export interface Listing {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  acres: number;
  price: number;
  price_per_acre: number;
  state: string;
  county: string;
  zip_code?: string;
  parcel_number?: string;
  owner_financing?: boolean;
  taxes_per_year?: number;
  zoning?: string;
  type: LandType;
  status: ListingStatus;
  images: string[];       // array of Supabase storage URLs
  features: string[];     // e.g. ["Road Access", "Water Rights", "Utilities Nearby"]
  lat?: number;
  lng?: number;
  created_at: string;
  updated_at: string;
  // joined
  seller?: SellerProfile;
}

export type LandType =
  | 'Ranch Land'
  | 'Hunting Land'
  | 'Residential Lots'
  | 'Mountain Property'
  | 'Wooded Land'
  | 'Desert Land'
  | 'Farmland'
  | 'Commercial'
  | 'Recreational';

export interface SellerProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Inquiry {
  id: string;
  listing_id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string;
  message: string;
  created_at: string;
}

export const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
] as const;

export const LAND_TYPES: LandType[] = [
  'Ranch Land','Hunting Land','Recreational Land','Farmland / Agricultural',
  'Residential Lots','Wooded / Timber Land','Waterfront Property',
  'Mountain Property','Desert Land','Horse Property',
  'Homestead','Raw / Undeveloped Land','Commercial Land',
  'Mobile Home Lots','Orchard / Vineyard','Conservation Land',
];

export const PRICE_RANGES = [
  { label: 'Under $5,000',    value: '0-5000' },
  { label: 'Under $10,000',   value: '0-10000' },
  { label: 'Under $25,000',   value: '0-25000' },
  { label: 'Under $50,000',   value: '0-50000' },
  { label: 'Under $100,000',  value: '0-100000' },
  { label: 'Under $250,000',  value: '0-250000' },
  { label: '$250k – $500k',   value: '250000-500000' },
  { label: '$500k+',          value: '500000-' },
];

export const ACREAGE_OPTIONS = [
  { label: 'Under 1 Acre',  value: '0-1' },
  { label: '1+ Acres',      value: '1-' },
  { label: '5+ Acres',      value: '5-' },
  { label: '10+ Acres',     value: '10-' },
  { label: '20+ Acres',     value: '20-' },
  { label: '50+ Acres',     value: '50-' },
  { label: '100+ Acres',    value: '100-' },
  { label: '500+ Acres',    value: '500-' },
];
