import Image from "next/image";

export function Footer() {
  return (
    <footer className="grid items-center grid-cols-3 space-x-4 px-4 md:grid-cols-6 md:px-8">
      <div className="relative h-12">
        <Image
          src="/images/medicina.png"
          alt="Medicina"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="relative h-12">
        <Image
          src="/images/ufmg.png"
          alt="UFMG"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="relative h-14">
        <Image
          src="/images/gp-voz.png"
          alt="GP Voz"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="relative h-12">
        <Image
          src="/images/cnpq.png"
          alt="CNPq"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="relative h-12">
        <Image
          src="/images/capes.png"
          alt="CAPES"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="relative h-12">
        <Image
          src="/images/audbility.png"
          alt="Audbility"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </footer>
  );
}
