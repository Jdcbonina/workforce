import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputSignIn } from "@/components/ui/inputSignIn";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { userSchema } from "@/schema/main";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { EyeSlashFilledIcon } from "@/components/ui/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/ui/EyeFilledIcon";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";

const Form = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    setIsLoading(true);

    await signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          if (JSON.parse(res.error).type === "username") {
            form.setFocus("username");

            form.setError("username", {
              type: "server",
              message: JSON.parse(res.error).message,
            });

            setIsLoading(false);
            return;
          }

          if (JSON.parse(res.error).type === "password") {
            form.setFocus("password");

            form.setError("password", {
              type: "server",
              message: JSON.parse(res.error).message,
            });

            setIsLoading(false);
            return;
          }
        }

        router.push("/");
        router.refresh();
        toast({
          variant: "success",
          title: "Login Successful",
          description:
            "Welcome back! You have successfully logged into your account.",
          duration: 5000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="w-full lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Controller
                  control={form.control}
                  name="username"
                  render={({ field: { ref, value, onChange } }) => (
                    <InputSignIn
                      ref={ref}
                      type="text"
                      value={value}
                      onChange={onChange}
                      isInvalid={form.formState.errors.username ? true : false}
                      errorMessage={form.formState.errors.username?.message}
                    />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field: { ref, value, onChange } }) => (
                    <InputSignIn
                      ref={ref}
                      type={isVisible ? "text" : "password"}
                      value={value}
                      onChange={onChange}
                      isInvalid={form.formState.errors.password ? true : false}
                      errorMessage={form.formState.errors.password?.message}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                          ) : (
                            <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                          )}
                        </button>
                      }
                    />
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>Login</>
                )}
                {}
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden bg-muted lg:block">
          <Image
            src="/images/login-image.webp"
            alt="Image"
            width="1920"
            height="1080"
            className="h-screen w-screen object-cover dark:brightness-[0.2] dark:grayscale"
            priority
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
