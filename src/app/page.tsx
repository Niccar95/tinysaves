"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./components/LoginForm";
import InstallButton from "./components/InstallButton";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();

  const t = useTranslations("loginPage");

  const handleLogin = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("userTheme") || "null");
    if (storedTheme) {
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

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
        <div className="bannerWrapper">
          <Image className="banner" src="/banner.svg" alt="banner" fill></Image>
        </div>
      </div>
    </>
  );
};

export default Login;
