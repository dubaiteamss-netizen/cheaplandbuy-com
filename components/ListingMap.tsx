'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap, LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { listingPoint } from '../lib/map-points';

export default function ListingMap({ listings }: { listings: any[] }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const layerRef = useRef<LayerGroup | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      const L = (await import('leaflet')).default;
      if (cancelled || !nodeRef.current) return;

      if (!mapRef.current) {
        const map = L.map(nodeRef.current, { scrollWheelZoom: false, zoomControl: true });
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 18,
        }).addTo(map);
        mapRef.current = map;
        layerRef.current = L.layerGroup().addTo(map);
      }

      const map = mapRef.current;
      const layer = layerRef.current;
      if (!map || !layer) return;
      layer.clearLayers();

      const bounds: [number, number][] = [];
      for (const listing of listings) {
        const point = listingPoint(listing);
        if (!point) continue;
        bounds.push([point.lat, point.lng]);
        const premium = Number(listing.price ?? 0) >= 100000;
        const color = premium ? '#0d948c' : '#1565c0';
        const icon = L.divIcon({
          className: '',
          html: `<span style="display:block;width:${premium ? 18 : 14}px;height:${premium ? 18 : 14}px;border-radius:999px;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(23,32,42,.35)"></span>`,
          iconSize: [premium ? 18 : 14, premium ? 18 : 14],
          iconAnchor: [9, 9],
        });
        const price = Number(listing.price ?? 0).toLocaleString();
        const acres = Number(listing.acres ?? 0).toLocaleString();
        const where = [listing.county, listing.state].filter(Boolean).join(', ');
        const note = point.approximate ? '<br/><span style="color:#64748b">Approximate area, not the parcel boundary.</span>' : '';
        L.marker([point.lat, point.lng], { icon })
          .bindPopup(`<strong>$${price}</strong> · ${acres} acres<br/>${where}${note}<br/><a href="/listings/${listing.id}">View listing</a>`)
          .addTo(layer);
      }

      if (bounds.length === 1) map.setView(bounds[0], 6);
      else if (bounds.length > 1) map.fitBounds(bounds, { padding: [28, 28], maxZoom: 8 });
      else map.setView([39.5, -98.35], 4);
      setTimeout(() => map.invalidateSize(), 60);
    }

    draw();
    return () => { cancelled = true; };
  }, [listings]);

  useEffect(() => () => {
    mapRef.current?.remove();
    mapRef.current = null;
    layerRef.current = null;
  }, []);

  return <div ref={nodeRef} className="h-full min-h-[320px] w-full bg-brand-50" />;
}
