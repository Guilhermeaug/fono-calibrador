import * as React from "react";
import Image from "next/image";
import { Navbar } from "@/components/nav-bar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <React.Fragment>
      <div className="h-[48px] bg-secondary" />
      <Navbar className="bg-secondary" />
      <div className="relative h-[150px] bg-secondary">
        <div className="flex flex-col items-center md:absolute md:left-[15%]">
          <Image
            className="max-w-full"
            src="/images/logo.png"
            alt="Logo do Calibrador Auditivo"
            width={300}
            height={578}
          />
        </div>
      </div>
      <div className="h-[48px]" />
      <div className="grid items-center justify-center gap-8 px-4 md:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Seja bem vindo ao Calibrador Auditivo!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Quer conhecer este instrumento? Clique aqui</p>
            <p>Preparado para iniciar seu treinamento? Clique aqu​</p>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}
