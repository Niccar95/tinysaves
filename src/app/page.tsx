"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "./components/LoginForm";
import InstallButton from "./components/InstallButton";
import { useTranslations } from "next-intl";
import Banner from "./components/Banner";

const Login = () => {
  const router = useRouter();

  const t = useTranslations("loginPage");

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <div className="authPageWrapper">
        <section className="content authPage">
          <h1>{t("login")}</h1>
          <LoginForm onSuccess={handleLogin} />

          <section className="authLinkSection">
            <Link className="authLink" href="/registration">
              {t("noAccount")}
            </Link>
            <Link className="authLink" href="/resetPassword">
              {t("forgotPassword")}
            </Link>
          </section>
          <InstallButton />
        </section>
        <Banner />
      </div>
    </>
  );
};

export default Login;
