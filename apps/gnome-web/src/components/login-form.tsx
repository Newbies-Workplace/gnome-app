import { Link } from "react-router-dom";
import GoogleLogo from "@/assets/icons/google-logo.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-black/60 border-none rounded-4xl">
        <CardHeader>
          <CardTitle className="text-center text-white font-Afacad text-2xl">
            ZALOGUJ SIĘ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldSeparator />
            </Field>
            <Field>
              <Button
                type="submit"
                onClick={() => {
                  window.location.href =
                    import.meta.env.VITE_PUBLIC_API_URL +
                    "/auth/google/redirect";
                }}
                className="bg-white text-black border-none rounded-4xl"
              >
                Zaloguj się z{" "}
                <img
                  src={GoogleLogo}
                  alt="Logo Google"
                  className="inline-block"
                />
              </Button>
            </Field>
            <Field>
              <Link to="/privacy">
                <div className="text-white text-Afacad text-lg text-center">
                  Polityka prywatności
                </div>
              </Link>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
