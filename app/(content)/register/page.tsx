import Image from "next/image";
import Link from "next/link";

import { RegisterForm } from "./components/RegisterForm";

export default function Page() {
  return (
    <main className="mx-auto max-w-[900px] px-8 pt-16">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Cadastro</h1>
        <p className="text-balance text-muted-foreground">
          Preencha os campos abaixo para criar sua conta no Calibrador Auditivo
        </p>
        <div className="mt-1 text-center text-sm">
          Já possui cadastro?{"  "}
          <Link href="/login" className="underline">
            Entre com sua conta
          </Link>
        </div>
      </div>
      <RegisterForm />
    </main>
  );
}
