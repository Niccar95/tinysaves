"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RegisterForm from "../components/RegisterForm";
import { useTranslations } from "next-intl";
import Banner from "../components/Banner";

const Page = () => {
  const router = useRouter();

  const t = useTranslations("registerPage");

  const handleRegisterUser = () => {
    router.push("/");
  };

  return (
    <>
      <div className="authPageWrapper">
        <section className="content authPage">
          <h1>{t("register")}</h1>
          <RegisterForm onSuccess={handleRegisterUser} />
          <section className="authLinkSection">
            <Link className="authLink toLogin" href="/">
              <i className="bi bi-arrow-left-short"></i>
              {t("backToLogin")}
            </Link>
          </section>
        </section>
        <Banner />
      </div>
    </>
  );
};

export default Page;
