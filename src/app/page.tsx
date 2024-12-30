"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./components/LoginForm";

const Login = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <div className="authPageWrapper">
        <section className="content authPage">
          <h1>Log in</h1>

          <LoginForm onSuccess={handleLogin} />

          <section className="authLinkSection">
            <Link className="authLink" href="/registration">
              Don&apos;t have an account?
            </Link>
            <Link className="authLink" href="/resetPassword">
              Forgot your password?
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

export default Login;
