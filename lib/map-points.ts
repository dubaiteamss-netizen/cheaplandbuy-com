const STATE_CENTERS: Record<string, [number, number]> = {
  Alabama: [32.8, -86.8], Alaska: [64.2, -152.5], Arizona: [34.3, -111.7], Arkansas: [34.9, -92.4],
  California: [37.2, -119.4], Colorado: [39.0, -105.5], Connecticut: [41.6, -72.7], Delaware: [39.0, -75.5],
  Florida: [28.6, -82.4], Georgia: [32.7, -83.4], Hawaii: [20.6, -157.0], Idaho: [44.4, -114.6],
  Illinois: [40.0, -89.2], Indiana: [39.9, -86.3], Iowa: [42.0, -93.5], Kansas: [38.5, -98.3],
  Kentucky: [37.5, -85.3], Louisiana: [31.1, -92.0], Maine: [45.3, -69.2], Maryland: [39.0, -76.8],
  Massachusetts: [42.3, -71.8], Michigan: [44.3, -85.4], Minnesota: [46.3, -94.3], Mississippi: [32.7, -89.7],
  Missouri: [38.4, -92.5], Montana: [47.0, -109.6], Nebraska: [41.5, -99.8], Nevada: [39.3, -116.6],
  'New Hampshire': [43.7, -71.6], 'New Jersey': [40.1, -74.5], 'New Mexico': [34.4, -106.1],
  'New York': [42.9, -75.5], 'North Carolina': [35.6, -79.4], 'North Dakota': [47.4, -100.3],
  Ohio: [40.3, -82.8], Oklahoma: [35.6, -97.5], Oregon: [43.9, -120.6], Pennsylvania: [40.9, -77.8],
  'Rhode Island': [41.7, -71.5], 'South Carolina': [33.9, -80.9], 'South Dakota': [44.4, -100.2],
  Tennessee: [35.8, -86.3], Texas: [31.5, -99.3], Utah: [39.3, -111.7], Vermont: [44.1, -72.7],
  Virginia: [37.5, -78.8], Washington: [47.4, -120.5], 'West Virginia': [38.6, -80.6],
  Wisconsin: [44.6, -89.8], Wyoming: [43.0, -107.6],
};

export function isPremiumListing(listing: { price?: number }) {
  return Number(listing.price ?? 0) >= 100000;
}

export function listingPoint(listing: { id?: string; lat?: number; lng?: number; state?: string }) {
  const lat = Number(listing.lat);
  const lng = Number(listing.lng);
  if (Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0)) {
    return { lat, lng, approximate: false };
  }
  const center = listing.state ? STATE_CENTERS[listing.state] : undefined;
  if (!center) return null;
  const id = String(listing.id ?? listing.state);
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  const angle = (hash / 997) * Math.PI * 2;
  return {
    lat: center[0] + Math.cos(angle) * 0.45,
    lng: center[1] + Math.sin(angle) * 0.55,
    approximate: true,
  };
}
