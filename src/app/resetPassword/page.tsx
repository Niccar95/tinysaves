"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPasswordPage = () => {
  const router = useRouter();

  const handleResetPassword = () => {
    router.push("/");
  };

  return (
    <div className="authPageWrapper">
      <section className="content authPage">
        <h1>Reset your password</h1>
        <ResetPasswordForm onSuccess={handleResetPassword} />

        <section className="authLinkSection">
          <Link className="authLink" href="/">
            <i className="bi bi-arrow-left-short"></i>
            Back to login page
          </Link>
        </section>
      </section>
      <div className="bannerWrapper">
        <Image className="banner" src="/banner.svg" alt="banner" fill></Image>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
