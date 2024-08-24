import Image from 'next/image'

export function Footer() {
  return (
    <footer className="grid grid-cols-3 items-center space-x-4 md:grid-cols-6 px-1">
      <div className="relative h-12">
        <Image
          className="object-contain"
          src="/images/medicina.png"
          alt="Medicina"
          fill
        />
      </div>
      <div className="relative h-12">
        <Image className="object-contain" src="/images/ufmg.png" alt="UFMG" fill />
      </div>
      <div className="relative h-16">
        <Image className="object-contain" src="/images/gp-voz.png" alt="GP Voz" fill />
      </div>
      <div className="relative h-12">
        <Image className="object-contain" src="/images/cnpq.png" alt="CNPq" fill />
      </div>
      <div className="relative h-12">
        <Image className="object-contain" src="/images/capes.png" alt="CAPES" fill />
      </div>
      <div className="relative h-12">
        <Image
          className="object-contain"
          src="/images/audbility.png"
          alt="Audbility"
          fill
        />
      </div>
    </footer>
  )
}
