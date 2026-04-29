import Image from "next/image";

export const AboutHero = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-center items-center overflow-hidden -mt-[84px] pt-[84px]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image 
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
          alt="Propabridge team background"
          fill
          className="object-cover object-center blur-md scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Overlay for text readability */}
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-site text-center px-4 md:px-8 max-w-[1000px] pt-20">
        <h1 
          className="text-white font-medium leading-[1.2] tracking-tight mx-auto max-w-[850px]"
          style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
        >
          We're a tech-driven real estate platform helping Nigerians find homes without stress, scams, or hidden fees.
        </h1>
      </div>
    </section>
  );
};
