import accountDeleteDialog from "@/assets/images/AccountDeleteDialog.svg";
import backgroundImage from "@/assets/images/background.png";

export default function AccountDeleteTutorialPage() {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col h-screen items-center justify-center text-white">
        <article className="flex flex-col gap-12 bg-foreground/70 p-10 rounded-2xl">
          <h3 className="text-center text-4xl font-bold">Jak usunąć konto?</h3>
          <ol className="list-none *:text-xl *:font-semibold space-y-2">
            <li>Krok 1. Uruchom aplikację Krasnal GO</li>
            <li>Krok 2. Naciśnij swoje zdjęcie profilowe (górny lewy róg)</li>
            <li>Krok 3. Przejdź do ustawień</li>
            <li>Krok 4. Wybierz opcję “usuń konto”</li>
            <li>
              Krok 5. Potwierdź usunięcie konta zgodnie z instrukcją na ekranie.
            </li>
          </ol>
          <img
            src={accountDeleteDialog}
            alt="Account Delete Dialog"
            className="h-64"
          />
        </article>
      </div>
    </div>
  );
}
