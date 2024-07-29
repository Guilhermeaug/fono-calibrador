import * as React from "react";
import Image from "next/image";
import { Navbar } from "@/components/nav-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <React.Fragment>
      <div className="h-[48px] bg-secondary" />
      <Navbar className="bg-secondary" />
      <div className="relative h-[100px] bg-secondary md:h-[250px]" />
      <main className="relative top-[-55px] mx-auto flex max-w-[850px] flex-col items-center gap-8 px-4 md:top-[-90px] md:flex-row-reverse md:px-8">
        <Image
          className="max-w-full"
          src="/images/logo.png"
          alt="Logo do Calibrador Auditivo"
          width={300}
          height={250}
        />
        <Card>
          <CardHeader>
            <CardTitle>Seja bem vindo ao Calibrador Auditivo!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Quer conhecer este instrumento?{" "}
              <Link
                className="text-sky-600 hover:underline"
                href="/presentation"
              >
                Clique aqui
              </Link>
            </p>
            <p>
              Preparado para iniciar seu treinamento?{" "}
              <Link
                className="text-sky-600 hover:underline"
                href="/presentation"
              >
                Clique aqui
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </React.Fragment>
  );
}
