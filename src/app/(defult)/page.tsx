import dynamic from 'next/dynamic';
import DownloadSection from '../components/sections/DownloadSection';

const SearchBar = dynamic(() => import('../components/shared/SearchBar'));
const TopPageCategory = dynamic(() => import('../components/sections/TopPageCategory'));
const BannerCarousel = dynamic(() => import('../components/sections/BannerCarousel'));
const SlidingCarosel = dynamic(() => import('../components/shared/SlidingCarosel'));
const NewArrivalsProducts = dynamic(() => import('../components/sections/NewArrivalsProducts'));

export default function Page() {
  return (
    <div className="max-w-screen-2xl overflow-hidden py-12 mx-auto border-x-[0.2px] border-[var(--border-color)] px-3">
      <SearchBar />
      <TopPageCategory />
      <BannerCarousel />
      <SlidingCarosel />
      <NewArrivalsProducts />
      <DownloadSection />
    </div>
  );
}
