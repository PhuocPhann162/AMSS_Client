import { ChatFloatButton } from '@/components/UI';
import { FarmManagementIntroSection } from '@/pages/Home/components/farm-management-intro-section';
import { lazy } from 'react';

const Hero = lazy(() =>
  import('@/pages/Home/components/hero').then((module) => ({
    default: module.Hero,
  })),
);

const CommodityCategoriesIntroSection = lazy(() =>
  import('@/pages/Home/components/commodity-categories-intro-section').then(
    (module) => ({
      default: module.CommodityCategoriesIntroSection,
    }),
  ),
);

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
