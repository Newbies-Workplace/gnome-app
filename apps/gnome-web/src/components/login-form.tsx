import { Link } from "react-router-dom";
import GoogleLogo from "@/assets/icons/google-logo.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="login" className="text-white font-Afacad">
                  Login
                </FieldLabel>
                <Input
                  id="login"
                  type="text"
                  placeholder="Podaj login"
                  className="text-white font-Afacad border-2xl rounded-4xl"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel
                    htmlFor="password"
                    className="text-white font-Afacad"
                  >
                    Hasło
                  </FieldLabel>
                </div>
                <Input
                  className="text-white font-Afacad border-2xl rounded-4xl"
                  id="password"
                  type="password"
                  placeholder="Podaj hasło"
                  required
                />
              </Field>
              <Field>
                <Button className="text-white font-Afacad bg-primary-red border-none rounded-4xl">
                  ZALOGUJ SIĘ
                </Button>
              </Field>
              <Field>
                <FieldSeparator />
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="bg-white border-none rounded-4xl"
                >
                  <Link to="/login" className="text-black font-Afacad">
                    Zaloguj się z{" "}
                    <img
                      src={GoogleLogo}
                      alt="Logo Google"
                      className="inline-block"
                    />
                  </Link>
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
