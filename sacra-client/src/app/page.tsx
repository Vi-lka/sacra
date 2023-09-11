import bg from '../assets/sacra-bg.png'

export default function Home() {
  return (
    <div className="w-full gap-6 mb-20">
      <div 
        className="w-full h-screen absolute top-0 z-[-2] bg-no-repeat bg-cover opacity-90" 
        style={{
          backgroundImage: `url(${bg.src})`
        }}
      />
      <div 
        className="gradient w-full h-[120vh] absolute top-0 z-[-1]" 
      />
      {/* <div className="relative lg:w-1/2 w-full h-[85vh] sm:text-start text-center sm:overflow-auto overflow-hidden">
        <ClientHydration fallback={
          <div className="flex gap-6">
            <p>Loading...</p>
          </div>
        }>
          <CircleMenu />
        </ClientHydration>
      </div> */}

      <div className="flex flex-col gap-6 items-center text-center">
        <div className="flex flex-col gap-1 w-[80%]">
          <h1 className="xl:text-5xl md:text-2xl text-xl font-bold uppercase mt-28 drop-shadow-[0_6px_6px_rgba(0,0,0,0.7)]">
            Сакральное Пространство Енисейской Сибири
          </h1>
          <p className="xl:text-base md:text-sm text-xs drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] lg:w-[70%] mx-auto">
            Виртуальный путеводитель по сакральным местам Красноярского края, Республики Тывы и Республики Хакасии.
          </p>
        </div>

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
