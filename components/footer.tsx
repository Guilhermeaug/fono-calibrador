import { DualImage } from './ui/dual-image'

export function Footer() {
  return (
    <footer className="my-4 container grid grid-cols-3 items-center gap-x-2 sm:gap-x-4 sm:grid-cols-6">
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
          className="h-28 w-full max-w-[300px] object-contain"
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
          className="h-28 w-full max-w-[300px] object-contain"
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
          className="h-28 w-full max-w-[300px] object-contain dark:brightness-[0.6] dark:grayscale"
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
          className="h-28 w-full max-w-[300px] object-contain"
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
          className="h-28 w-full max-w-[300px] object-contain"
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
          className="h-28 w-full max-w-[300px] object-contain dark:brightness-[0.6] dark:grayscale"
        />
      </div>
    </footer>
  )
}
