import "./../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import logo from "../../public/logo.svg";
import SessionProvider from "./components/providers/SessionProvider";
import ConditionalNavbar from "./components/ConditionalNavbar";
import GoalsProvider from "./components/providers/GoalsProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <GoalsProvider>
            <header>
              <Image className="logo" src={logo} alt="icon"></Image>
            </header>
            <main>
              <ConditionalNavbar />
              {children}
            </main>
            <footer></footer>
          </GoalsProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
