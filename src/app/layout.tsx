import "./../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import SessionProvider from "./components/providers/SessionProvider";
import ConditionalNavbar from "./components/ConditionalNavbar";
import ConditionalMain from "./components/ConditionalMain";
import ConditionalHeader from "./components/ConditionalHeader";
import { Bounce, ToastContainer } from "react-toastify";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
          <ConditionalMain>
            <ConditionalNavbar />
            {children}
          </ConditionalMain>
          <footer>
            <section className="contactSection">
              <h3 className="contactHeading">Contact</h3>

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
