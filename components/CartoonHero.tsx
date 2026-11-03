import { Suspense } from 'react';
import SearchBar from './SearchBar';

export default function CartoonHero() {
  return (
    <section className="relative bg-[#7ec8ea]">
      <div className="relative h-52 overflow-hidden sm:h-72">
        <img
          src="/illustrations/hero-land.jpg"
          alt="Cartoon countryside with a red barn and rolling hills"
          className="h-full w-full object-cover object-[center_62%]"
        />
        <span className="cartoon-sun" aria-hidden />
        <span className="cartoon-cloud cartoon-cloud-a" aria-hidden />
        <span className="cartoon-cloud cartoon-cloud-b" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-blue/70 via-blue/10 to-transparent" />
        <div className="absolute bottom-10 left-4 right-4 sm:bottom-14 sm:left-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">CheapLandBuy</p>
          <h1 className="mt-1 max-w-xl text-4xl text-white sm:text-6xl">Find your parcel.</h1>
        </div>
      </div>
      <div className="relative z-10 mx-auto -mt-6 max-w-3xl px-4 pb-2">
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>
    </section>
  );
}
