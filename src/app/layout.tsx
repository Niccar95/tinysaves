import "./../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import SessionProvider from "./providers/SessionProvider";
import ConditionalNavbar from "./components/ConditionalNavbar";
import ConditionalMain from "./components/ConditionalMain";
import { Bounce, ToastContainer } from "react-toastify";
import { SidebarProvider } from "./providers/SidebarProvider";
import CurrencyProvider from "./providers/CurrencyProvider";
import { ensureMilestonesExist } from "@/lib/seedMilestones";
import { getLocale, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import en from "../../messages/en.json";
import sv from "../../messages/sv.json";
import es from "../../messages/es.json";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "./db";
import { ThemeProvider } from "./providers/ThemeProvider";
// import FriendRequests from "./components/FriendRequests";

const allMessages = { en, sv, es };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  let theme = "light";

  if (session) {
    const userSettings = await prisma.userSettings.findFirst({
      where: { userId: session.user.id },
    });
    theme = userSettings?.theme || "light";
  }

  await ensureMilestonesExist();

  const t = await getTranslations("footer");

  const locale = await getLocale();
  const messages = allMessages[locale as keyof typeof allMessages] ?? en;

  return (
    <html lang={locale} className={theme === "dark" ? "dark" : ""}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
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
          {/* <FriendRequests /> */}
          <SessionProvider>
            <ThemeProvider>
              <SidebarProvider>
                <ConditionalNavbar />
                <CurrencyProvider>
                  <ConditionalMain>{children}</ConditionalMain>
                </CurrencyProvider>
              </SidebarProvider>
              <footer>
                <section className="contactSection">
                  <h3 className="contactHeading">{t("social")}</h3>

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
            </ThemeProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
