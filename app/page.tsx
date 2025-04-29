import { TypographyH1, TypographyH2, TypographyP } from '@/components/typography'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto lg:p-8 xl:flex xl:items-center xl:gap-16 xl:p-16">
      <div className="space-y-8">
        <div className="mt-8 space-y-2 text-center xl:mt-16">
          <TypographyH1>Calibrador Auditivo</TypographyH1>
          <TypographyH2>
            Aprimorando a escuta clínica com o treinamento auditivo das qualidades vocais
          </TypographyH2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Conheça o instrumento</CardTitle>
            </CardHeader>
            <CardContent className="min-h-40">
              <TypographyP>
                Utilize essa seção para se familiarizar com o Calibrador Auditivo. Aqui
                você encontrará informações sobre as funcionalidades do sistema e sua
                fundamentação.
              </TypographyP>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/presentation">Apresentação</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Inicie seu treinamento</CardTitle>
            </CardHeader>
            <CardContent className="min-h-40">
              <TypographyP>
                Pronto para iniciar ou continuar seu treinamento? Na próxima página você
                encontrará os passos que deve seguir para realizar o treinamento auditivo.
              </TypographyP>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/startup" prefetch={false}>
                  Treinamento
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="hidden h-auto items-center justify-center xl:flex">
        <Image
          className="block max-w-full dark:grayscale"
          src="/images/logo.png"
          width={1400}
          height={0}
          alt=""
        />
      </div>
    </main>
  )
}
