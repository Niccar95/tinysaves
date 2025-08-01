"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./components/LoginForm";
import InstallButton from "./components/InstallButton";
import { useTranslations } from "next-intl";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import bannerLightMode from "/public/banner-lightMode.svg";
import bannerDarkMode from "/public/banner-darkMode.svg";

const Login = () => {
  const router = useRouter();

  const { trackedTheme } = useContext(ThemeContext);

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
          {trackedTheme === "light" && (
            <Image
              className="banner"
              src={bannerLightMode}
              alt="banner"
              fill
            ></Image>
          )}
          {trackedTheme === "dark" && (
            <Image
              className="banner"
              src={bannerDarkMode}
              alt="banner"
              fill
            ></Image>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
