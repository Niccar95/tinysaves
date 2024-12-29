"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import RegisterForm from "../components/RegisterForm";

const Page = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/");
  };

  return (
    <>
      <div className="authPageWrapper">
        <section className="content authPage">
          <h1>Register</h1>
          <RegisterForm onSuccess={handleSuccess} />
          <section className="authLinkSection">
            <Link className="authLink toLogin" href="/">
              <i className="bi bi-arrow-left-short"></i>
              Back to login page
            </Link>
          </section>
        </section>
        <div className="bannerWrapper">
          <Image className="banner" src="/banner.svg" alt="banner" fill></Image>
        </div>
      </div>
    </>
  );
};

export default Page;
