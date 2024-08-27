import { Navbar } from '@/components/nav-bar/nav-bar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

export default function Home() {
  return (
    <React.Fragment>
      <div className="h-8 bg-secondary" />
      <Navbar className="bg-secondary" />
      <div className="relative h-[100px] bg-secondary md:h-[160px]" />
      <main className="max-h-[600px] relative mx-auto flex max-w-[900px] flex-col items-center gap-2 py-2 px-4 md:flex-row-reverse">
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
