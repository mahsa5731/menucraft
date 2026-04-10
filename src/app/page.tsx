import {HeroSection} from '@/components/home/HeroSection';
import {AboutProjectSection} from '@/components/home/AboutProjectSection';
import {TechStackSection} from '@/components/home/TechStackSection';
import {FeatureSection} from '@/components/home/FeatureSection';

export default function Home() {
  return (
    <div className="mx-auto mb-20 flex w-full max-w-7xl flex-col gap-16 px-4 py-6 md:px-6 md:py-10">
      <HeroSection />
      <AboutProjectSection />
      <FeatureSection />
      <div className="divider opacity-50" />
      <TechStackSection />
    </div>
  );
}
