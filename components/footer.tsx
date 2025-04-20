'use client'

import { usePathname } from 'next/navigation'
import { DualImage } from './ui/dual-image'

export function Footer() {
  const pathname = usePathname()

  const isManagePage = pathname.startsWith('/manage')
  if (isManagePage) {
    return null
  }

  return (
    <footer className="footer container mb-8 mt-4 grid h-32 grid-cols-3 items-center gap-x-2 sm:grid-cols-6 sm:gap-x-4 md:mb-0">
      <div className="relative">
        <DualImage
          lightImage="/images/faculdade_medicina.png"
          darkImage="/images/faculdade_medicina_dark.png"
          alt="Logo da Faculdade de Medicina da UFMG"
          width={0}
          height={0}
          sizes="100vw"
          className="h-16 w-full max-w-[300px] object-contain"
        />
      </div>
      <div className="relative">
        <DualImage
          lightImage="/images/ufmg.png"
          darkImage="/images/ufmg_dark.png"
          alt="Logo da Faculdade UFMG"
          width={0}
          height={0}
          sizes="100vw"
          className="h-16 w-full max-w-[300px] object-contain"
        />
      </div>
      <div className="relative">
        <DualImage
          lightImage="/images/gp-voz.png"
          darkImage="/images/gp-voz.png"
          alt="Logo do grupo de pesquisa GP-Voz"
          width={0}
          height={0}
          sizes="100vw"
          className="h-16 w-full max-w-[300px] object-contain dark:brightness-[0.7] dark:grayscale"
        />
      </div>
      <div className="relative">
        <DualImage
          lightImage="/images/cnpq.png"
          darkImage="/images/cnpq_dark.png"
          alt="Logo do Conselho Nacional de Desenvolvimento Científico e Tecnológico (CNPq)"
          width={0}
          height={0}
          sizes="100vw"
          className="h-16 w-full max-w-[300px] object-contain"
        />
      </div>
      <div className="relative">
        <DualImage
          lightImage="/images/capes.png"
          darkImage="/images/capes_dark.png"
          alt="Logo do Conselho Nacional de Desenvolvimento Científico e Tecnológico (CNPq)"
          width={0}
          height={0}
          sizes="100vw"
          className="h-16 w-full max-w-[300px] object-contain"
        />
      </div>
      <div className="relative">
        <DualImage
          lightImage="/images/audbility.png"
          darkImage="/images/audbility.png"
          alt="Logo do Audbility"
          width={0}
          height={0}
          sizes="100vw"
          className="h-16 w-full max-w-[300px] object-contain dark:brightness-[0.7] dark:grayscale"
        />
      </div>
    </footer>
  )
}
