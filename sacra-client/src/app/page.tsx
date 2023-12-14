import Hero from '@/components/custom/Hero'

export default function Home() {
  return (
    <div className="w-full gap-6 mb-20">
      <Hero />
      <div 
        className="gradient w-full h-[100dvh] absolute top-0" 
      />
      <div className="flex flex-col gap-6 items-center text-center">


        {/* <div className='flex md:flex-row flex-col gap-12 justify-between items-center md:mt-36 mt-[60vh]'>
          <div className='flex flex-col gap-2 justify-center items-center md:w-1/4 w-[70%]'>
            <h1 className='font-bold xl:text-6xl text-4xl'>
              134
            </h1>
            <p className='md:text-sm text-xs'>
              Объектов культурного наследия
            </p>
          </div>

          <div className='flex flex-col gap-2 justify-center items-center md:w-1/4 w-[70%]'>
            <h1 className='font-bold xl:text-6xl text-4xl'>
              5
            </h1>
            <p className='md:text-sm text-xs'>
              Виртуальных туров по сакральным местам
            </p>
          </div>

          <div className='flex flex-col gap-2 justify-center items-center md:w-1/4 w-[70%]'>
            <h1 className='font-bold xl:text-6xl text-4xl'>
              16
            </h1>
            <p className='md:text-sm text-xs'>
              Городов Енисейской Сибири
            </p>
          </div>
        </div> */}
      </div>
    </div>
  )
}
