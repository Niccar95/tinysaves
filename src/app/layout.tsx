import "./../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import logo from "../../public/logo.svg";
import SessionProvider from "./components/providers/SessionProvider";
import ConditionalNavbar from "./components/ConditionalNavbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <header>
            <Image className="logo" src={logo} alt="icon"></Image>
          </header>
          <main>
            <ConditionalNavbar />

            {children}
          </main>
          <footer></footer>
        </SessionProvider>
      </body>
    </html>
  );
}
