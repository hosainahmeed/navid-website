import dynamic from 'next/dynamic';

const SearchBar = dynamic(() => import('../components/shared/SearchBar'));
const TopPageCategory = dynamic(() => import('../components/sections/TopPageCategory'));
const BannerCarousel = dynamic(() => import('../components/sections/BannerCarousel'));
const SlidingCarosel = dynamic(() => import('../components/shared/SlidingCarosel'));
const NewArrivalsProducts = dynamic(() => import('../components/sections/NewArrivalsProducts'));

export default function Page() {
  return (
    <div className="max-w-screen-2xl py-12 mx-auto border-x border-[var(--border-color)] px-3">
      <SearchBar />
      <TopPageCategory />
      <BannerCarousel />
      <SlidingCarosel />
      <NewArrivalsProducts />
    </div>
  );
}
