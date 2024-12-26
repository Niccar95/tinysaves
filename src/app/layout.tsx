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
          <footer>
            <section className="contactSection">
              <h3>Contact</h3>

              <div className="linkWrapper">
                <a
                  className="footerLink"
                  href="https://github.com/Niccar95"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-github"></i>
                </a>
                <a
                  className="footerLink"
                  href="https://www.linkedin.com/in/nicolas-carrasco-6882402a5/"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </section>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
