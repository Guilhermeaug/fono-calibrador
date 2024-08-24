import { Navbar } from '@/components/nav-bar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

export default function Home() {
  return (
    <React.Fragment>
      <div className="h-[32px] bg-secondary" />
      <Navbar className="bg-secondary" />
      <div className="relative h-[100px] bg-secondary md:h-[160px]" />
      <main className="relative top-[-80px] mx-auto flex max-w-[900px] flex-col items-center gap-8 px-4 md:top-[-110px] md:flex-row-reverse md:px-4">
        <Image
          className="max-w-full"
          src="/images/logo.png"
          alt="Logo do Calibrador Auditivo"
          width={400}
          height={350}
        />
        <Card>
          <CardHeader>
            <CardTitle>Seja bem vindo ao Calibrador Auditivo!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Quer conhecer este instrumento?{' '}
              <Link className="text-sky-600 hover:underline" href="/presentation">
                Clique aqui
              </Link>
            </p>
            <p>
              Preparado para iniciar seu treinamento?{' '}
              <Link className="text-sky-600 hover:underline" href="/startup">
                Clique aqui
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </React.Fragment>
  )
}
