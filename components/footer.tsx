import { DualImage } from './ui/dual-image'

export function Footer() {
  return (
    <footer className="container mb-1 mt-2 grid h-16 grid-cols-3 items-center gap-x-2 sm:grid-cols-6 sm:gap-x-4">
      <div className="relative">
        <DualImage
          lightImage="/images/faculdade_medicina.png"
          darkImage="/images/faculdade_medicina_dark.png"
          imageProps={{
            alt: 'Logo da Faculdade de Medicina da UFMG',
            width: 0,
            height: 0,
            sizes: '100vw',
          }}
          className="h-16 w-full max-w-[300px] object-contain"
        />
      </div>
      <div className="relative">
        <DualImage
          lightImage="/images/ufmg.png"
          darkImage="/images/ufmg_dark.png"
          imageProps={{
            alt: 'Logo da Faculdade UFMG',
            width: 0,
            height: 0,
            sizes: '100vw',
          }}
          className="h-16 w-full max-w-[300px] object-contain"
        />
      </div>
      <div className="relative">
        <DualImage
          lightImage="/images/gp-voz.png"
          darkImage="/images/gp-voz.png"
          imageProps={{
            alt: 'Logo do grupo de pesquisa GP-Voz',
            width: 0,
            height: 0,
            sizes: '100vw',
          }}
          className="h-16 w-full max-w-[300px] object-contain dark:brightness-[0.7] dark:grayscale"
        />
      </div>
      <div className="relative">
        <DualImage
          lightImage="/images/cnpq.png"
          darkImage="/images/cnpq_dark.png"
          imageProps={{
            alt: 'Logo do Conselho Nacional de Desenvolvimento Científico e Tecnológico (CNPq)',
            width: 0,
            height: 0,
            sizes: '100vw',
          }}
          className="h-16 w-full max-w-[300px] object-contain"
        />
      </div>
      <div className="relative">
        <DualImage
          lightImage="/images/capes.png"
          darkImage="/images/capes_dark.png"
          imageProps={{
            alt: 'Logo do Conselho Nacional de Desenvolvimento Científico e Tecnológico (CNPq)',
            width: 0,
            height: 0,
            sizes: '100vw',
          }}
          className="h-16 w-full max-w-[300px] object-contain"
        />
      </div>
      <div className="relative">
        <DualImage
          lightImage="/images/audbility.png"
          darkImage="/images/audbility.png"
          imageProps={{
            alt: 'Logo do Audbility',
            width: 0,
            height: 0,
            sizes: '100vw',
          }}
          className="h-16 w-full max-w-[300px] object-contain dark:brightness-[0.7] dark:grayscale"
        />
      </div>
    </footer>
  )
}
