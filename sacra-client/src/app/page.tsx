import Hero from '@/components/custom/Hero'
import ContentHome from './ContentHome';
import GoToSection from './GoToSection';
import { Suspense } from 'react';
import { Skeleton } from '@nextui-org/react';

export default function Home() {
  return (
    <div className="w-full gap-6">
      <Hero />
      <Suspense
        fallback={
          <div className='mx-auto w-[95%] max-w-[2200px] md:w-[85%] lg:mt-36 mt-6'>
            <section className='w-full flex lg:flex-row flex-col justify-around items-center gap-24'>
              <Skeleton className='w-60 h-60 bg-background dark:bg-background rounded-xl'/>
              <Skeleton className='w-60 h-60 bg-background dark:bg-background rounded-xl'/>
            </section>
          </div>
        }
      >
        <ContentHome />
      </Suspense>
      <GoToSection />
      <div className="gradient w-full h-screen fixed bottom-0 opacity-60"/>
    </div>
  )
}
