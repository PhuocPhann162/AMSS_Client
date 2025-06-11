import { ChatFloatButton } from '@/components/UI';
import { CommodityCategoriesIntroSection } from '@/pages/Home/components/commodity-categories-intro-section';
import { FarmManagementIntroSection } from '@/pages/Home/components/farm-management-intro-section';
import { Hero } from '@/pages/Home/components/hero';

export default function HomePage() {
  return (
    <>
      <FarmManagementIntroSection />
      <CommodityCategoriesIntroSection />
      <Hero />
      <ChatFloatButton />
    </>
  );
}
