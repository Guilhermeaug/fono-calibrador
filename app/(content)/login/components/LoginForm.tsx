"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DEFAULT_VALUES, formSchema } from "../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { AUTH } from "@/server/auth";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await signIn("credentials", {
      identifier: values.identifier,
      password: values.password,
      redirect: false,
    }).catch((e) => console.error("Error", e));

    if (res?.ok) {
      window.location.replace("/");
      return;
    }

    switch (res?.error) {
      case "Your account email is not confirmed": {
        toast.error("Sua conta de e-mail não foi confirmada");
        break;
      }
      case "Invalid identifier or password": {
        toast.error("Identificador ou senha inválidos");
        break;
      }
      default: {
        toast.error("Erro desconhecido");
      }
    }
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Identificador</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome ou e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col">
                    <div className="flex items-center">
                      <FormLabel>Identificador</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Esqueceu sua senha?
                      </Link>
                    </div>
                    <FormControl>
                      <Input placeholder="Sua senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </React.Fragment>
  );
}
