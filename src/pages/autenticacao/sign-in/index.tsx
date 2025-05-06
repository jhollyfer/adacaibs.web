import { LogoHorizontal } from "@/components/horizontal-logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthentication } from "@/hooks/autenticacao";
import { useSignInMutation } from "@/lib/tanstack/mutation/autenticacao/sign-in";
import { AuthenticationSchema, SignInPayload } from "@/schemas/autenticacao";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { EyeClosedIcon, EyeIcon, LoaderCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function SignIn(): React.ReactElement {
  const navigate = useNavigate();
  const [show, setShow] = React.useState<{
    password: boolean;
  }>({
    password: false,
  });

  const authentication = useAuthentication();

  const signInMutation = useSignInMutation({
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          form.setError("email", { message: "E-mail ou senha inválidos" });
          form.setError("password", { message: "E-mail ou senha inválidos" });
        }
      }

      console.log(error);
    },
    onSuccess(response) {
      authentication.signIn(response);
      navigate("/administrador");
    },
  });

  const form = useForm<SignInPayload>({
    resolver: zodResolver(AuthenticationSchema["sign-in"]),
  });

  const onSignInHandleSubmit = form.handleSubmit(function (payload) {
    signInMutation.mutateAsync(payload);
  });

  return (
    <section className="flex flex-1 flex-col w-full h-screen items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={onSignInHandleSubmit}
          className="max-w-[32.5rem] w-full flex flex-col gap-4 shadow-2xl p-8 rounded-2xl"
        >
          <div className="flex justify-center py-2 bg-black/90 rounded-md ">
            <LogoHorizontal className="w-full h-20 " />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="exemplo@adacaibs.org.com" {...field} />
                </FormControl>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative inline-flex">
                    <Input
                      type={show.password ? "text" : "password"}
                      // placeholder="********************"
                      className="text-lg w-full flex-1 rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none"
                      {...field}
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        setShow((state) => ({
                          ...state,
                          password: !state.password,
                        }))
                      }
                      className="rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md"
                    >
                      {!show.password && <EyeIcon className="w-4 h-4" />}
                      {show.password && <EyeClosedIcon className="w-4 h-4" />}
                    </Button>
                  </div>
                </FormControl>

                <FormMessage className="text-right" />
              </FormItem>
            )}
          />

          {/* <div className="inline-flex w-full justify-between">
            <Link
              to="/authentication/recovery/email"
              className="text-sm hover:underline"
            >
              Esqueci a senha
            </Link>
            <Link
              to="/authentication/sign-up"
              className="text-sm hover:underline"
            >
              Registrar-se
            </Link>
          </div> */}

          <Button
            type="submit"
            className="w-full "
            disabled={signInMutation.status === "pending"}
          >
            {signInMutation.status === "pending" && (
              <LoaderCircleIcon className="w-4 h-4 animate-spin" />
            )}
            {!(signInMutation.status === "pending") && <span>Entrar</span>}
          </Button>
        </form>
      </Form>
    </section>
  );
}
