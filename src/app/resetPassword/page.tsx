"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { useTranslations } from "next-intl";
import Banner from "../components/Banner";

const ResetPasswordPage = () => {
  const router = useRouter();

  const t = useTranslations("resetPasswordPage");

  const handleResetPassword = () => {
    router.push("/");
  };

  return (
    <div className="authPageWrapper">
      <section className="content authPage">
        <h1>{t("resetPassword")}</h1>
        <ResetPasswordForm onSuccess={handleResetPassword} />

        <section className="authLinkSection">
          <Link className="authLink" href="/">
            <i className="bi bi-arrow-left-short"></i>
            {t("backToLogin")}
          </Link>
        </section>
      </section>
      <Banner />
    </div>
  );
};

export default ResetPasswordPage;
