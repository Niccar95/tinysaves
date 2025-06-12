import "./../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import SessionProvider from "./components/providers/SessionProvider";
import ConditionalNavbar from "./components/ConditionalNavbar";
import ConditionalMain from "./components/ConditionalMain";
import ConditionalHeader from "./components/ConditionalHeader";
import { Bounce, ToastContainer } from "react-toastify";
import { SidebarProvider } from "./components/providers/SidebarProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/icons/icon-192x192.png" />
          <meta name="theme-color" content="#ffffff" />
        </head>
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
            <ConditionalMain>{children}</ConditionalMain>
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
              &copy; {new Date().getFullYear()} Nicolas Carrasco
            </p>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
