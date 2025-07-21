"use client";

import {
  BeforeInstallPromptEvent,
  getGlobalPrompt,
  setGlobalPrompt,
  wasInstallable,
} from "@/utils/globalPrompt";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const InstallButton = () => {
  const t = useTranslations("loginPage.messageCard");

  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    if (wasInstallable()) {
      setIsInstallable(true);
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setGlobalPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, []);

  const handleInstallClick = async () => {
    const deferredPrompt = getGlobalPrompt();
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      setGlobalPrompt(null);
      setIsInstallable(false);

      console.log(`User response to the install prompt: ${outcome}`);
    } catch (error) {
      console.error("Error during installation:", error);
    }
  };

  return (
    <>
      {isInstallable ? (
        <div className="pwaMessageCard">
          <p>
            <strong>{t("installIntro")}</strong> {t("installMessage")}
          </p>
          <button className="actionButton" onClick={handleInstallClick}>
            <i className="bi bi-download"></i>
            {t("installButton")}
          </button>
        </div>
      ) : (
        <div className="pwaMessageCard">
          <p>
            <strong>{t("installedIntro")}</strong>
            {t("installedMessage")}
          </p>
          <button
            className="actionButton disabled"
            onClick={handleInstallClick}
            disabled
          >
            <i className="bi bi-check-circle-fill"></i>
            {t("installedButton")}
          </button>
        </div>
      )}
    </>
  );
};

export default InstallButton;
