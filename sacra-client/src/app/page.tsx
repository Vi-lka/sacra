import Hero from '@/components/custom/Hero'
import ContentHome from './ContentHome';
import GoToSection from './GoToSection';

export default function Home() {
  return (
    <div className="w-full gap-6">
      <Hero />
      <ContentHome />
      <GoToSection />
      <div className="gradient w-full h-screen fixed bottom-0 opacity-60"/>
    </div>
  )
}
