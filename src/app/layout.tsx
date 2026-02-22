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
import FriendRequests from "./components/FriendRequests";
import { NotificationsProvider } from "./providers/NotificationsProvider";
import Link from "next/link";
import FooterLogo from "./components/FooterLogo";
import ConditionalFooter from "./components/ConditionalFooter";

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
  const tPages = await getTranslations("pages");

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
          <SessionProvider>
            <NotificationsProvider>
              <FriendRequests />
              <ThemeProvider key={session?.user?.id || "guest"} initialTheme={theme}>
                <SidebarProvider>
                  <ConditionalNavbar />
                  <CurrencyProvider>
                    <ConditionalMain>{children}</ConditionalMain>
                  </CurrencyProvider>
                  <ConditionalFooter>
                    <div className="footerTop">
                      <div className="footerBrand">
                        <FooterLogo />
                      </div>
                      <section className="contactSection">
                        <span className="contactHeading">{t("social")}</span>
                        <div className="linkWrapper">
                          <a
                            className="footerLink"
                            href="https://github.com/Niccar95"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i className="bi bi-github"></i>
                          </a>
                          <a
                            className="footerLink"
                            href="https://www.linkedin.com/in/nicolas-carrasco-6882402a5/"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i className="bi bi-linkedin"></i>
                          </a>
                        </div>
                      </section>
                    </div>
                    <nav className="footerNav">
                      <Link className="footerNavLink" href="/dashboard">{tPages("dashboard")}</Link>
                      <Link className="footerNavLink" href="/goals">{tPages("myGoals")}</Link>
                      <Link className="footerNavLink" href="/milestones">{tPages("myMilestones")}</Link>
                      <Link className="footerNavLink" href="/stats">{tPages("myStats")}</Link>
                      <Link className="footerNavLink" href="/profile">{tPages("myProfile")}</Link>
                      <Link className="footerNavLink" href="/settings">{tPages("settings")}</Link>
                    </nav>
                    <p className="copyright">
                      &copy; {new Date().getFullYear()} TinySaves
                    </p>
                  </ConditionalFooter>
                </SidebarProvider>
              </ThemeProvider>
            </NotificationsProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
