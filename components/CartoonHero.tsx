import { Suspense } from 'react';
import SearchBar from './SearchBar';

export default function CartoonHero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid items-center gap-4 lg:grid-cols-2 lg:gap-10">
          <div className="relative order-1 h-52 overflow-hidden rounded-3xl sm:h-72 lg:order-2 lg:h-[460px]">
            <img
              src="/illustrations/hero-land.jpg"
              alt="Cartoon countryside with a red barn, green hills, and a dirt path"
              className="h-full w-full object-cover"
            />
            <span className="cartoon-sun" aria-hidden />
            <span className="cartoon-cloud cartoon-cloud-a" aria-hidden />
            <span className="cartoon-cloud cartoon-cloud-b" aria-hidden />
          </div>

          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">Land marketplace</p>
            <h1 className="mt-2 text-3xl text-brand-900 sm:text-5xl">Search land for sale.</h1>
            <p className="mt-2 max-w-xl text-sm text-brand-500 sm:text-base">
              Price, acres, and a map. No broker fee. A new parcel is public as soon as the seller posts it.
            </p>
            <div className="mt-4">
              <Suspense>
                <SearchBar />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
