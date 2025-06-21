import "./../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import SessionProvider from "./providers/SessionProvider";
import ConditionalNavbar from "./components/ConditionalNavbar";
import ConditionalMain from "./components/ConditionalMain";
import ConditionalHeader from "./components/ConditionalHeader";
import { Bounce, ToastContainer } from "react-toastify";
import { SidebarProvider } from "./providers/SidebarProvider";
import CurrencyProvider from "./providers/CurrencyProvider";
import { ensureMilestonesExist } from "@/lib/seedMilestones";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await ensureMilestonesExist();

  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <NextIntlClientProvider>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            closeOnClick={false}
            pauseOnHover={false}
            draggable={true}
            theme="light"
            transition={Bounce}
          />

          <SessionProvider>
            <ConditionalHeader />
            <SidebarProvider>
              <ConditionalNavbar />
              <CurrencyProvider>
                <ConditionalMain>{children}</ConditionalMain>
              </CurrencyProvider>
            </SidebarProvider>
            <footer>
              <section className="contactSection">
                <h3 className="contactHeading">Follow me on</h3>

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
              <p className="copyright">
                &copy; {new Date().getFullYear()} TinySaves
              </p>
            </footer>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
