import Image from "next/image";

export function Footer() {
  return (
    <footer className="grid grid-cols-3 items-center space-x-4 px-4 md:grid-cols-6 md:px-8">
      <div className="relative h-12">
        <Image
          className="object-contain"
          src="/images/medicina.png"
          alt="Medicina"
          layout="fill"
        />
      </div>
      <div className="relative h-12">
        <Image
          className="object-contain"
          src="/images/ufmg.png"
          alt="UFMG"
          layout="fill"
        />
      </div>
      <div className="relative h-16">
        <Image
          className="object-contain"
          src="/images/gp-voz.png"
          alt="GP Voz"
          layout="fill"
        />
      </div>
      <div className="relative h-12">
        <Image
          className="object-contain"
          src="/images/cnpq.png"
          alt="CNPq"
          layout="fill"
        />
      </div>
      <div className="relative h-12">
        <Image
          className="object-contain"
          src="/images/capes.png"
          alt="CAPES"
          layout="fill"
        />
      </div>
      <div className="relative h-12">
        <Image
          className="object-contain"
          src="/images/audbility.png"
          alt="Audbility"
          layout="fill"
        />
      </div>
    </footer>
  );
}
